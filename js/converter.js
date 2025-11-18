document.addEventListener("DOMContentLoaded", function () {
  // ----- Grab elements using your exact HTML -----
  const root = document.querySelector(".left-content");
  if (!root) return;

  const categorySelect = root.querySelector(".select-div select");
  const groups = root.querySelectorAll(".hold-all .other-inputs");
  if (!categorySelect || groups.length < 2) return;

  const fromGroup = groups[0];
  const toGroup = groups[1];

  const fromInput = fromGroup.querySelector("input");
  const toInput = toGroup.querySelector("input");
  // === Input validation ===
  // Allow only numbers, decimal point, and nothing else
  function validateNumberInput(e) {
    const value = e.target.value;

    // Regex: only digits, one optional decimal point
    if (!/^\d*\.?\d*$/.test(value)) {
      e.target.value = value.slice(0, -1); // remove last character
      resultBox.textContent = "Only numbers are allowed.";
      resultBox.style.color = "red";
      return;
    }

    // Reset error message when valid
    resultBox.textContent = "";
    resultBox.style.color = "";
  }

  // Apply validation to both inputs
  fromInput.addEventListener("input", validateNumberInput);
  toInput.addEventListener("input", validateNumberInput);

  const fromUnitSelect = fromGroup.querySelector(".select-div2 select");
  const toUnitSelect = toGroup.querySelector(".select-div2 select");
  const convertBtn = root.querySelector("button");

  // Label fix + readonly result
  const secondLabel = toGroup.querySelector("h4");
  if (secondLabel) secondLabel.textContent = "To";
  if (toInput) toInput.readOnly = true;

  // Lightweight result text
  const resultBox = document.createElement("p");
  resultBox.style.marginTop = "10px";
  convertBtn.after(resultBox);

  // ----- Units per category -----
  const UNIT_LISTS = {
    length: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    weight: ["mg", "g", "kg", "oz", "lb", "t"],
    temperature: ["C", "F", "K"],
  };

  // Conversion factors (linear categories use base units: m, kg)
  const UNITS = {
    length: {
      base: "m",
      map: {
        mm: 1e-3,
        cm: 1e-2,
        m: 1,
        km: 1e3,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.344,
      },
    },
    weight: {
      base: "kg",
      map: {
        mg: 1e-6,
        g: 1e-3,
        kg: 1,
        oz: 0.028349523125,
        lb: 0.45359237,
        t: 1000,
      },
    },
    temperature: { special: true },
  };

  // ----- Helpers -----
  function setOptions(selectEl, values) {
    selectEl.innerHTML = values
      .map((v) => `<option value="${v}">${labelFor(v)}</option>`)
      .join("");
  }

  function labelFor(u) {
    const names = {
      mm: "Millimeters (mm)",
      cm: "Centimeters (cm)",
      m: "Meters (m)",
      km: "Kilometers (km)",
      in: "Inches (in)",
      ft: "Feet (ft)",
      yd: "Yards (yd)",
      mi: "Miles (mi)",
      mg: "Milligrams (mg)",
      g: "Grams (g)",
      kg: "Kilograms (kg)",
      oz: "Ounces (oz)",
      lb: "Pounds (lb)",
      t: "Tonnes (t)",
      C: "Celsius (C)",
      F: "Fahrenheit (F)",
      K: "Kelvin (K)",
    };
    return names[u] || u;
  }

  function format(n) {
    return Number(n).toLocaleString(undefined, { maximumFractionDigits: 4 });
  }

  function convertLinear(categoryKey, from, to, value) {
    const map = UNITS[categoryKey].map;
    return (value * map[from]) / map[to];
  }

  function convertTemperature(from, to, v) {
    let c;
    if (from === "C") c = v;
    else if (from === "F") c = ((v - 32) * 5) / 9;
    else if (from === "K") c = v - 273.15;
    else throw new Error("Unknown temperature unit");
    if (to === "C") return c;
    if (to === "F") return (c * 9) / 5 + 32;
    if (to === "K") return c + 273.15;
    throw new Error("Unknown temperature unit");
  }

  // Populate both unit dropdowns for the selected category
  function populateUnitSelects(categoryKey) {
    const list = UNIT_LISTS[categoryKey] || [];
    setOptions(fromUnitSelect, list);
    setOptions(toUnitSelect, list);

    // sensible defaults per category
    const defaults = {
      length: ["m", "ft"],
      weight: ["kg", "lb"],
      temperature: ["C", "F"],
    };
    const [df, dt] = defaults[categoryKey] || [list[0], list[1] || list[0]];
    fromUnitSelect.value = df;
    toUnitSelect.value = dt;

    // reset outputs
    toInput.value = "";
    resultBox.textContent = "Enter a value and click Convert.";
  }

  function doConvert() {
    const categoryKey = categorySelect.value; // length | weight | temperature
    const raw = (fromInput.value || "").trim();
    if (raw === "") {
      resultBox.textContent = "Please enter a number.";
      toInput.value = "";
      return;
    }

    const value = Number(raw);
    if (!Number.isFinite(value)) {
      resultBox.textContent = "Invalid number.";
      toInput.value = "";
      return;
    }

    const from = fromUnitSelect.value;
    const to = toUnitSelect.value;

    try {
      const out =
        UNITS[categoryKey] && UNITS[categoryKey].special
          ? convertTemperature(from, to, value)
          : convertLinear(categoryKey, from, to, value);

      toInput.value = format(out);
      resultBox.innerHTML = `<b>Result:</b> ${format(
        value
      )} ${from} = <b>${format(out)} ${to}</b>`;
    } catch (e) {
      resultBox.textContent = "Conversion error: " + e.message;
      toInput.value = "";
    }
  }

  // ----- Events -----
  categorySelect.addEventListener("change", () =>
    populateUnitSelects(categorySelect.value)
  );
  fromUnitSelect.addEventListener("change", doConvert);
  toUnitSelect.addEventListener("change", doConvert);
  convertBtn.addEventListener("click", doConvert);
  fromInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doConvert();
  });

  // ----- Init -----
  // normalize category text to our keys
  const normalize = {
    Length: "length",
    length: "length",
    Weight: "weight",
    weight: "weight",
    Temperature: "temperature",
    temperature: "temperature",
  };
  categorySelect.value = normalize[categorySelect.value] || "length";
  populateUnitSelects(categorySelect.value);
});
