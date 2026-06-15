const historyGrid = document.querySelector("#historyGrid");
const historyStatus = document.querySelector("#historyStatus");
const emptyTemplate = document.querySelector("#emptyHistoryTemplate");

function escapeHistoryHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "刚刚";
  }
}

function briefLine(entry, key, fallback) {
  return entry.brief?.[key] || fallback || "待补充";
}

function renderStatus(isSignedIn, count) {
  historyStatus.innerHTML = `
    <div>
      <strong>${count} 条 Brief</strong>
      <span>${isSignedIn ? "已登录：会尝试云端同步；如果 Supabase 表未创建，会保留本地记录。" : "未登录：历史保存在当前浏览器，换设备后不可见。"}</span>
    </div>
    <a href="./details.html" class="secondary-button">
      <i data-lucide="plus"></i>
      新建记录
    </a>
  `;
}

function renderCard(entry) {
  const storageLabel = entry.storage === "cloud" ? "云端同步" : "本地保存";
  const storageIcon = entry.storage === "cloud" ? "cloud-check" : "hard-drive";
  return `
    <article class="history-card" data-history-id="${escapeHistoryHtml(entry.id)}">
      <div class="history-card-head">
        <div>
          <span>${escapeHistoryHtml(entry.modeName)}</span>
          <h2>${escapeHistoryHtml(entry.title)}</h2>
        </div>
        <time datetime="${escapeHistoryHtml(entry.createdAt)}">${escapeHistoryHtml(formatDate(entry.createdAt))}</time>
      </div>
      <p>${escapeHistoryHtml(entry.summary || briefLine(entry, "productSummary", "已保存创意简报，可展开查看脚本结构和测试计划。"))}</p>
      <div class="history-tags">
        <span>${escapeHistoryHtml(entry.platform)}</span>
        <span>${escapeHistoryHtml(entry.style)}</span>
        <span>${escapeHistoryHtml(entry.quantity)} 条</span>
        <span><i data-lucide="${storageIcon}"></i>${storageLabel}</span>
      </div>
      <details>
        <summary>查看 Brief 细节</summary>
        <dl class="history-brief-list">
          <div><dt>Product Summary</dt><dd>${escapeHistoryHtml(briefLine(entry, "productSummary"))}</dd></div>
          <div><dt>Target Audience</dt><dd>${escapeHistoryHtml(briefLine(entry, "audience"))}</dd></div>
          <div><dt>Pain Points</dt><dd>${escapeHistoryHtml(briefLine(entry, "painPoints"))}</dd></div>
          <div><dt>Core Selling Angles</dt><dd>${escapeHistoryHtml(briefLine(entry, "sellingAngles"))}</dd></div>
          <div><dt>Hook Variants</dt><dd>${escapeHistoryHtml(briefLine(entry, "hooks"))}</dd></div>
          <div><dt>Script Structure</dt><dd>${escapeHistoryHtml(briefLine(entry, "scriptStructure"))}</dd></div>
          <div><dt>Shot List</dt><dd>${escapeHistoryHtml(briefLine(entry, "shotList"))}</dd></div>
          <div><dt>CTA Direction</dt><dd>${escapeHistoryHtml(briefLine(entry, "ctaDirection"))}</dd></div>
          <div><dt>Risk / Compliance Notes</dt><dd>${escapeHistoryHtml(briefLine(entry, "riskNotes"))}</dd></div>
          <div><dt>A/B Testing Plan</dt><dd>${escapeHistoryHtml(briefLine(entry, "testing"))}</dd></div>
        </dl>
      </details>
      <div class="history-card-actions">
        <a class="secondary-button" href="./details.html?history=${encodeURIComponent(entry.id)}">
          继续编辑
          <i data-lucide="arrow-right"></i>
        </a>
        <button class="text-danger" type="button" data-delete-history="${escapeHistoryHtml(entry.id)}">删除</button>
      </div>
    </article>
  `;
}

async function renderHistory() {
  const session = await window.vignetteAuth?.getCurrentSession?.().catch(() => null);
  const entries = await window.vignetteHistory.listBriefs();
  renderStatus(Boolean(session), entries.length);

  if (!entries.length) {
    historyGrid.innerHTML = "";
    historyGrid.appendChild(emptyTemplate.content.cloneNode(true));
    window.lucide?.createIcons();
    return;
  }

  historyGrid.innerHTML = entries.map(renderCard).join("");
  window.lucide?.createIcons();
}

historyGrid.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-delete-history]");
  if (!button) return;
  await window.vignetteHistory.deleteBrief(button.dataset.deleteHistory);
  await renderHistory();
});

window.addEventListener("DOMContentLoaded", renderHistory);
