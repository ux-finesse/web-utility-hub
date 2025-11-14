    document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("generatedPassword");
    const copyBtn = document.getElementById("copyBtn");
    const refreshBtn = document.getElementById("refreshBtn");
    const generateBtn = document.getElementById("generateBtn");
    const lengthSlider = document.getElementById("lengthSlider");
    const lengthValue = document.getElementById("lengthValue");
    const strengthFill = document.getElementById("strengthFill");
    const strengthText = document.getElementById("strengthText");

    const includeSymbols = document.getElementById("includeSymbols");
    const includeUppercase = document.getElementById("includeUppercase");
    const includeLowercase = document.getElementById("includeLowercase");
    const includeNumbers = document.getElementById("includeNumbers");

    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    // Update length display
    lengthSlider.addEventListener("input", () => {
        lengthValue.textContent = lengthSlider.value + " characters";
        updateStrength();
    });

    // Checkbox change → update strength
    [includeSymbols, includeUppercase, includeLowercase, includeNumbers].forEach(cb => {
        cb.addEventListener("change", updateStrength);
    });

    // Generate password
    function generatePassword() {
        let charset = "";
        const length = lengthSlider.value;

        if (includeLowercase.checked) charset += lowercase;
        if (includeUppercase.checked) charset += uppercase;
        if (includeNumbers.checked) charset += numbers;
        if (includeSymbols.checked) charset += symbols;

        if (charset === "") {
        alert("Please select at least one character type!");
        return;
        }

        let password = "";
        for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        passwordInput.value = password;
        updateStrength();
    }

    // Update strength meter
    function updateStrength() {
        const length = parseInt(lengthSlider.value);
        let types = 0;

        if (includeLowercase.checked) types++;
        if (includeUppercase.checked) types++;
        if (includeNumbers.checked) types++;
        if (includeSymbols.checked) types++;

        const score = (length / 32) * 50 + (types / 4) * 50;

        let strength = "Weak";
        let color = "#ef4444";
        let width = "20%";

        if (score > 75) {
        strength = "Very Strong";
        color = "#22c55e";
        width = "100%";
        } else if (score > 60) {
        strength = "Strong";
        color = "#3b82f6";
        width = "75%";
        } else if (score > 40) {
        strength = "Medium";
        color = "#f59e0b";
        width = "50%";
        } else if (score > 20) {
        strength = "Weak";
        color = "#ef4444";
        width = "30%";
        }

        strengthFill.style.width = width;
        strengthFill.style.backgroundColor = color;
        strengthText.textContent = strength;
        strengthText.style.color = color;
    }

    // Copy to clipboard
    copyBtn.addEventListener("click", () => {
        if (!passwordInput.value) return;

        passwordInput.select();
        document.execCommand("copy");

        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        }, 2000);
    });

    // Refresh = regenerate
    refreshBtn.addEventListener("click", generatePassword);

    // Generate on button click
    generateBtn.addEventListener("click", generatePassword);

    // Initial generation
    generatePassword();
    });
