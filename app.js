const modeMeta = {
  quick: {
    name: "Quick Create",
    description: "从产品信息和模板快速生成一批可测试广告。",
    briefTitle: "从产品快速生成广告",
    briefCopy: "适合刚开始测试的卖家，只需要产品信息和基础素材，就能生成一批低门槛广告变体。",
    tags: ["低门槛", "模板生成", "快速测试"],
    assetsTitle: "产品素材",
    assetsHelp: "上传产品图、卖点和基础素材，不需要参考广告也能生成。",
    uploads: [
      ["产品素材", "主图、细节图、开箱、实拍"],
      ["品牌资料", "Logo、色彩、禁用表达"],
      ["可选数据", "已有素材或简单投放结果"],
    ],
    referenceLabel: "可选参考链接",
    referencePlaceholder: "可不填写；也可以放入你喜欢的广告、店铺或竞品链接",
    strategyTitle: "快速生成策略",
    strategyHelp: "选择一个广告模板方向，快速产出首批可测试素材。",
    styles: [
      { name: "UGC 口播", note: "真人出镜，像用户真实推荐", visual: "ugc" },
      { name: "痛点广告", note: "先戳问题，再给解决方案", visual: "pain" },
      { name: "Before-After", note: "用前后对比制造冲击", visual: "before" },
      { name: "产品 Demo", note: "直接展示功能和效果", visual: "demo" },
      { name: "测评风格", note: "像达人测评一样讲清优缺点", visual: "review" },
      { name: "剧情短剧", note: "用小冲突带出购买理由", visual: "story" },
    ],
    quantity: "10",
    constraintsLabel: "不要出现的内容",
    constraintsPlaceholder: "例如 不要夸大疗效，不要使用医生形象，不要提及竞品品牌名。",
    outputs: ["10 条广告脚本", "Hook 与字幕方向", "镜头分镜建议", "基础 A/B 测试组合"],
  },
  remix: {
    name: "Remix Reference",
    description: "拆解参考广告的 hook、镜头和 CTA，再换成当前产品生成原创变体。",
    briefTitle: "按参考广告生成原创变体",
    briefCopy: "适合看到竞品或历史广告跑得好时，把它的结构拆出来，再替换成自己的产品逻辑。",
    tags: ["参考拆解", "结构复用", "原创改写"],
    assetsTitle: "参考广告与产品替换",
    assetsHelp: "重点上传要学习的广告，以及当前产品可替换进去的素材。",
    uploads: [
      ["产品素材", "可替换进参考广告的镜头"],
      ["参考广告", "竞品 winner、历史 winner、灵感视频"],
      ["表现备注", "为什么喜欢它、哪里跑得好"],
    ],
    referenceLabel: "必填参考广告链接",
    referencePlaceholder: "每行一条参考广告链接，并备注你想学习的点：hook、节奏、场景、CTA",
    strategyTitle: "Remix 策略",
    strategyHelp: "选择要复用的广告逻辑，系统会生成不照搬的原创变体。",
    styles: [
      { name: "复刻 Hook 逻辑", note: "学习开头吸引注意的方式", visual: "hook" },
      { name: "替换产品场景", note: "保留结构，换成你的产品", visual: "scene" },
      { name: "改写痛点链路", note: "同样逻辑，换一组痛点", visual: "pain" },
      { name: "保留剪辑节奏", note: "复用镜头节拍和字幕速度", visual: "timeline" },
      { name: "重写 CTA", note: "换结尾转化表达", visual: "cta" },
      { name: "多角度变体", note: "同一结构扩展多个角度", visual: "matrix" },
    ],
    quantity: "20",
    constraintsLabel: "原创与合规限制",
    constraintsPlaceholder: "例如 不要逐句照抄，不要使用竞品品牌名，不要复用原视频人物或商标。",
    outputs: ["参考广告结构拆解", "可复用创意蓝图", "20 条原创变体脚本", "镜头替换建议"],
  },
  scale: {
    name: "Scale Winners",
    description: "结合历史广告和投放数据，学习有效结构并生成下一批测试素材。",
    briefTitle: "基于历史数据放大 winner",
    briefCopy: "适合已经有投放数据的团队，从历史广告里学习什么有效，再生成下一批测试素材。",
    tags: ["数据学习", "批量扩展", "持续迭代"],
    assetsTitle: "历史广告与投放数据",
    assetsHelp: "重点上传历史广告、花费、CTR、CPA、ROAS 等结果，用于学习有效模式。",
    uploads: [
      ["历史广告", "已投放视频、缩略图、脚本"],
      ["投放数据", "Spend、CTR、CPA、ROAS"],
      ["Winner 备注", "标记最好和最差的素材"],
    ],
    referenceLabel: "历史广告 / 数据说明",
    referencePlaceholder: "写清楚哪几条是 winner，目标是降 CPA、提 CTR、还是提升 ROAS",
    strategyTitle: "Scale 策略",
    strategyHelp: "选择要放大的有效信号，生成下一批更系统的测试组合。",
    styles: [
      { name: "放大高 CTR Hook", note: "把点击率高的开头扩成系列", visual: "hook" },
      { name: "降低 CPA 变体", note: "围绕转化成本优化表达", visual: "cpa" },
      { name: "ROAS winner 扩展", note: "把高回报素材做成组合", visual: "roas" },
      { name: "人群分层测试", note: "不同人群不同卖点入口", visual: "audience" },
      { name: "卖点矩阵测试", note: "卖点、场景、hook 交叉测试", visual: "matrix" },
      { name: "下一批测试计划", note: "按优先级生成测试队列", visual: "plan" },
    ],
    quantity: "50",
    constraintsLabel: "测试边界",
    constraintsPlaceholder: "例如 不要改变核心卖点，不要扩大预算假设，不要混用不同市场的数据。",
    outputs: ["历史素材表现复盘", "有效创意模式总结", "下一批 50 条测试方向", "A/B 测试矩阵"],
  },
  agent: {
    name: "Agent Mode",
    description: "根据你的自然语言描述，自动判断该使用 Quick、Remix 还是 Scale。",
    briefTitle: "让 Agent 先判断路径",
    briefCopy: "适合你还不确定该从产品、参考广告还是历史数据开始时，先把需求讲清楚。",
    tags: ["自动判断", "需求总结", "补充清单"],
    assetsTitle: "Agent 识别中",
    assetsHelp: "先在上方描述你的需求，Agent 会给出推荐模式和下一步。",
    uploads: [
      ["需求描述", "产品、素材、目标和约束"],
      ["模式推荐", "Quick / Remix / Scale"],
      ["信息缺口", "下一步需要补充什么"],
    ],
    referenceLabel: "Agent 分析结果",
    referencePlaceholder: "Agent 会把你的需求总结到这里。",
    strategyTitle: "Agent 策略",
    strategyHelp: "先让 Agent 判断最适合的生成路径。",
    styles: [
      { name: "自动选择模式", note: "让 Agent 先判断从哪里开始", visual: "agent" },
      { name: "总结需求", note: "提炼产品、目标和素材", visual: "plan" },
      { name: "列出缺失信息", note: "告诉你还需要补什么", visual: "matrix" },
      { name: "给下一步建议", note: "转入对应生成模式", visual: "cta" },
    ],
    quantity: "10",
    constraintsLabel: "Agent 需要注意的约束",
    constraintsPlaceholder: "例如 不要夸大疗效，需要面向美国 TikTok，不要使用竞品品牌名。",
    outputs: ["推荐生成模式", "需求信息总结", "缺失信息清单", "下一步填写建议"],
  },
};

