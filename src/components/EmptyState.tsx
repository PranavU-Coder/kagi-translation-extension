export default function EmptyState() {
  return (
    <div class="empty-state">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M3 5h18M3 10h18M3 15h12M3 20h8"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="empty-title">No translations yet</div>
      <div class="empty-desc">
        Select text on any page and use the buttons below or right-click and
        choose Kagi Translate.
      </div>
    </div>
  );
}
