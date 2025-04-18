function calculateBMI() {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const bmiResultValueSpan = document.getElementById('bmi-result-value');
    const bmiInterpretationDiv = document.getElementById('bmi-interpretation');

    const weight = parseFloat(weightInput.value);
    const heightCm = parseFloat(heightInput.value);

    if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
        bmiResultValueSpan.textContent = 'Invalid input';
        bmiInterpretationDiv.textContent = '';
        return;
    }

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    const roundedBMI = bmi.toFixed(2);

    let interpretation = '';
    if (bmi < 18.5) {
        interpretation = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        interpretation = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
        interpretation = 'Overweight';
    } else if (bmi >= 30) {
        interpretation = 'Obese';
    }

    bmiResultValueSpan.textContent = `${roundedBMI}`;
    bmiInterpretationDiv.textContent = `(${interpretation})`;
    return bmi;
}

function calculateTDEE() {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const activitySelect = document.getElementById('activity');
    const tdeeResultValueSpan = document.getElementById('tdee-result-value');

    const weight = parseFloat(weightInput.value);
    const heightCm = parseFloat(heightInput.value);
    const age = parseFloat(ageInput.value);
    const gender = genderSelect.value;
    const activityLevel = parseFloat(activitySelect.value);

    if (isNaN(weight) || isNaN(heightCm) || isNaN(age) || weight <= 0 || heightCm <= 0 || age <= 0) {
        tdeeResultValueSpan.textContent = 'Invalid input';
        return;
    }

    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161;
    }

    const tdee = bmr * activityLevel;
    const roundedTDEE = tdee.toFixed(0);

    tdeeResultValueSpan.textContent = `${roundedTDEE} calories per day`;
}

function calculateBoth() {
    calculateBMI();
    calculateTDEE();
}