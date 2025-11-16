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
        : trimmed.split(/\s+/).filter((w) => w.length > 0).length;
    wordDisplay.textContent = words;

    // Characters count
    charDisplay.textContent = text.length;

    // Paragraphs count
    const paragraphs =
      text.trim() === ""
        ? 0
        : text.split(/\n+/).filter((p) => p.trim().length > 0).length;
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
      const btnText = copyBtn.querySelector("p");
      const originalText = btnText.textContent;
      btnText.textContent = "Copied!";
      setTimeout(() => (btnText.textContent = originalText), 2000);
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