const form = document.querySelector("#intakeForm");
const tabs = document.querySelectorAll(".tab");
const toast = document.querySelector("#toast");
const draftButton = document.querySelector("#saveDraft");
const agentPanel = document.querySelector("#agentPanel");
const agentPrompt = document.querySelector("#agentPrompt");
const runAgentButton = document.querySelector("#runAgent");
const agentResult = document.querySelector("#agentResult");
const stepPanels = document.querySelectorAll(".step-panel");
const stepIndicators = document.querySelectorAll("[data-step-indicator]");
const prevStepButton = document.querySelector("#prevStep");
const nextStepButton = document.querySelector("#nextStep");
const submitBriefButton = document.querySelector("#submitBrief");
let currentStep = 0;

const preview = {
  modeName: document.querySelector("#modeName"),
  modeDescription: document.querySelector("#modeDescription"),
  brand: document.querySelector("#previewBrand"),
  platform: document.querySelector("#previewPlatform"),
  style: document.querySelector("#previewStyle"),
  quantity: document.querySelector("#previewQuantity"),
};

const modeFields = {
  briefTitle: document.querySelector("#modeBriefTitle"),
  briefCopy: document.querySelector("#modeBriefCopy"),
  tags: document.querySelector("#modeTags"),
  assetsTitle: document.querySelector("#assetsTitle"),
  assetsHelp: document.querySelector("#assetsHelp"),
  productAssetsLabel: document.querySelector("#productAssetsLabel"),
  productAssetsHint: document.querySelector("#productAssetsHint"),
  referenceAdsLabel: document.querySelector("#referenceAdsLabel"),
  referenceAdsHint: document.querySelector("#referenceAdsHint"),
  performanceDataLabel: document.querySelector("#performanceDataLabel"),
  performanceDataHint: document.querySelector("#performanceDataHint"),
  referenceLabel: document.querySelector("#referenceLabel"),
  referenceLinks: document.querySelector("textarea[name='referenceLinks']"),
  strategyTitle: document.querySelector("#strategyTitle"),
  strategyHelp: document.querySelector("#strategyHelp"),
  styleChoices: document.querySelector("#styleChoices"),
  quantity: document.querySelector("input[name='quantity']"),
  constraintsLabel: document.querySelector("#constraintsLabel"),
  constraints: document.querySelector("textarea[name='constraints']"),
  outputList: document.querySelector("#outputList"),
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

function updatePreview() {
  const data = new FormData(form);
  const checkedStyle = form.querySelector("input[name='style']:checked");

  preview.brand.textContent = data.get("brand") || "待填写";
  preview.platform.textContent = data.get("platform") || "TikTok";
  preview.style.textContent = checkedStyle ? checkedStyle.value : "UGC 口播";
  preview.quantity.textContent = data.get("quantity") || "10";
}

function updateStep() {
  stepPanels.forEach((panel, index) => {
    panel.classList.toggle("active", index === currentStep);
  });
  stepIndicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentStep);
    indicator.classList.toggle("completed", index < currentStep);
  });
  prevStepButton.hidden = currentStep === 0;
  nextStepButton.hidden = currentStep === stepPanels.length - 1;
  submitBriefButton.hidden = currentStep !== stepPanels.length - 1;
}

