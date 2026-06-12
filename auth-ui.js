function currentReturnPath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function loginHref() {
  return `./login.html?returnTo=${encodeURIComponent(currentReturnPath())}`;
}

function escapeAuthText(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderLoggedOutLink(link) {
  const label = link.dataset.authLabel || "登录保存记录";
  link.href = loginHref();
  link.classList.remove("signed-in");
  link.innerHTML = `<i data-lucide="user-round"></i>${escapeAuthText(label)}`;
}

function renderLoggedInLink(link, displayName) {
  link.removeAttribute("href");
  link.classList.add("signed-in");
  link.innerHTML = `<i data-lucide="circle-user-round"></i><span>${escapeAuthText(displayName)}</span>`;
}

function ensureSignOutButton(anchor, signedIn) {
  const parent = anchor.parentElement;
  if (!parent) return;
  let button = parent.querySelector(":scope > .account-signout");
  if (!signedIn) {
    button?.remove();
    return;
  }
  if (!button) {
    button = document.createElement("button");
    button.className = "account-signout";
    button.type = "button";
    button.innerHTML = `<i data-lucide="log-out"></i>退出`;
    button.addEventListener("click", () => {
      window.vignetteAuth?.signOut(currentReturnPath());
    });
    parent.appendChild(button);
  }
}

async function renderAuthUi() {
  const links = Array.from(document.querySelectorAll("[data-auth-link]"));
  links.forEach((link) => {
    renderLoggedOutLink(link);
    ensureSignOutButton(link, false);
  });

  if (!window.vignetteAuth) {
    window.lucide?.createIcons();
    return;
  }

  const displayName = await window.vignetteAuth.getCurrentUserDisplay().catch(() => null);
  links.forEach((link) => {
    if (displayName) {
      renderLoggedInLink(link, displayName);
      ensureSignOutButton(link, link.classList.contains("account-link"));
    } else {
      renderLoggedOutLink(link);
      ensureSignOutButton(link, false);
    }
  });
  window.lucide?.createIcons();
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", renderAuthUi);
} else {
  renderAuthUi();
}
