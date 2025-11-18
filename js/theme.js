// Theme engine
document.addEventListener("DOMContentLoaded", function () {
  const STORAGE_KEY = "theme-preference";
  const DARK = "dark";
  const LIGHT = "light";
  const buttons = document.querySelectorAll("#theme-toggle");

  if (buttons.length === 0) return;

  // Load theme
  const saved = localStorage.getItem(STORAGE_KEY);
  const theme =
    saved ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK : LIGHT);
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);

  // Update meta
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta)
    meta.setAttribute("content", theme === DARK ? "#1a1a2e" : "#ffffff");

  // Toggle function
  function toggle() {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === DARK ? LIGHT : DARK;

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);

    if (meta)
      meta.setAttribute("content", newTheme === DARK ? "#1a1a2e" : "#ffffff");

    buttons.forEach((btn) => {
      btn.style.transform = "scale(0.9)";
      setTimeout(() => (btn.style.transform = "scale(1)"), 150);
    });
  }

  // Attach listeners
  buttons.forEach((btn) => {
    btn.addEventListener("click", toggle);
    btn.addEventListener("touchend", (e) => {
      e.preventDefault();
      toggle();
    });
  });

  // System preference change
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        document.documentElement.setAttribute(
          "data-theme",
          e.matches ? DARK : LIGHT
        );
      }
    });
});
