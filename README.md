# Web Utility Hub 🛠️

A comprehensive multi-tool web application combining essential utilities in one responsive platform. Built with vanilla JavaScript, this project showcases modular code architecture and seamless user experience.

## 🎯 About The Project

Web Utility Hub is an all-in-one utility platform that provides four essential tools for everyday use. The project demonstrates modern web development practices including modular JavaScript, responsive design, and clean code architecture.

### ✨ Key Features

- **🏋️ BMI Calculator** - Calculate Body Mass Index with health category display
- **📝 Word Counter** - Real-time word and character counting tool
- **🔄 Unit Converter** - Convert between multiple unit types (length, weight, temperature)
- **🔐 Password Generator** - Create secure random passwords with customizable options

### 🚀 Built With

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
* ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
* ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)

---

## 📸 Screenshots

### Desktop View
![Desktop View](screenshots/desktop-view.png)

### Mobile Responsive
<p align="center">
  <img src="screenshots/mobile-bmi.png" width="200" alt="BMI Calculator Mobile"/>
  <img src="screenshots/mobile-converter.png" width="200" alt="Unit Converter Mobile"/>
  <img src="screenshots/mobile-password.png" width="200" alt="Password Generator Mobile"/>
</p>

---

## 🎯 Features In Detail

### BMI Calculator
- Input height (cm) and weight (kg)
- Automatic BMI calculation
- Health category display (Underweight, Normal, Overweight, Obese)
- Color-coded results
- Form validation with regex
- Clear and reset functionality

### Word Counter
- Real-time word counting
- Character count (with and without spaces)
- Sentence counter
- Paragraph counter
- Copy to clipboard functionality
- Character limit warnings

### Unit Converter
- **Length**: Meters, Kilometers, Feet, Miles, Inches
- **Weight**: Kilograms, Grams, Pounds, Ounces
- **Temperature**: Celsius, Fahrenheit, Kelvin
- Bidirectional conversion
- Precise calculations
- Input validation

### Password Generator
- Customizable password length (8-32 characters)
- Include/exclude options:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special characters (!@#$%^&*)
- Password strength indicator
- Copy to clipboard with one click
- Visual feedback on generation

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git installed on your machine
- Text editor (VS Code recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/peterolugbenga/web-utility-hub.git
   ```

2. **Navigate to project directory**
   ```bash
   cd web-utility-hub
   ```

3. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   
   # Or use Live Server in VS Code
   # Right-click index.html → Open with Live Server
   ```

4. **That's it!** No build process or dependencies required.

---

## 💻 Usage

### BMI Calculator
```javascript
// Example: Calculate BMI
Height: 175 cm
Weight: 70 kg
Result: BMI = 22.86 (Normal Weight)
```

### Word Counter
```javascript
// Paste or type your text
// Real-time statistics appear:
Words: 150
Characters (with spaces): 892
Characters (without spaces): 742
Sentences: 8
Paragraphs: 3
```

### Unit Converter
```javascript
// Convert units
Input: 100
From: Meters
To: Feet
Result: 328.08 ft
```

### Password Generator
```javascript
// Generate secure password
Length: 16 characters
Options: Uppercase, Lowercase, Numbers, Symbols
Result: Kp9#mN2$vL5@xR8!
Strength: Very Strong
```

---

## 🗂️ Project Structure

```
web-utility-hub/
│
├── index.html              # Main HTML file with all tools
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── bmi-calculator.css  # BMI calculator specific styles
│   ├── word-counter.css    # Word counter specific styles
│   ├── unit-converter.css  # Unit converter specific styles
│   └── password-gen.css    # Password generator specific styles
│
├── js/
│   ├── main.js             # Main application logic & navigation
│   ├── bmi-calculator.js   # BMI calculation module
│   ├── word-counter.js     # Word counting module
│   ├── unit-converter.js   # Unit conversion module
│   ├── password-gen.js     # Password generation module
│   └── utils.js            # Shared utility functions
│
├── images/
│   └── icons/              # Tool icons and assets
│
├── screenshots/            # Project screenshots
├── README.md               # Project documentation
└── LICENSE                 # MIT License
```

---

<div align="center">
  <sub>Built with ❤️ by Team Web Utility Hub</sub>
  <br />
  <sub>Lagos, Nigeria | 2025</sub>
  <br />
  <br />
  <sub>⭐ Star this repo if you find it helpful!</sub>
</div>