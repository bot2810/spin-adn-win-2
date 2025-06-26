// ✅ This script handles ad display and 5-second countdown before enabling spin

document.addEventListener("DOMContentLoaded", () => {
  const adTimer = document.getElementById("ad-timer");
  const spinButton = document.getElementById("spin-btn");
  const adNotice = document.getElementById("ad-notice");

  let seconds = 5;

  // Disable spin button initially
  if (spinButton) {
    spinButton.disabled = true;
    spinButton.style.opacity = 0.5;
  }

  // Start countdown
  const countdown = setInterval(() => {
    if (seconds > 0) {
      if (adTimer) {
        adTimer.innerText = 📺 Watching ad... Please wait ${seconds} sec;
      }
      seconds--;
    } else {
      clearInterval(countdown);
      
      if (adTimer) {
        adTimer.innerText = "✅ Ad watched. You can spin now!";
        adTimer.style.color = "green";
      }

      // Enable spin button
      if (spinButton) {
        spinButton.disabled = false;
        spinButton.style.opacity = 1;
      }

      // Optionally hide adNotice
      if (adNotice) {
        adNotice.style.display = "none";
      }
    }
  }, 1000);
});
