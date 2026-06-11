const SUPABASE_URL = "https://kipwfjiclbxgreabmdvv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_YFLTDsC7SN4e2CZ0oE4hQA_9p31tS9E";

const supabaseSdk = window.supabase || (typeof supabase !== "undefined" ? supabase : null);
if (!supabaseSdk) {
  throw new Error("Supabase SDK failed to load");
}
const supabaseClient = supabaseSdk.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true,
  },
});

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
  setReturnTo(returnTo);
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth-callback.html`,
    },
  });
  if (error) throw error;
}

async function signInWithEmail(email, returnTo = "/details.html") {
  setReturnTo(returnTo);
  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth-callback.html`,
    },
  });
  if (error) throw error;
}

async function completeAuthRedirect() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (code) {
    await supabaseClient.auth.exchangeCodeForSession(code);
  }
  await getCurrentSession();
  const returnTo = getReturnTo();
  localStorage.removeItem("vignetteReturnTo");
  window.location.replace(returnTo);
}

async function signOut() {
  await supabaseClient.auth.signOut();
  window.location.href = "./login.html";
}

window.vignetteAuth = {
  client: supabaseClient,
  completeAuthRedirect,
  getCurrentSession,
  requireSession,
  signInWithEmail,
  signInWithGoogle,
  signOut,
};
