import type { TranslateMode } from "../utils/kagi";

interface Props {
  onTranslate: (mode: TranslateMode) => void;
  loading: boolean;
}

export default function TranslateBar({ onTranslate, loading }: Props) {
  return (
    <div class="translate-bar">
      <div class="translate-bar-label">Translate selection</div>
      <div class="translate-bar-btns">
        <button
          class={`translate-btn plain ${loading ? "loading" : ""}`}
          onClick={() => onTranslate("plain")}
          title="Translate selected text to Plain English"
        >
          <span class="translate-btn-icon">✏️</span>
          <span class="translate-btn-label">Plain English</span>
        </button>
        <button
          class={`translate-btn linkedin ${loading ? "loading" : ""}`}
          onClick={() => onTranslate("linkedin")}
          title="Translate selected text to LinkedIn Speak"
        >
          <span class="translate-btn-icon">💼</span>
          <span class="translate-btn-label">LinkedIn</span>
        </button>
      </div>
    </div>
  );
}
