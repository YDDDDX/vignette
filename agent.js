const modeLabels = {
  quick: "Quick Create｜快速生成",
  remix: "Remix Reference｜参考广告改写",
  scale: "Scale Winners｜爆款放大",
};

const agentPrompt = document.querySelector("#agentPrompt");
const runAgentButton = document.querySelector("#runAgent");
const agentResult = document.querySelector("#agentResult");
const deckSlides = Array.from(document.querySelectorAll(".showcase-slide"));
const deckDots = Array.from(document.querySelectorAll(".deck-progress span"));

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showAgentMessage(message) {
  agentResult.hidden = false;
  agentResult.innerHTML = `<p>${escapeHtml(message)}</p>`;
}

function persistAgentResult(result, description, recommendedMode) {
  sessionStorage.setItem("vignetteAgentMode", recommendedMode);
  sessionStorage.setItem("vignetteAgentDescription", description);
  sessionStorage.setItem("vignetteAgentSummary", JSON.stringify(result.summary || {}));
  sessionStorage.setItem("vignetteAgentBrief", JSON.stringify(result.creativeBrief || null));
}

function showDeckSlide(index) {
  deckSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === index);
  });
  deckDots.forEach((dot, dotIndex) => {
    dot.classList.remove("active");
    if (dotIndex === index) {
      window.requestAnimationFrame(() => dot.classList.add("active"));
    }
  });
}

function initModeDeck() {
  if (deckSlides.length <= 1) return;
  let activeIndex = 0;
  showDeckSlide(activeIndex);
  window.setInterval(() => {
    activeIndex = (activeIndex + 1) % deckSlides.length;
    showDeckSlide(activeIndex);
  }, 3200);
}

runAgentButton.addEventListener("click", async () => {
  const description = agentPrompt.value.trim();
  if (!description) {
    agentPrompt.focus();
    showAgentMessage("请先描述你的广告需求。");
    return;
  }

  runAgentButton.disabled = true;
  showAgentMessage("Agent 正在分析需求...");

  try {
    const session = await window.vignetteAuth?.getCurrentSession().catch(() => null);
    const headers = { "content-type": "application/json" };
    if (session?.access_token) {
      headers.authorization = `Bearer ${session.access_token}`;
    }

    const response = await fetch("/api/agent", {
      method: "POST",
      headers,
      body: JSON.stringify({ description }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Agent 分析失败");

    const recommendedMode = modeLabels[result.recommendedMode] ? result.recommendedMode : "quick";
    const missing = Array.isArray(result.missingInfo) ? result.missingInfo : [];
    persistAgentResult(result, description, recommendedMode);

    agentResult.innerHTML = `
      <div class="agent-result-head">
        <span>推荐模式</span>
        <strong>${escapeHtml(modeLabels[recommendedMode])}</strong>
        <small>Confidence ${escapeHtml(result.confidence ?? "-")}%</small>
      </div>
      <p>${escapeHtml(result.reason || "已根据你的描述推荐生成路径。")}</p>
      <dl>
        <div><dt>Product</dt><dd>${escapeHtml(result.summary?.product || "未识别")}</dd></div>
        <div><dt>Goal</dt><dd>${escapeHtml(result.summary?.goal || "未识别")}</dd></div>
        <div><dt>Assets</dt><dd>${escapeHtml(result.summary?.availableAssets || "未识别")}</dd></div>
        <div><dt>Audience</dt><dd>${escapeHtml(result.summary?.audience || "未识别")}</dd></div>
      </dl>
      <div class="agent-brief-note">
        <strong>下一步</strong>
        <span>${escapeHtml(result.suggestedNextStep || "进入详细页，补充产品、素材和生成策略。")}</span>
      </div>
      <div class="agent-missing">
        <strong>还需要补充</strong>
        <ul>${missing.map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>暂无</li>"}</ul>
      </div>
      <a class="primary-button" href="./details.html?mode=${recommendedMode}">
        继续填写详细信息
        <i data-lucide="arrow-right"></i>
      </a>
    `;
    window.lucide?.createIcons();
  } catch (error) {
    showAgentMessage(error.message);
  } finally {
    runAgentButton.disabled = false;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const pendingPrompt = sessionStorage.getItem("vignettePendingPrompt");
  if (pendingPrompt && !agentPrompt.value) {
    agentPrompt.value = pendingPrompt;
    sessionStorage.removeItem("vignettePendingPrompt");
  }
  window.lucide?.createIcons();
  initModeDeck();
});
