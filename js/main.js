const Navigation = {
  init() {
    this.mobileRight = document.getElementById("mobileRight");
    this.navLinks = document.getElementById("navLinks");
    this.links = this.navLinks?.querySelectorAll("a");

    this.attachEventListeners();
    this.debugLinks(); // Temporary debug
  },

  attachEventListeners() {
    // Toggle menu
    if (this.mobileRight) {
      this.mobileRight.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleMenu();
      });
    }

    // Close menu when clicking a link
    this.links?.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".mobile-nav")) {
        this.closeMenu();
      }
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu();
      }
    });

    // Close on resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        this.closeMenu();
      }
    });
  },

  toggleMenu() {
    this.hamburger?.classList.toggle("active");
    this.navLinks?.classList.toggle("active");

    // Prevent body scroll when menu open
    if (this.navLinks?.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },

  closeMenu() {
    this.hamburger?.classList.remove("active");
    this.navLinks?.classList.remove("active");
    document.body.style.overflow = "";
  },
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  Navigation.init();
});
