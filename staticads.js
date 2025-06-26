window.onload = function () {
  const bait = document.createElement('div');
  bait.className = 'adsbox';
  bait.style.height = '1px';
  bait.style.width = '1px';
  bait.style.position = 'absolute';
  bait.style.left = '-100px';
  document.body.appendChild(bait);

  window.setTimeout(() => {
    if (bait.offsetHeight === 0) {
      alert("🚫 Please disable AdBlock to continue.");
      window.location.href = "/rules";
    }
  }, );
};
