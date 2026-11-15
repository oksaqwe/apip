onload = () => {
  // Background music
  const music = new Audio("flower.mp3");
  music.loop = true;
  music.volume = 0.7;

  // Try real autoplay first (works only if the browser allows it)
  music.play().then(() => {
    document.body.classList.remove("container");
  }).catch(() => {
    // Blocked: show a start screen. One tap starts music + animation together.
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;" +
      "align-items:center;justify-content:center;gap:16px;background:#0b0b1e;" +
      "color:#fff;font-family:sans-serif;cursor:pointer;text-align:center;";
    overlay.innerHTML =
      '<div style="font-size:64px">🌸</div>' +
      '<div style="font-size:22px">Tap anywhere to start</div>';
    document.body.appendChild(overlay);

    const start = () => {
      music.play().catch((err) => console.warn("Play blocked:", err));
      document.body.classList.remove("container");
      overlay.remove();
    };
    overlay.addEventListener("click", start, { once: true });
    overlay.addEventListener("touchstart", start, { once: true });
  });

  music.addEventListener("error", () => {
    console.error("Cannot load flower.mp3");
  });
};
