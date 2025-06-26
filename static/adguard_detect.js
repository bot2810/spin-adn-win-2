if (window.navigator.userAgent.includes("AdGuard") || window.navigator.userAgent.includes("DNS")) {
  alert("⚠️ AdBlocker or DNS Filter detected. Please disable to play.");
  window.location.href = "/rules";
}
