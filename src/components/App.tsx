import { useState, useEffect, useCallback } from "preact/hooks";
import Header from "./Header";
import TranslateBar from "./TranslateBar";
import TranslateDrawer from "./TranslateDrawer";
import Settings from "./Settings";
import EmptyState from "./EmptyState";
import HistoryList from "./HistoryList";
import {
  getApiKey,
  setApiKey,
  getHistory,
  addToHistory,
  clearHistory,
  type HistoryItem,
} from "../utils/storage";
import { translateText, type TranslateMode } from "../utils/kagi";

export type DrawerState = "closed" | "loading" | "result" | "error";

export interface ActiveTranslation {
  original: string;
  result: string;
  mode: TranslateMode;
  error?: string;
}

export default function App() {
  const [view, setView] = useState<"main" | "settings">("main");
  const [drawerState, setDrawerState] = useState<DrawerState>("closed");
  const [drawerMode, setDrawerMode] = useState<TranslateMode>("plain");
  const [active, setActive] = useState<ActiveTranslation | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [apiKey, setApiKeyState] = useState("");
  const [noText, setNoText] = useState(false);

  useEffect(() => {
    getApiKey().then((k) => setApiKeyState(k));
    getHistory().then((h) => setHistory(h));

    chrome.storage.session?.get("kagi_pending", (r) => {
      if (r?.kagi_pending) {
        const { mode, text } = r.kagi_pending;
        chrome.storage.session.remove("kagi_pending");
        handleTranslate(mode as TranslateMode, text);
      }
    });
  }, []);

  useEffect(() => {
    const listener = (msg: any) => {
      if (msg.type === "TRANSLATE_SELECTION" && msg.text) {
        handleTranslate(msg.mode as TranslateMode, msg.text);
      }
    };
    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, [apiKey]);

  const handleTranslate = useCallback(
    async (mode: TranslateMode, preloadedText?: string) => {
      setNoText(false);
      let text = preloadedText;

      // if no text preloaded just ask the background to grab the page selection
      if (!text) {
        const reply = (await chrome.runtime
          .sendMessage({ type: "GET_SELECTION" })
          .catch(() => ({ text: "" }))) as { text: string };
        text = reply.text;
      }

      if (!text) {
        setNoText(true);
        return;
      }

      // open the drawer in loading state immediately
      setDrawerMode(mode);
      setActive({ original: text, result: "", mode });
      setDrawerState("loading");

      try {
        const result = await translateText(text, mode, apiKey);
        const item: HistoryItem = {
          id: Date.now().toString(),
          original: text,
          result,
          mode,
          timestamp: Date.now(),
        };

        setActive({ original: text, result, mode });
        setDrawerState("result");

        const updated = await addToHistory(item).then(() => getHistory());
        setHistory(updated);
      } catch (err: any) {
        setActive({ original: text, result: "", mode, error: err.message });
        setDrawerState("error");
      }
    },
    [apiKey],
  );

  const closeDrawer = () => setDrawerState("closed");

  const openHistoryItem = (item: HistoryItem) => {
    setDrawerMode(item.mode);
    setActive({
      original: item.original,
      result: item.result,
      mode: item.mode,
    });
    setDrawerState("result");
  };

  const handleClearHistory = async () => {
    await clearHistory();
    setHistory([]);
  };

  if (view === "settings") {
    return (
      <Settings
        apiKey={apiKey}
        onSave={async (key) => {
          await setApiKey(key);
          setApiKeyState(key);
          setView("main");
        }}
        onBack={() => setView("main")}
        onClearHistory={handleClearHistory}
      />
    );
  }

  return (
    <div class="app">
      <Header onSettingsClick={() => setView("settings")} />

      <main class="content">
        {noText && (
          <div class="no-selection-notice">
            <svg viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                stroke-width="1.2"
              />
              <path
                d="M8 5v3.5M8 11h.01"
                stroke="currentColor"
                stroke-width="1.3"
                stroke-linecap="round"
              />
            </svg>
            Select text on the page, then click a button below.
          </div>
        )}
        {history.length === 0 ? (
          <EmptyState />
        ) : (
          <HistoryList items={history} onSelect={openHistoryItem} />
        )}
      </main>

      <div class="drawer-overlay">
        <TranslateDrawer
          state={drawerState}
          mode={drawerMode}
          active={active}
          onClose={closeDrawer}
          onRetry={() => active && handleTranslate(drawerMode, active.original)}
        />
      </div>

      <TranslateBar
        onTranslate={handleTranslate}
        loading={drawerState === "loading"}
      />
    </div>
  );
}
