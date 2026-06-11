const modeMeta = {
  quick: {
    name: "Quick Create｜快速生成",
    description: "从产品信息和基础模板快速生成一批可测试广告。",
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
    structure: "Hook → Problem → Product demo → Proof → CTA",
  },
  remix: {
    name: "Remix Reference｜参考广告改写",
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
    structure: "Reference hook → Product swap → New proof → Original CTA",
  },
  scale: {
    name: "Scale Winners｜放大爆款",
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
    structure: "Winner signal → Variant angle → Audience split → Proof → CTA test",
  },
};

const form = document.querySelector("#intakeForm");
const tabs = document.querySelectorAll(".tab");
const toast = document.querySelector("#toast");
const draftButton = document.querySelector("#saveDraft");
const agentPrompt = document.querySelector("#agentPrompt");
const runAgentButton = document.querySelector("#runAgent");
const agentResult = document.querySelector("#agentResult");
const stepPanels = document.querySelectorAll(".step-panel");
const stepIndicators = document.querySelectorAll("[data-step-indicator]");
const prevStepButton = document.querySelector("#prevStep");
const nextStepButton = document.querySelector("#nextStep");
const submitBriefButton = document.querySelector("#submitBrief");
let currentStep = 0;
let latestAgentBrief = null;

const preview = {
  modeName: document.querySelector("#modeName"),
  modeDescription: document.querySelector("#modeDescription"),
  brand: document.querySelector("#previewBrand"),
  platform: document.querySelector("#previewPlatform"),
  style: document.querySelector("#previewStyle"),
  quantity: document.querySelector("#previewQuantity"),
};

