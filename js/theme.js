/**
 * Theme Manager - Works with multiple toggle buttons
 */
const ThemeManager = {
  STORAGE_KEY: "theme-preference",
  DARK_THEME: "dark",
  LIGHT_THEME: "light",

  init() {
    // Get all theme toggle buttons (desktop + mobile)
    this.toggleButtons = document.querySelectorAll("#theme-toggle");

    if (this.toggleButtons.length === 0) {
      return;
    }

    this.loadTheme();
    this.attachEventListeners();
  },

  loadTheme() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      this.setTheme(prefersDark ? this.DARK_THEME : this.LIGHT_THEME);
    }
  },

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.updateMetaTheme(theme);
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme =
      currentTheme === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;

    this.setTheme(newTheme);
    this.animateToggle();
  },

  updateMetaTheme(theme) {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      const color = theme === this.DARK_THEME ? "#1a1a2e" : "#ffffff";
      metaTheme.setAttribute("content", color);
    }
  },

  animateToggle() {
    // Animate all toggle buttons
    this.toggleButtons.forEach((button) => {
      button.style.transform = "scale(0.9)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 150);
    });
  },

  attachEventListeners() {
    // Attach listeners to all toggle buttons
    this.toggleButtons.forEach((button) => {
      // Click event
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleTheme();
      });

      // Touch event for mobile
      button.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleTheme();
      });

      // Keyboard accessibility
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    });

    // System preference change
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.setTheme(e.matches ? this.DARK_THEME : this.LIGHT_THEME);
        }
      });

    // Keyboard shortcut (Ctrl/Cmd + Shift + D)
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "D") {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  },

  getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme");
  },
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
});
