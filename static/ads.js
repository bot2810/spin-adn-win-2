window.addEventListener('DOMContentLoaded', function () {
  // Ad-block detection
  const bait = document.createElement('div');
  bait.className = 'adsbox';
  bait.style.height = '1px';
  bait.style.width = '1px';
  bait.style.position = 'absolute';
  bait.style.left = '-999px';
  document.body.appendChild(bait);

  setTimeout(() => {
    if (bait.offsetHeight === 0 || bait.offsetWidth === 0) {
      alert("🚫 Please disable AdBlock to continue.");
      window.location.href = "/rules";
    }
  }, 500);

  // Inject banner ads
  const topBanner = document.querySelector(".banner-ad.top");
  const bottomBanner = document.querySelector(".banner-ad.bottom");

  if (topBanner) {
    topBanner.innerHTML = `
      <a href="https://example.com/ad1" target="_blank">
        <img src="/static/ad-top.jpg" alt="Top Ad" style="width: 300px; max-width: 90%;" />
      </a>
    `;
  }

  if (bottomBanner) {
    bottomBanner.innerHTML = `
      <a href="https://example.com/ad2" target="_blank">
        <img src="/static/ad-bottom.jpg" alt="Bottom Ad" style="width: 300px; max-width: 90%;" />
      </a>
    `;
  }
});
