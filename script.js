onload = () => {
  // Background music
  const music = new Audio("flower.mp3");
  music.loop = true;
  music.volume = 0.7;
  music.preload = "auto";

  const startAnimation = () => document.body.classList.remove("container");

  // Try real autoplay first (works only if the browser allows it)
  music.play().then(startAnimation).catch(() => {
    // Blocked: show a start screen. One tap starts music + animation together.
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;" +
      "align-items:center;justify-content:center;gap:16px;background:#0b0b1e;" +
      "color:#fff;font-family:sans-serif;cursor:pointer;text-align:center;" +
      "-webkit-tap-highlight-color:transparent;";
    overlay.innerHTML =
      '<div style="font-size:64px">🌸</div>' +
      '<div id="tap-text" style="font-size:22px">Tap anywhere to start</div>';
    document.body.appendChild(overlay);

    // "click" is the only event iOS/Android both accept for starting audio
    overlay.addEventListener("click", () => {
      music.play().then(() => {
        startAnimation();
        overlay.remove();
      }).catch((err) => {
        console.warn("Play blocked:", err);
        document.getElementById("tap-text").textContent =
          "Couldn't play music. Tap again";
      });
    });
  });

  music.addEventListener("error", () => {
    console.error("Cannot load flower.mp3");
  });
};
