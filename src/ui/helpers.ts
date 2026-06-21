export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function sectionLabel(text: string): string {
  return `<div class="section-label reveal">${escapeHtml(text)}</div>`;
}

export function hudTag(text: string): string {
  return `<span class="hud-tag">${escapeHtml(text)}</span>`;
}

export function hudCoords(text: string): string {
  return `<span class="hud-coords">${escapeHtml(text)}</span>`;
}
