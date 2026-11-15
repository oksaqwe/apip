onload = () => {
  document.body.classList.remove("container");

  // Background music
  const music = new Audio("flower.mp3");
  music.loop = true;
  music.volume = 0.7;

  const events = ["click", "touchstart", "keydown"];

  const startOnInteraction = () => {
    music.play().then(() => {
      events.forEach((e) => removeEventListener(e, startOnInteraction));
    }).catch(() => {});
  };

  // Try to autoplay; browsers often block it until the user interacts
  music.play().catch(() => {
    events.forEach((e) => addEventListener(e, startOnInteraction));
  });
};
