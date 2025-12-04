document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const unitSelect = document.getElementById("unitSelect");
  const unitText = document.getElementById("unitText");
  const weightInput = document.getElementById("weightInput");
  const heightInput = document.getElementById("heightInput");
  const calculateBtn = document.getElementById("calculateBtn");
  const bmiValue = document.getElementById("bmiValue");
  const bmiCategory = document.getElementById("bmiCategory");
  const bmiMessage = document.getElementById("bmiMessage");

  // Unit System Change Handler
  unitSelect.addEventListener("change", (e) => {
    const isMetric = e.target.value === "metric";
    unitText.textContent = isMetric ? "Metric" : "Imperial";

    // Update input labels and placeholders
    const weightLabel = document.querySelector('label[for="weightInput"]');
    const heightLabel = document.querySelector('label[for="heightInput"]');

    if (isMetric) {
      weightLabel.textContent = "Weight (kg)";
      heightLabel.textContent = "Height (cm)";
      weightInput.placeholder = "Enter value";
      heightInput.placeholder = "Enter value";
    } else {
      weightLabel.textContent = "Weight (lbs)";
      heightLabel.textContent = "Height (in)";
      weightInput.placeholder = "Enter value";
      heightInput.placeholder = "Enter value";
    }

    // Clear inputs and results
    weightInput.value = "";
    heightInput.value = "";
    resetResults();
  });


// Validates the Input
  function validateNumberInput(e) {
    const value = e.target.value;

    if (!/^\d*\.?\d*$/.test(value)) {
      e.target.value = value.slice(0, -1); // remove last character
      alert("Please enter valid weight and height values.");
      return;
    }
  }

  weightInput.addEventListener('input', validateNumberInput);
  heightInput.addEventListener('input', validateNumberInput);

  // Calculate BMI
  calculateBtn.addEventListener("click", calculateBMI);

  // Allow Enter key to calculate
  weightInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") calculateBMI();
  });

  heightInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") calculateBMI();
  });

  function calculateBMI() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    const isMetric = unitSelect.value === "metric";

    let bmi;

    if (isMetric) {
      // Metric: weight in kg, height in cm
      bmi = weight / (height / 100) ** 2;
    } else {
      // Imperial: weight in lbs, height in inches
      bmi = (weight / height ** 2) * 703;
    }

    // Round to one decimal place
    bmi = Math.round(bmi * 10) / 10;

    // Update UI with result
    bmiValue.textContent = bmi;

    // Determine category and set appropriate styling
    let category, message, color;

    if (bmi < 18.5) {
      category = "Underweight";
      message =
        "You are in the underweight range. Consider consulting with a healthcare professional.";
      color = "#0D6AAD";
    } else if (bmi < 25) {
      category = "Normal";
      message = "You are in the normal weight range. Keep up the good work!";
      color = "#22C55E";
    } else if (bmi < 30) {
      category = "Overweight";
      message =
        "You are in the overweight range. Consider adopting a healthier lifestyle.";
      color = "#F7DF1E";
    } else {
      category = "Obese";
      message =
        "You are in the obese range. Consider consulting with a healthcare professional.";
      color = "#E44D26";
    }

    bmiCategory.textContent = category;
    bmiCategory.style.color = color;
    bmiMessage.textContent = message;
  }

  function resetResults() {
    bmiValue.textContent = "--";
    bmiCategory.textContent = "--";
    bmiCategory.style.color = "";
    bmiMessage.textContent =
      "Enter your weight and height to calculate your BMI.";
  }
});
