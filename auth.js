const SUPABASE_URL = "https://kipwfjiclbxgreabmdvv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_YFLTDsC7SN4e2CZ0oE4hQA_9p31tS9E";

const supabaseSdk = window.supabase || (typeof supabase !== "undefined" ? supabase : null);
const supabaseClient = supabaseSdk
  ? supabaseSdk.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    })
  : null;

function ensureSupabaseClient() {
  if (!supabaseClient) {
    throw new Error("登录 SDK 加载失败，请刷新页面；也可以先继续体验。");
  }
  return supabaseClient;
}

function authReturnPath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function setReturnTo(path = authReturnPath()) {
  localStorage.setItem("vignetteReturnTo", path);
}

function getReturnTo() {
  return localStorage.getItem("vignetteReturnTo") || "/details.html";
}

async function getCurrentSession() {
  if (!supabaseClient) return null;
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) throw error;
  return data.session;
}

async function requireSession() {
  const session = await getCurrentSession();
  if (session) return session;
  setReturnTo();
  window.location.href = "./login.html";
  return null;
}

async function signInWithGoogle(returnTo = "/details.html") {
  const client = ensureSupabaseClient();
  setReturnTo(returnTo);
  const settings = await getAuthSettings().catch(() => null);
  if (!settings?.external?.google) {
    throw new Error("Google 登录暂未开放，请先使用邮箱登录或直接继续体验。");
  }
  const { error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth-callback.html`,
    },
  });
  if (error) throw error;
}

async function signInWithPassword(email, password, returnTo = "/details.html") {
  const client = ensureSupabaseClient();
  setReturnTo(returnTo);
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

async function signUpWithPassword(email, password, returnTo = "/details.html") {
  const client = ensureSupabaseClient();
  setReturnTo(returnTo);
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth-callback.html`,
    },
  });
  if (error) throw error;
  return data;
}

async function signInWithEmail(email, returnTo = "/details.html") {
  const client = ensureSupabaseClient();
  setReturnTo(returnTo);
  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth-callback.html`,
    },
  });
  if (error) throw error;
}

async function getAuthSettings() {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/settings`, {
    headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
  });
  if (!response.ok) throw new Error("无法读取登录方式配置。");
  return response.json();
}

async function getCurrentUserDisplay() {
  const session = await getCurrentSession();
  if (!session) return null;
  return session.user?.email || session.user?.user_metadata?.name || "已登录用户";
}

async function completeAuthRedirect() {
  const client = ensureSupabaseClient();
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (code) {
    await client.auth.exchangeCodeForSession(code);
  }
  await getCurrentSession();
  const returnTo = getReturnTo();
  localStorage.removeItem("vignetteReturnTo");
  window.location.replace(returnTo);
}

async function signOut(redirectPath = authReturnPath()) {
  const client = ensureSupabaseClient();
  await client.auth.signOut();
  window.location.href = redirectPath || "./intake.html";
}

window.vignetteAuth = {
  client: supabaseClient,
  completeAuthRedirect,
  getAuthSettings,
  getCurrentSession,
  getCurrentUserDisplay,
  requireSession,
  signInWithEmail,
  signInWithGoogle,
  signInWithPassword,
  signUpWithPassword,
  signOut,
};
