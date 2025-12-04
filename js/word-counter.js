// Counters function
document.addEventListener("DOMContentLoaded", function () {
  //Getting the elements
  const textarea = document.getElementById("text-input");
  const copyBtn = document.querySelector(".copy-btn").closest(".btn");
  const clearBtn = document.querySelector(".trash-btn").closest(".btn");

  // Getting the displays
  const wordDisplay = document.querySelector(".words h2");
  const charDisplay = document.querySelector(".char h2");
  const paraDisplay = document.querySelector(".para h2");

  // Updating the status
  function updateStats() {
    const text = textarea.value;

    const trimmed = text.trim();

    //Words count
    const words =
      trimmed === ""
        ? 0
        : trimmed.split(/\s+/).filter((word) => word.length > 0).length;
    wordDisplay.textContent = words;

    // Characters count
    const chars = text.replace(/\s/g, "").length; //Ensures space between characters are not counted as a character.
    charDisplay.textContent = chars;

    // Paragraphs count
    const paragraphs =
      text.trim() === ""
        ? 0
        : text.split(/\n+/).filter((paragraph) => paragraph.trim().length > 0)
            .length;
    paraDisplay.textContent = paragraphs;
  }

  // Updating the DOM in realtime
  textarea.addEventListener("input", updateStats);

  // Copy button
  copyBtn.addEventListener("click", function () {
    const text = textarea.value;

    if (text.trim() === "") {
      alert("Nothing to copy!");
      return;
    }

    // Copying to clipboard
    navigator.clipboard.writeText(text).then(() => {
      const btnIcn = copyBtn.querySelector(".btn-icn");
      const originalIcn = btnIcn.innerHTML;
      btnIcn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      setTimeout(() => (btnIcn.innerHTML = originalIcn), 2000);
    });
  });

  // Clear button
  clearBtn.addEventListener("click", function () {
    textarea.value = "";
    updateStats();
    textarea.focus();
  });

  updateStats();
});