function setModeTab(mode) {
  tabs.forEach((item) => {
    const selected = item.dataset.mode === mode;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-selected", String(selected));
  });
  applyMode(mode);
}

function validateCurrentStep() {
  const requiredFields = stepPanels[currentStep].querySelectorAll("[required]");
  for (const field of requiredFields) {
    if (!field.reportValidity()) return false;
  }
  return true;
}

function renderStyleChoices(styles) {
  modeFields.styleChoices.innerHTML = styles
    .map((style, index) => {
      const checked = index === 0 ? " checked" : "";
      const activeClass = index === 0 ? " checked" : "";
      return `
        <label class="choice${activeClass}">
          <span class="choice-visual visual-${style.visual}" aria-hidden="true"></span>
          <span class="choice-copy">
            <strong>${style.name}</strong>
            <small>${style.note}</small>
          </span>
          <input type="radio" name="style" value="${style.name}"${checked} />
        </label>
      `;
    })
    .join("");
}

function applyMode(mode) {
  const meta = modeMeta[mode];
  const isAgent = mode === "agent";
  agentPanel.hidden = !isAgent;
  form.hidden = isAgent;
  preview.modeName.textContent = meta.name;
  preview.modeDescription.textContent = meta.description;
  modeFields.briefTitle.textContent = meta.briefTitle;
  modeFields.briefCopy.textContent = meta.briefCopy;
  modeFields.tags.innerHTML = meta.tags.map((tag) => `<span>${tag}</span>`).join("");
  modeFields.assetsTitle.textContent = meta.assetsTitle;
  modeFields.assetsHelp.textContent = meta.assetsHelp;
  modeFields.productAssetsLabel.textContent = meta.uploads[0][0];
  modeFields.productAssetsHint.textContent = meta.uploads[0][1];
  modeFields.referenceAdsLabel.textContent = meta.uploads[1][0];
  modeFields.referenceAdsHint.textContent = meta.uploads[1][1];
  modeFields.performanceDataLabel.textContent = meta.uploads[2][0];
  modeFields.performanceDataHint.textContent = meta.uploads[2][1];
  modeFields.referenceLabel.textContent = meta.referenceLabel;
  modeFields.referenceLinks.placeholder = meta.referencePlaceholder;
  modeFields.strategyTitle.textContent = meta.strategyTitle;
  modeFields.strategyHelp.textContent = meta.strategyHelp;
  modeFields.quantity.value = meta.quantity;
  modeFields.constraintsLabel.textContent = meta.constraintsLabel;
  modeFields.constraints.placeholder = meta.constraintsPlaceholder;
  modeFields.outputList.innerHTML = meta.outputs.map((item) => `<li>${item}</li>`).join("");
  renderStyleChoices(meta.styles);
  updatePreview();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const mode = tab.dataset.mode;
    setModeTab(mode);
  });
});

