import { appendSubscriber, isValidEmail } from '../server/appendSubscriber.mjs';

function readBodyEmail(req) {
  const body = req.body;
  if (body && typeof body === 'object' && typeof body.email === 'string') {
    return body.email.trim();
  }
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      return typeof parsed.email === 'string' ? parsed.email.trim() : '';
    } catch {
      return '';
    }
  }
  return '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const email = readBodyEmail(req);

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
  }

  try {
    await appendSubscriber(email);
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: 'Could not save email. Please try again.' });
  }
}
