import { submitEmail } from './email/submitEmail';

const STORAGE_KEY = 'hub-subscribed';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function isSubscribed(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

function setSubscribed(): void {
  localStorage.setItem(STORAGE_KEY, 'true');
}

function setState(
  form: HTMLFormElement,
  state: FormState,
  message?: string,
): void {
  form.dataset.state = state;
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  if (status) {
    status.textContent = message ?? '';
    status.hidden = !message;
  }

  const input = form.querySelector<HTMLInputElement>('input[type="email"]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (input) input.disabled = state === 'loading' || state === 'success';
  if (submit) submit.disabled = state === 'loading' || state === 'success';
}

export function initEmailCaptureForm(formSelector = '#hub-email-form'): void {
  const form = document.querySelector<HTMLFormElement>(formSelector);
  if (!form) return;

  if (isSubscribed()) {
    setState(form, 'success', "Thanks — we'll stay connected.");
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>('input[type="email"]');
    if (!input) return;

    const email = input.value.trim();
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }

    setState(form, 'loading');

    const result = await submitEmail(email);

    if (result.ok) {
      setSubscribed();
      setState(form, 'success', "Thanks — we'll stay connected.");
      return;
    }

    setState(form, 'error', result.error ?? 'Something went wrong.');
  });
}
