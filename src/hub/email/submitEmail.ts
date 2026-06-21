export interface SubmitEmailResult {
  ok: boolean;
  error?: string;
}

export async function submitEmail(email: string): Promise<SubmitEmailResult> {
  const formId = import.meta.env.VITE_FORMSPREE_ID;

  if (!formId) {
    return {
      ok: false,
      error: 'Email signup is not configured yet. Add VITE_FORMSPREE_ID to your .env file.',
    };
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = (await response.json()) as { ok?: boolean; error?: string };

    if (response.ok) {
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
