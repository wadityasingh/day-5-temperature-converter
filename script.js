// Selecting DOM Elements
const pageBody = document.getElementById('page-body');
const statusTag = document.getElementById('status-tag');
const errorMsg = document.getElementById('error-msg');
const resetBtn = document.getElementById('reset-btn');

const celsiusInput = document.getElementById('celsius');
const fahrenheitInput = document.getElementById('fahrenheit');
const kelvinInput = document.getElementById('kelvin');

// Separate Conversion Functions (Internship requirement)
function cToF(c) {
  return (c * 9) / 5 + 32;
}

function cToK(c) {
  return c + 273.15;
}

function fToC(f) {
  return ((f - 32) * 5) / 9;
}

function kToC(k) {
  return k - 273.15;
}

// Clean number formatting (max 2 decimals)
function formatVal(val) {
  return Number(val.toFixed(2)).toString();
}

// Dynamic Natural Light Color based on Temperature (Blue / Green / Red)
function updateTheme(c) {
  if (isNaN(c)) {
    pageBody.style.backgroundColor = '#f1f5f9'; // neutral light slate
    statusTag.style.backgroundColor = '#e2e8f0';
    statusTag.style.color = '#475569';
    statusTag.textContent = 'Waiting for input';
    return;
  }

  if (c <= 10) {
    // Cold / Freezing -> Soft Light Blue
    pageBody.style.backgroundColor = '#bbe3fd';
    statusTag.style.backgroundColor = '#93d2f4';
    statusTag.style.color = '#0369a1';
    statusTag.textContent = 'Cold / Sub-Zero ❄️';
  } else if (c > 10 && c <= 32) {
    // Normal / Room Temp -> Soft Light Green
    pageBody.style.backgroundColor = '#5cc17f';
    statusTag.style.backgroundColor = '#4cce7a';
    statusTag.style.color = '#15803d';
    statusTag.textContent = 'Pleasant / Room Temp 🌿';
  } else {
    // Warm / Hot -> Soft Light Red / Coral
    pageBody.style.backgroundColor = '#ec4c4c';
    statusTag.style.backgroundColor = '#f15353';
    statusTag.style.color = '#b91c1c';
    statusTag.textContent = 'High Heat / Hot 🔥';
  }
}

// Input validation against physical limits
function validateInput(value, unit) {
  if (value.trim() === '') {
    clearAll();
    return false;
  }

  const num = Number(value);
  if (isNaN(num)) {
    showError('Please enter a valid number.');
    return false;
  }

  // Absolute zero constraints
  if (unit === 'celsius' && num < -273.15) {
    showError('Temperature cannot fall below -273.15°C (Absolute Zero).');
    return false;
  }
  if (unit === 'kelvin' && num < 0) {
    showError('Kelvin cannot be negative (0 K is Absolute Zero).');
    return false;
  }
  if (unit === 'fahrenheit' && num < -459.67) {
    showError('Temperature cannot fall below -459.67°F (Absolute Zero).');
    return false;
  }

  hideError();
  return true;
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.display = 'block';
}

function hideError() {
  errorMsg.textContent = '';
  errorMsg.style.display = 'none';
}

function clearAll() {
  celsiusInput.value = '';
  fahrenheitInput.value = '';
  kelvinInput.value = '';
  hideError();
  updateTheme(NaN);
}

// Live Input Event Listeners
celsiusInput.addEventListener('input', (e) => {
  const val = e.target.value;
  if (!validateInput(val, 'celsius')) return;

  const c = parseFloat(val);
  fahrenheitInput.value = formatVal(cToF(c));
  kelvinInput.value = formatVal(cToK(c));
  updateTheme(c);
});

fahrenheitInput.addEventListener('input', (e) => {
  const val = e.target.value;
  if (!validateInput(val, 'fahrenheit')) return;

  const f = parseFloat(val);
  const c = fToC(f);
  celsiusInput.value = formatVal(c);
  kelvinInput.value = formatVal(cToK(c));
  updateTheme(c);
});

kelvinInput.addEventListener('input', (e) => {
  const val = e.target.value;
  if (!validateInput(val, 'kelvin')) return;

  const k = parseFloat(val);
  const c = kToC(k);
  celsiusInput.value = formatVal(c);
  fahrenheitInput.value = formatVal(cToF(c));
  updateTheme(c);
});

resetBtn.addEventListener('click', clearAll);

// Default initial state
updateTheme(25);