form.addEventListener("input", updatePreview);
form.addEventListener("change", (event) => {
  if (event.target.name === "style") {
    document.querySelectorAll(".choice").forEach((choice) => {
      choice.classList.toggle("checked", choice.contains(event.target));
    });
  }
  updatePreview();
});

nextStepButton.addEventListener("click", () => {
  if (!validateCurrentStep()) return;
  currentStep = Math.min(currentStep + 1, stepPanels.length - 1);
  updateStep();
  document.querySelector(".step-progress").scrollIntoView({ behavior: "smooth", block: "start" });
});

prevStepButton.addEventListener("click", () => {
  currentStep = Math.max(currentStep - 1, 0);
  updateStep();
  document.querySelector(".step-progress").scrollIntoView({ behavior: "smooth", block: "start" });
});

runAgentButton.addEventListener("click", async () => {
  const description = agentPrompt.value.trim();
  if (!description) {
    showToast("请先描述你的广告需求。");
    agentPrompt.focus();
    return;
  }

  runAgentButton.disabled = true;
  agentResult.hidden = false;
  agentResult.innerHTML = "<p>Agent 正在分析需求...</p>";

  try {
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ description }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Agent 分析失败");

    const modeName = modeMeta[result.recommendedMode]?.name || result.recommendedMode;
    const missing = Array.isArray(result.missingInfo) ? result.missingInfo : [];
    agentResult.innerHTML = `
      <div class="agent-result-head">
        <span>推荐模式</span>
        <strong>${modeName}</strong>
        <small>Confidence ${result.confidence ?? "-"}%</small>
      </div>
      <p>${result.reason || ""}</p>
      <dl>
        <div><dt>产品</dt><dd>${result.summary?.product || "未识别"}</dd></div>
        <div><dt>目标</dt><dd>${result.summary?.goal || "未识别"}</dd></div>
        <div><dt>素材</dt><dd>${result.summary?.availableAssets || "未识别"}</dd></div>
        <div><dt>受众</dt><dd>${result.summary?.audience || "未识别"}</dd></div>
      </dl>
      <div class="agent-missing">
        <strong>还需要补充</strong>
        <ul>${missing.map((item) => `<li>${item}</li>`).join("") || "<li>暂无</li>"}</ul>
      </div>
      <button class="primary-button" type="button" data-apply-agent-mode="${result.recommendedMode}">
        切到 ${modeName}
      </button>
    `;
  } catch (error) {
    agentResult.innerHTML = `<p>${error.message}</p>`;
  } finally {
    runAgentButton.disabled = false;
  }
});

agentResult.addEventListener("click", (event) => {
  const button = event.target.closest("[data-apply-agent-mode]");
  if (!button) return;
  const mode = button.dataset.applyAgentMode;
  if (!modeMeta[mode]) return;
  setModeTab(mode);
  currentStep = 0;
  updateStep();
});

draftButton.addEventListener("click", () => {
  const data = Object.fromEntries(new FormData(form).entries());
  data.mode = document.querySelector(".tab.active").dataset.mode;
  localStorage.setItem("vignetteDraft", JSON.stringify(data));
  showToast("草稿已保存在当前浏览器。");
});

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    currentStep = 0;
    updateStep();
    document.querySelectorAll(".choice").forEach((choice) => {
      const input = choice.querySelector("input");
      choice.classList.toggle("checked", input.checked);
    });
    updatePreview();
  }, 0);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const payload = Object.fromEntries(new FormData(form).entries());
  payload.mode = document.querySelector(".tab.active").dataset.mode;
  console.table(payload);
  showToast("创意 Brief 已生成，数据已输出到浏览器控制台。");
});

window.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  applyMode("quick");
  updateStep();
  updatePreview();
});
