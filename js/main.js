/**
 * Theme Manager
 * Handles light/dark mode toggle and persistence
 */

const ThemeManager = {
  // Configuration
  STORAGE_KEY: "theme-preference",
  DARK_THEME: "dark",
  LIGHT_THEME: "light",

  /**
   * Initialize theme manager
   */
  init() {
    this.toggleButton = document.getElementById("theme-toggle");
    this.loadTheme();
    this.attachEventListeners();
  },

  /**
   * Load saved theme or detect system preference
   */
  loadTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      this.setTheme(prefersDark ? this.DARK_THEME : this.LIGHT_THEME);
    }
  },

  /**
   * Set theme
   * @param {string} theme - 'light' or 'dark'
   */
  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.updateMetaTheme(theme);
  },

  /**
   * Toggle between light and dark theme
   */
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme =
      currentTheme === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;

    this.setTheme(newTheme);
    this.animateToggle();
  },

  /**
   * Update meta theme color for mobile browsers
   */
  updateMetaTheme(theme) {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      const color = theme === this.DARK_THEME ? "#1a1a2e" : "#ffffff";
      metaTheme.setAttribute("content", color);
    }
  },

  /**
   * Add animation effect to toggle
   */
  animateToggle() {
    this.toggleButton.style.transform = "scale(0.9)";
    setTimeout(() => {
      this.toggleButton.style.transform = "scale(1)";
    }, 150);
  },

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Toggle button click
    if (this.toggleButton) {
      this.toggleButton.addEventListener("click", () => {
        this.toggleTheme();
      });
    }

    // Listen for system theme changes
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

  /**
   * Get current theme
   * @returns {string} Current theme ('light' or 'dark')
   */
  getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme");
  },
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
});

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = ThemeManager;
}
