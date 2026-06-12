const googleButton = document.querySelector("#loginGoogle");
const emailButton = document.querySelector("#loginEmailButton");
const emailInput = document.querySelector("#loginEmail");
const loginStatus = document.querySelector("#loginStatus");
const skipLoginLink = document.querySelector(".skip-login-link");

function loginReturnTo() {
  const returnTo = new URLSearchParams(window.location.search).get("returnTo");
  return returnTo && returnTo.startsWith("/") ? returnTo : "/intake.html";
}

function setLoginStatus(message) {
  loginStatus.textContent = message;
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

emailButton.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  if (!email) {
    emailInput.focus();
    setLoginStatus("请先输入邮箱。");
    return;
  }

  emailButton.disabled = true;
  setLoginStatus("正在发送登录链接...");
  try {
    await window.vignetteAuth.signInWithEmail(email, loginReturnTo());
    setLoginStatus("登录链接已发送，请检查邮箱。");
  } catch (error) {
    setLoginStatus(error.message);
  } finally {
    emailButton.disabled = false;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const returnTo = loginReturnTo();
  skipLoginLink.href = returnTo;
  window.lucide?.createIcons();
});
