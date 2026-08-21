export interface SubmitEmailResult {
  ok: boolean;
  error?: string;
}

function subscribeEndpoint(): string {
  const base = import.meta.env.BASE_URL || '/';
  return new URL('api/subscribe', `http://local${base.endsWith('/') ? base : `${base}/`}`).pathname;
}

export async function submitEmail(email: string): Promise<SubmitEmailResult> {
  try {
    const response = await fetch(subscribeEndpoint(), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = (await response.json()) as { ok?: boolean; error?: string };

    if (response.ok && data.ok !== false) {
      return { ok: true };
    }

    return {
      ok: false,
      error: data.error ?? 'Something went wrong. Please try again.',
    };
  } catch {
    return {
      ok: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}
