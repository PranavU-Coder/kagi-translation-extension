import { useState } from "preact/hooks";

interface Props {
  apiKey: string;
  onSave: (key: string) => void;
  onBack: () => void;
  onClearHistory: () => void;
}

export default function Settings({
  apiKey,
  onSave,
  onBack,
  onClearHistory,
}: Props) {
  const [key, setKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleSave = () => {
    onSave(key.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClear = () => {
    onClearHistory();
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  return (
    <div class="settings">
      <div class="settings-header">
        <button class="settings-back" onClick={onBack} title="Back">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12l7-7M5 12l7 7"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <span class="settings-title">Settings</span>
      </div>

      <div class="settings-body">
        <div class="settings-section">
          <div class="settings-section-title">Kagi API Key</div>
          <div class="settings-field">
            <label class="settings-label">API Key</label>
            <input
              class="settings-input"
              type="password"
              placeholder="kagi_••••••••••••••••"
              value={key}
              onInput={(e) => setKey((e.target as HTMLInputElement).value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <p class="settings-hint">
              Please generate a key at{" "}
              <a
                href="https://kagi.com/settings?p=api"
                target="_blank"
                style={{ color: "var(--accent)" }}
              >
                kagi.com/settings?p=api
              </a>
              . Charged at ~$15/million characters.
            </p>
          </div>
          <div style={{ marginTop: "10px" }}>
            <button class="settings-save" onClick={handleSave}>
              {saved ? "Saved" : "Save API Key"}
            </button>
            {saved && (
              <div class="save-success">API key saved successfully</div>
            )}
          </div>
        </div>

        <div class="settings-divider" />

        <div class="settings-section">
          <div class="settings-section-title">Resources</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <a
              class="settings-link"
              href="https://translate.kagi.com"
              target="_blank"
            >
              <span>Open Kagi Translate</span>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a
              class="settings-link"
              href="https://kagi.redocly.app/openapi/translate"
              target="_blank"
            >
              <span>API Docs</span>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div class="settings-divider" />

        <div class="settings-section">
          <div class="settings-section-title">Data</div>
          <button class="settings-clear-btn" onClick={handleClear}>
            {cleared ? "History cleared" : "Clear translation history"}
          </button>
        </div>

        <div
          style={{
            marginTop: "auto",
            fontSize: "11px",
            color: "var(--text-3)",
            textAlign: "center",
            paddingTop: "8px",
          }}
        >
          Kagi Translate Extension v1.0.0
        </div>
      </div>
    </div>
  );
}
