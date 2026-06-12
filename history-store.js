(function () {
  const LOCAL_KEY = "vignetteBriefHistory";
  const TABLE_NAME = "briefs";

  function createId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `brief-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function readLocal() {
    try {
      const parsed = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeLocal(entries) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(entries.slice(0, 100)));
  }

  function upsertLocal(entry) {
    const entries = readLocal().filter((item) => item.id !== entry.id);
    entries.unshift(entry);
    writeLocal(entries);
    return entry;
  }

  function normalizeEntry(input) {
    const createdAt = input.createdAt || new Date().toISOString();
    return {
      id: input.id || createId(),
      createdAt,
      updatedAt: new Date().toISOString(),
      storage: input.storage || "local",
      title: input.title || input.brand || "Untitled Brief",
      mode: input.mode || "quick",
      modeName: input.modeName || "Quick Create｜快速生成",
      brand: input.brand || "未填写品牌",
      platform: input.platform || "TikTok",
      style: input.style || "UGC 口播",
      quantity: input.quantity || "10",
      summary: input.summary || "",
      formData: input.formData || {},
      brief: input.brief || {},
      assetConstraints: input.assetConstraints || [],
      userEmail: input.userEmail || "",
    };
  }

  function rowToEntry(row) {
    const formData = row.form_json || {};
    const brief = row.brief_json || {};
    return normalizeEntry({
      id: row.id,
      createdAt: row.created_at,
      updatedAt: row.updated_at || row.created_at,
      storage: "cloud",
      title: row.title,
      mode: row.mode,
      modeName: row.mode_name,
      brand: row.brand,
      platform: row.platform,
      style: row.style,
      quantity: row.quantity,
      summary: row.summary,
      formData,
      brief,
      assetConstraints: formData.assetConstraints || [],
    });
  }

  async function currentSession() {
    return window.vignetteAuth?.getCurrentSession?.().catch(() => null);
  }

  async function insertCloud(entry) {
    const session = await currentSession();
    const client = window.vignetteAuth?.client;
    if (!session?.user?.id || !client) return null;

    const row = {
      id: entry.id,
      user_id: session.user.id,
      title: entry.title,
      mode: entry.mode,
      mode_name: entry.modeName,
      brand: entry.brand,
      platform: entry.platform,
      style: entry.style,
      quantity: Number.parseInt(entry.quantity, 10) || null,
      summary: entry.summary,
      form_json: {
        ...entry.formData,
        assetConstraints: entry.assetConstraints,
      },
      brief_json: entry.brief,
    };

    const { data, error } = await client.from(TABLE_NAME).upsert(row).select().single();
    if (error) throw error;
    return rowToEntry(data);
  }

  async function listCloud() {
    const session = await currentSession();
    const client = window.vignetteAuth?.client;
    if (!session?.user?.id || !client) return [];

    const { data, error } = await client.from(TABLE_NAME).select("*").order("created_at", { ascending: false }).limit(100);
    if (error) throw error;
    return (data || []).map(rowToEntry);
  }

  async function deleteCloud(id) {
    const session = await currentSession();
    const client = window.vignetteAuth?.client;
    if (!session?.user?.id || !client) return;
    await client.from(TABLE_NAME).delete().eq("id", id);
  }

  async function saveBrief(input) {
    const localEntry = upsertLocal(normalizeEntry(input));
    try {
      const cloudEntry = await insertCloud(localEntry);
      if (cloudEntry) {
        upsertLocal(cloudEntry);
        return { entry: cloudEntry, storage: "cloud", cloudSaved: true };
      }
    } catch (error) {
      console.warn("Cloud history save skipped:", error.message);
    }
    return { entry: localEntry, storage: "local", cloudSaved: false };
  }

  async function listBriefs() {
    const localEntries = readLocal().map(normalizeEntry);
    try {
      const cloudEntries = await listCloud();
      const merged = new Map(localEntries.map((entry) => [entry.id, entry]));
      cloudEntries.forEach((entry) => merged.set(entry.id, entry));
      return Array.from(merged.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.warn("Cloud history load skipped:", error.message);
      return localEntries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }

  async function getBrief(id) {
    const entries = await listBriefs();
    return entries.find((entry) => entry.id === id) || null;
  }

  async function deleteBrief(id) {
    const entries = readLocal().filter((entry) => entry.id !== id);
    writeLocal(entries);
    try {
      await deleteCloud(id);
    } catch (error) {
      console.warn("Cloud history delete skipped:", error.message);
    }
  }

  window.vignetteHistory = {
    deleteBrief,
    getBrief,
    listBriefs,
    saveBrief,
  };
})();
