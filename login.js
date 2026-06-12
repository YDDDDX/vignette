const googleButton = document.querySelector("#loginGoogle");
const emailButton = document.querySelector("#loginEmailButton");
const passwordButton = document.querySelector("#loginPasswordButton");
const signupButton = document.querySelector("#signupPasswordButton");
const emailInput = document.querySelector("#loginEmail");
const passwordInput = document.querySelector("#loginPassword");
const loginStatus = document.querySelector("#loginStatus");
const continueWithoutLogin = document.querySelector("#continueWithoutLogin");

function loginReturnTo() {
  const returnTo = new URLSearchParams(window.location.search).get("returnTo");
  return returnTo && returnTo.startsWith("/") ? returnTo : "/intake.html";
}

function setLoginStatus(message) {
  loginStatus.textContent = message;
}

function friendlyAuthError(error, fallback) {
  const message = String(error?.message || "");
  if (/invalid login credentials/i.test(message)) return "邮箱或密码不正确。新用户请先点击注册账号。";
  if (/email not confirmed/i.test(message)) return "邮箱还未确认，请先打开确认邮件；也可以暂时继续体验。";
  if (/signup disabled/i.test(message)) return "当前 Supabase 项目未开启注册，请在 Auth 设置中启用。";
  if (/password/i.test(message) && /6/i.test(message)) return "密码至少需要 6 位。";
  if (/rate limit|too many/i.test(message)) return "请求过于频繁，请稍后再试。";
  return message || fallback;
}

function validateEmailAndPassword(requirePassword = true) {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (!email) {
    emailInput.focus();
    setLoginStatus("请先输入邮箱。");
    return null;
  }
  if (requirePassword && !password) {
    passwordInput.focus();
    setLoginStatus("请先输入密码。");
    return null;
  }
  return { email, password };
}

googleButton.addEventListener("click", async () => {
  googleButton.disabled = true;
  setLoginStatus("正在跳转到 Google 登录...");
  try {
    await window.vignetteAuth.signInWithGoogle(loginReturnTo());
  } catch (error) {
    setLoginStatus(error.message);
    googleButton.disabled = false;
  }
});

passwordButton.addEventListener("click", async () => {
  const values = validateEmailAndPassword();
  if (!values) return;

  passwordButton.disabled = true;
  setLoginStatus("正在登录...");
  try {
    await window.vignetteAuth.signInWithPassword(values.email, values.password, loginReturnTo());
    window.location.href = loginReturnTo();
  } catch (error) {
    setLoginStatus(friendlyAuthError(error, "登录失败，请检查邮箱和密码。"));
  } finally {
    passwordButton.disabled = false;
  }
});

signupButton.addEventListener("click", async () => {
  const values = validateEmailAndPassword();
  if (!values) return;

  signupButton.disabled = true;
  setLoginStatus("正在创建账号...");
  try {
    const result = await window.vignetteAuth.signUpWithPassword(values.email, values.password, loginReturnTo());
    if (result.session) {
      window.location.href = loginReturnTo();
      return;
    }
    setLoginStatus("账号已创建。请检查邮箱完成确认；也可以先继续体验。");
  } catch (error) {
    setLoginStatus(friendlyAuthError(error, "注册失败，请稍后再试。"));
  } finally {
    signupButton.disabled = false;
  }
});

emailButton.addEventListener("click", async () => {
  const values = validateEmailAndPassword(false);
  if (!values) return;

  emailButton.disabled = true;
  setLoginStatus("正在发送登录链接...");
  try {
    await window.vignetteAuth.signInWithEmail(values.email, loginReturnTo());
    setLoginStatus("登录链接已发送，请检查邮箱和垃圾邮件箱。");
  } catch (error) {
    setLoginStatus(friendlyAuthError(error, "发送失败，请稍后再试，或直接继续体验。"));
  } finally {
    emailButton.disabled = false;
  }
});

async function initLoginPage() {
  const returnTo = loginReturnTo();
  continueWithoutLogin.href = returnTo;
  const session = await window.vignetteAuth.getCurrentSession().catch(() => null);
  if (session) {
    setLoginStatus(`已登录：${session.user?.email || "当前账号"}`);
  }
  const settings = await window.vignetteAuth.getAuthSettings().catch(() => null);
  if (settings?.external?.google) {
    googleButton.hidden = false;
  } else {
    googleButton.hidden = true;
  }
  window.lucide?.createIcons();
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initLoginPage);
} else {
  initLoginPage();
}
