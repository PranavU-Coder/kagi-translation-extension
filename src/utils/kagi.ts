export type TranslateMode = "plain" | "linkedin";

// No API Support vro

const TARGET: Record<TranslateMode, { from: string; to: string }> = {
  plain: { from: "LinkedIn speak", to: "Plain English" },
  linkedin: { from: "Plain English", to: "LinkedIn speak" },
};

export function KagiUrl(text: string, mode: TranslateMode): string {
  const { from, to } = TARGET[mode];
  const params = new URLSearchParams({ from, to, text });
  return `https://translate.kagi.com/?${params.toString()}`;
}
