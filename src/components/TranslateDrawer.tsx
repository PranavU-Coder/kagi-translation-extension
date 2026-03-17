import { useState } from "preact/hooks";
import type { DrawerState, ActiveTranslation } from "./App";
import type { TranslateMode } from "../utils/kagi";
import { buildKagiUrl } from "../utils/kagi";

interface Props {
  state: DrawerState;
  mode: TranslateMode;
  active: ActiveTranslation | null;
  onClose: () => void;
  onRetry: () => void;
}

const MODE_LABEL: Record<TranslateMode, string> = {
  plain: "Plain English",
  linkedin: "LinkedIn Speak",
};
const MODE_ICON: Record<TranslateMode, string> = {
  plain: "✏️",
  linkedin: "💼",
};

export default function TranslateDrawer({
  state,
  mode,
  active,
  onClose,
  onRetry,
}: Props) {
  const [copied, setCopied] = useState(false);
  const isOpen = state !== "closed";

  const handleCopy = async () => {
    if (!active?.result) return;
    await navigator.clipboard.writeText(active.result).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenKagi = () => {
    if (!active?.original) return;
    const url = buildKagiUrl(active.original, mode);
    window.open(url, "_blank");
  };

  return (
    <div class={`drawer ${isOpen ? "open" : ""}`}>
      <div class="drawer-header">
        <div class={`drawer-mode-pill ${mode}`}>
          <span class="drawer-mode-pill-icon">{MODE_ICON[mode]}</span>
          {MODE_LABEL[mode]}
        </div>
        <button class="drawer-close" onClick={onClose} title="Close">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6 6 18M6 6l12 12"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <div class="drawer-body">
        {state === "loading" && (
          <div class="loading-state">
            <div class="spinner" />
            <div class="loading-label">Translating with Kagi…</div>
          </div>
        )}

        {(state === "result" || state === "error") && active && (
          <>
            <div>
              <div class="drawer-section-label">Original</div>
              <div class="drawer-original-box">{active.original}</div>
            </div>

            {state === "result" && (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <div class="drawer-section-label">Result</div>
                <div class="drawer-result-box">{active.result}</div>
              </div>
            )}

            {state === "error" && (
              <div>
                <div class="drawer-section-label">Error</div>
                <div class="drawer-error-box">
                  {active.error || "Something went wrong."}
                </div>
                <button class="fallback-cta" onClick={handleOpenKagi}>
                  Open Kagi Translate
                </button>
              </div>
            )}
          </>
        )}

        {state === "result" && active?.result && (
          <div class="drawer-actions">
            <button
              class={`drawer-action-btn primary ${copied ? "copied" : ""}`}
              onClick={handleCopy}
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <button class="drawer-action-btn" onClick={handleOpenKagi}>
              Open Kagi 
            </button>
            <button class="drawer-action-btn" onClick={onRetry}>
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