const brief = {
  productSummary: document.querySelector("#briefProductSummary"),
  audience: document.querySelector("#briefAudience"),
  painPoints: document.querySelector("#briefPainPoints"),
  sellingAngles: document.querySelector("#briefSellingAngles"),
  adStructure: document.querySelector("#briefAdStructure"),
  hooks: document.querySelector("#briefHooks"),
  visual: document.querySelector("#briefVisual"),
  voiceover: document.querySelector("#briefVoiceover"),
  cta: document.querySelector("#briefCta"),
  testing: document.querySelector("#briefTesting"),
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

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function valueOr(value, fallback) {
  const clean = String(value || "").trim();
  return clean || fallback;
}

function currentMode() {
  return document.querySelector(".tab.active")?.dataset.mode || "quick";
}

function checkedValues(name) {
  return Array.from(form.querySelectorAll(`input[name='${name}']:checked`)).map((item) => item.value);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

function ctaFor(goal) {
  const map = {
    "Get purchases": "Drive viewers to product page with a direct shop-now CTA.",
    "App installs": "Push viewers to install and try the app immediately.",
    "Lead generation": "Ask viewers to claim a quote, demo, or free guide.",
    "Brand awareness": "Prioritize recall, curiosity, and saves over hard selling.",
  };
  return map[goal] || map["Get purchases"];
}

function hookIdeas(product, promise, angle) {
  const productName = product === "待填写" ? "this product" : product;
  const benefit = promise || "the main benefit in seconds";
  const angleMap = {
    "Saves time": [`Stop wasting time on this daily problem.`, `I found a faster way to use ${productName}.`, `${benefit}, without adding another step.`],
    "Saves money": [`Before you buy another expensive fix, watch this.`, `${productName} may replace the thing you keep rebuying.`, `This is the budget-friendly way to get ${benefit}.`],
    "Looks better": [`The small upgrade that makes the result look cleaner.`, `I did not expect ${productName} to look this good.`, `${benefit}, but make it camera-ready.`],
    "Solves pain": [`If this problem annoys you every day, start here.`, `The easiest way I found to handle this pain point.`, `${benefit}, without the usual frustration.`],
    "Social proof": [`People are switching to ${productName} for one reason.`, `The comments were right about this product.`, `I tested the product everyone keeps talking about.`],
    "Novelty / curiosity": [`I did not know this existed until today.`, `This product looks weird, but the use case is obvious.`, `Watch what happens when ${productName} solves the problem.`],
  };
  return angleMap[angle] || angleMap["Solves pain"];
}

function applyAgentBrief(agentBrief) {
  if (!agentBrief || typeof agentBrief !== "object") return;
  const mapping = [
    ["productSummary", "productSummary"],
    ["audience", "targetAudience"],
    ["painPoints", "painPoints"],
    ["sellingAngles", "coreSellingAngles"],
    ["adStructure", "adStructure"],
    ["hooks", "hookVariants"],
    ["visual", "visualDirection"],
    ["voiceover", "voiceoverTone"],
    ["cta", "cta"],
    ["testing", "abTestingPlan"],
  ];
  mapping.forEach(([target, source]) => {
    const value = String(agentBrief[source] || "").trim();
    if (value) brief[target].textContent = value;
  });
}

function updatePreview() {
  const data = new FormData(form);
  const checkedStyle = form.querySelector("input[name='style']:checked");
  const mode = currentMode();
  const meta = modeMeta[mode];
  const brand = valueOr(data.get("brand"), "待填写");
  const platform = valueOr(data.get("platform"), "TikTok");
  const style = checkedStyle ? checkedStyle.value : "UGC 口播";
  const quantity = valueOr(data.get("quantity"), meta.quantity);
  const promise = String(data.get("promise") || "").trim();
  const audience = String(data.get("audience") || "").trim();
  const market = valueOr(data.get("market"), "美国");
  const adGoal = valueOr(data.get("adGoal"), "Get purchases");
  const priceRange = valueOr(data.get("priceRange"), "Under $20");
  const sellingAngle = valueOr(data.get("sellingAngle"), "Saves time");
  const duration = valueOr(data.get("duration"), "15 秒");
  const language = valueOr(data.get("language"), "英语");
  const constraints = String(data.get("constraints") || "").trim();
  const assetConstraints = checkedValues("assetConstraints");
  const referenceLinks = String(data.get("referenceLinks") || "").trim();
  const hooks = hookIdeas(brand, promise, sellingAngle);

  preview.modeName.textContent = meta.name;
  preview.modeDescription.textContent = meta.description;
  preview.brand.textContent = brand;
  preview.platform.textContent = platform;
  preview.style.textContent = style;
  preview.quantity.textContent = quantity;

  brief.productSummary.textContent = `${brand} targeting ${market}. Price range: ${priceRange}. Core promise: ${promise || "等待一句话卖点"}.`;
  brief.audience.textContent = audience || `面向 ${market} 的 ${platform} 用户，待补充具体人群画像、购买动机和使用场景。`;
  brief.painPoints.textContent = audience
    ? `从用户描述中提炼痛点，优先放大高频困扰、购买犹豫和现有替代方案的不满。`
    : "等待输入目标用户与痛点；建议写清楚用户是谁、现在怎么解决、为什么不满意。";
  brief.sellingAngles.textContent = `${sellingAngle} as the primary angle. Secondary proof should connect to ${promise || "product benefit"} and ${priceRange} pricing.`;
  brief.adStructure.textContent = `${meta.structure} (${duration}, ${language}).`;
  brief.hooks.textContent = hooks.join(" / ");
  brief.visual.textContent = `${style} for ${platform}. ${assetConstraints.length ? assetConstraints.join("; ") : "Can use uploaded product assets and generated supporting scenes."}`;
  brief.voiceover.textContent = `${language} voiceover, short spoken sentences, practical proof, no over-claiming.`;
  brief.cta.textContent = ctaFor(adGoal);
  brief.testing.textContent = `Generate ${quantity} variants by crossing hooks, ${sellingAngle} angle, CTA wording, and ${mode === "scale" ? "winner signals" : mode === "remix" ? "reference structures" : "template structures"}.${constraints ? ` Avoid: ${constraints}` : ""}${referenceLinks ? " Reference input will be used for structure only." : ""}`;
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

function renderStyleChoices(styles) {
  modeFields.styleChoices.innerHTML = styles
    .map((style, index) => {
      const checked = index === 0 ? " checked" : "";
      const activeClass = index === 0 ? " checked" : "";
      return `
        <label class="choice${activeClass}">
          <span class="choice-visual visual-${style.visual}" aria-hidden="true"></span>
          <span class="choice-copy">
            <strong>${escapeHtml(style.name)}</strong>
            <small>${escapeHtml(style.note)}</small>
          </span>
          <input type="radio" name="style" value="${escapeHtml(style.name)}"${checked} />
        </label>
      `;
    })
    .join("");
}

function applyMode(mode) {
  const meta = modeMeta[mode] || modeMeta.quick;
  preview.modeName.textContent = meta.name;
  preview.modeDescription.textContent = meta.description;
  modeFields.briefTitle.textContent = meta.briefTitle;
  modeFields.briefCopy.textContent = meta.briefCopy;
  modeFields.tags.innerHTML = meta.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
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
  modeFields.outputList.innerHTML = meta.outputs.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  renderStyleChoices(meta.styles);
  updatePreview();
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

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setModeTab(tab.dataset.mode);
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

draftButton.addEventListener("click", () => {
  const data = Object.fromEntries(new FormData(form).entries());
  data.mode = currentMode();
  data.assetConstraints = checkedValues("assetConstraints");
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
  payload.mode = currentMode();
  payload.assetConstraints = checkedValues("assetConstraints");
  console.table(payload);
  showToast("创意 Brief 已生成，数据已输出到浏览器控制台。");
});

window.addEventListener("DOMContentLoaded", async () => {
  window.lucide?.createIcons();
  const session = await window.vignetteAuth.requireSession();
  if (!session) return;
  const params = new URLSearchParams(window.location.search);
  const requestedMode = params.get("mode") || sessionStorage.getItem("vignetteAgentMode") || "quick";
  const initialMode = modeMeta[requestedMode] ? requestedMode : "quick";
  try {
    latestAgentBrief = JSON.parse(sessionStorage.getItem("vignetteAgentBrief") || "null");
  } catch {
    latestAgentBrief = null;
  }
  setModeTab(initialMode);
  updateStep();
  updatePreview();
  applyAgentBrief(latestAgentBrief);
});
