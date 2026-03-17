const KEYS = {
  API_KEY: "kagi_api_key",
  HISTORY: "kagi_history",
} as const;

export async function getApiKey(): Promise<string> {
  const r = await chrome.storage.local.get(KEYS.API_KEY);
  return r[KEYS.API_KEY] || "";
}

export async function setApiKey(key: string): Promise<void> {
  await chrome.storage.local.set({ [KEYS.API_KEY]: key });
}

export interface HistoryItem {
  id: string;
  original: string;
  result: string;
  mode: "plain" | "linkedin";
  timestamp: number;
}

export async function getHistory(): Promise<HistoryItem[]> {
  const r = await chrome.storage.local.get(KEYS.HISTORY);
  return r[KEYS.HISTORY] || [];
}

export async function addToHistory(item: HistoryItem): Promise<void> {
  const existing = await getHistory();
  const updated = [item, ...existing].slice(0, 25);
  await chrome.storage.local.set({ [KEYS.HISTORY]: updated });
}

export async function clearHistory(): Promise<void> {
  await chrome.storage.local.remove(KEYS.HISTORY);
}
