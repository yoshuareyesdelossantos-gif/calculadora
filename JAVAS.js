const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const customTip = document.getElementById('custom-tip');
const tipBtns = document.querySelectorAll('.tip-btn');
const tipResult = document.getElementById('tip-result');
const totalResult = document.getElementById('total-result');
const resetBtn = document.getElementById('reset');
const errorMsg = document.getElementById('error-msg');

let billValue = 0;
let tipPercent = 0;
let peopleValue = 0;

function calculate() {
    // Solo procedemos si el número de personas es mayor que 0
    if (peopleValue > 0) {
        // Reset de estilos de error
        errorMsg.style.display = 'none';
        peopleInput.classList.remove('input-error');

        // Cálculo
        const totalTip = (billValue * tipPercent) / 100;
        const tipPerPerson = totalTip / peopleValue;
        const totalPerPerson = (billValue + totalTip) / peopleValue;

        // Actualizar UI
        tipResult.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalResult.textContent = `$${totalPerPerson.toFixed(2)}`;
        resetBtn.disabled = false;
    } else {
        // Mostrar error si el usuario empezó a escribir pero es 0 o vacío
        if (billInput.value !== "") {
            errorMsg.style.display = 'block';
            peopleInput.classList.add('input-error');
        }
        tipResult.textContent = '$0.00';
        totalResult.textContent = '$0.00';
    }
}

billInput.addEventListener('input', (e) => {
    billValue = parseFloat(e.target.value) || 0;
    calculate();
});

peopleInput.addEventListener('input', (e) => {
    peopleValue = parseInt(e.target.value) || 0;
    calculate();
});

tipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tipBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        customTip.value = '';
        tipPercent = parseInt(btn.dataset.tip);
        calculate();
    });
});

customTip.addEventListener('input', () => {
    tipBtns.forEach(b => b.classList.remove('active'));
    tipPercent = parseFloat(customTip.value) || 0;
    calculate();
});

resetBtn.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    customTip.value = '';
    tipBtns.forEach(b => b.classList.remove('active'));
    tipResult.textContent = '$0.00';
    totalResult.textContent = '$0.00';
    resetBtn.disabled = true;
    errorMsg.style.display = 'none';
    peopleInput.classList.remove('input-error');
    billValue = 0;
    tipPercent = 0;
    peopleValue = 0;
});