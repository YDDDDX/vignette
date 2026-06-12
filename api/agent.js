const DASH_SCOPE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
const MODEL = process.env.DASHSCOPE_MODEL || "qwen3.6-plus";

function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

async function verifySupabaseUser(request) {
  const authHeader = request.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseSecretKey) {
    return null;
  }

  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseSecretKey,
      authorization: `Bearer ${token}`,
    },
  });
  if (!userResponse.ok) return null;
  return userResponse.json();
}

module.exports = async function handler(request, response) {
  response.setHeader("content-type", "application/json; charset=utf-8");

  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  await verifySupabaseUser(request).catch(() => null);

  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: "Missing DASHSCOPE_API_KEY environment variable" });
  }

  const payload = request.body || {};
  const description = String(payload.description || "").trim();
  if (!description) {
    return response.status(400).json({ error: "Description is required" });
  }

  const system = `
你是 Vignette 的广告创意 intake agent。
你的任务是根据用户描述，在以下模式中选择最合适的一种：
quick: 用户只有产品信息，想快速生成第一批广告。
remix: 用户有竞品/参考广告/历史 winner，想拆解结构并生成原创变体。
scale: 用户有历史广告和 performance data，想学习有效模式并生成下一批测试素材。

只返回 JSON，不要 Markdown，不要解释。
JSON schema:
{
  "recommendedMode": "quick" | "remix" | "scale",
  "confidence": 0-100,
  "reason": "一句话说明为什么",
  "summary": {
    "product": "产品/品牌信息总结",
    "goal": "广告目标总结",
    "availableAssets": "已有素材/数据总结",
    "audience": "目标用户总结"
  },
  "creativeBrief": {
    "productSummary": "Product Summary",
    "targetAudience": "Target Audience",
    "painPoints": "Pain Points",
    "coreSellingAngles": "Core Selling Angles",
    "scriptStructure": "Script Structure",
    "hookVariants": "3-5 个 Hook Variants，用 / 分隔",
    "shotList": "Shot List",
    "captionStyle": "Caption Style",
    "ctaDirection": "CTA Direction",
    "riskComplianceNotes": "Risk / Compliance Notes",
    "abTestingPlan": "A/B Testing Plan"
  },
  "missingInfo": ["还需要补充的信息"],
  "suggestedNextStep": "下一步建议"
};
`;

  const upstream = await fetch(DASH_SCOPE_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: description },
      ],
      temperature: 0.2,
    }),
  });

  const data = await upstream.json().catch(() => null);
  if (!upstream.ok) {
    return response.status(upstream.status).json({
      error: "Agent request failed",
      detail: data?.error?.message || data,
    });
  }

  const text = data?.choices?.[0]?.message?.content || "";
  const parsed = extractJson(text);
  if (!parsed) {
    return response.status(502).json({
      error: "Agent returned non-JSON response",
      raw: text,
    });
  }

  return response.status(200).json(parsed);
}
