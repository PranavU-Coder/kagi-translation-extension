export type TranslateMode = 'plain' | 'linkedin';

const TARGET: Record<TranslateMode, string> = {
  plain:    'Plain English',
  linkedin: 'LinkedIn speak',
};

// I initially wanted to let everyone use my API Key but then I checked the pricing and yea no Im not going bankrupt for this.

export async function translateText(
  text: string,
  mode: TranslateMode,
  apiKey: string,
): Promise<string> {
  const key = apiKey || import.meta.env.VITE_KAGI_API_KEY || '';

  if (!key) {
    throw new Error('No API key set. Go to Settings, paste your Kagi API key.');
  }

  const res = await fetch('https://translate.kagi.com/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify({
      text,
      source_lang: 'en',
      target_lang: TARGET[mode],
    }),
  });

  if (res.status === 401) throw new Error('Invalid API key. Check Settings.');
  if (res.status === 402) throw new Error('Insufficient Kagi credits.');
  if (!res.ok) throw new Error(`Kagi API error (${res.status})`);

  const data = await res.json();
  const result = data.translation ?? data.result ?? data.text ?? null;
  if (!result) throw new Error('Unexpected API response.');
  return result as string;
}

export function buildKagiUrl(text: string, mode: TranslateMode): string {
  const params = new URLSearchParams({ from: 'en', to: TARGET[mode], text });
  return `https://translate.kagi.com/?${params.toString()}`;
}