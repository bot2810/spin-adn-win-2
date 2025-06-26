document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    alert("⛔ Auto-click or switching tabs is not allowed!");
    window.location.href = "/rules";
  }
});
