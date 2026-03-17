import type { HistoryItem } from "../utils/storage";

interface Props {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

const MODE_ICON: Record<string, string> = { plain: "✏️", linkedin: "💼" };

function timeAgo(ts: number): string {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function HistoryList({ items, onSelect }: Props) {
  return (
    <div>
      <div class="history-header">Recent</div>
      {items.map((item) => (
        <div key={item.id} class="history-item" onClick={() => onSelect(item)}>
          <div class={`history-mode-badge ${item.mode}`}>
            {MODE_ICON[item.mode]}
          </div>
          <div class="history-text">
            <div class="history-original">{item.original}</div>
            <div class="history-result">{item.result}</div>
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "var(--text-3)",
              flexShrink: 0,
              marginTop: "2px",
            }}
          >
            {timeAgo(item.timestamp)}
          </div>
        </div>
      ))}
    </div>
  );
}
