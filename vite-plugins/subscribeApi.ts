import type { Plugin } from 'vite';
import { appendSubscriber, isValidEmail } from '../server/appendSubscriber.mjs';

async function readJsonBody(req: import('http').IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  return JSON.parse(raw) as unknown;
}

function isSubscribePath(url: string | undefined): boolean {
  if (!url) return false;
  const path = url.split('?')[0] ?? '';
  return path === '/api/subscribe' || path.endsWith('/api/subscribe');
}

export function subscribeApiPlugin(): Plugin {
  return {
    name: 'subscribe-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'POST' || !isSubscribePath(req.url)) {
          next();
          return;
        }

        res.setHeader('Content-Type', 'application/json');

        try {
          const body = (await readJsonBody(req)) as { email?: unknown };
          const email = typeof body.email === 'string' ? body.email.trim() : '';

          if (!email || !isValidEmail(email)) {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, error: 'Please enter a valid email address.' }));
            return;
          }

          await appendSubscriber(email);
          res.statusCode = 200;
          res.end(JSON.stringify({ ok: true }));
        } catch {
          res.statusCode = 500;
          res.end(JSON.stringify({ ok: false, error: 'Could not save email. Please try again.' }));
        }
      });
    },
  };
}
