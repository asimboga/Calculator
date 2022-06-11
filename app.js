const prevDisp = document.querySelector(".previous-display");
const currDisp = document.querySelector(".current-display");

const btnContainer = document.querySelector(".buttons-container");

let currOperand = "";
let previousOperand = "";
let operation = "";

// butonları taşıyan container için event tanımlaması
btnContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("num")) {
        appendNumber(e.target.textContent);
        updateDisplay();
    }
    if (e.target.classList.contains("operator")) {
        chooseOperator(e.target.textContent);
        updateDisplay();
    }
    if (e.target.classList.contains("equal")) {
        calculate();
        updateDisplay();
    }
    if (e.target.classList.contains("ac")) {
        previousOperand = "",
        currOperand = "",
        operation = "",
        updateDisplay();
    }
    if (e.target.classList.contains("pm")) {
        if(!currOperand)return;
        currOperand *= -1
        updateDisplay();
    }
    if (e.target.classList.contains("percent")) {
        if(!currOperand)return;
        currOperand = currOperand /100
        updateDisplay();
    }
});

const appendNumber = (num) => {
    //? Eger onceden 0 girilmisse ve tekrardan 0 girilise geri don
    if (currOperand === '0' && num === '0') return;

    //? Eğer ilk olarak 0 girilmisse ve sonrasinda da . haricinde baska
    //? bir sayi girilmis ise sadece girilen yeni sayiyi degiskene aktar.
    //? Orn: 09 => 9 , 03 => 3 , 0.1 => 0.1
    if (currOperand === '0' && num !== '.') {
        currOperand = num;
        return;
    }

    //? Eğer şu anki sayi . ise ve önceki girilen sayi . iceriyorsa geri don
    if (num === '.' && currOperand.includes('.')) return;

    if (currOperand.length > 10) return;
    //? Girilen sayilari birlestir.
    currOperand += num;
};

const updateDisplay = () => {
    if(currOperand.toString().length > 11){
        currOperand = Number(currOperand).toExponential(3);
    }
    currDisp.textContent = currOperand;
    prevDisp.textContent = `${previousOperand} ${operation}`;
};

const chooseOperator = (op) => {
    if (previousOperand) {
        calculate();
    };
    calculate();
    operation = op;
    previousOperand = currOperand;
    currOperand = "";
};

const calculate = () => {
    let calculation = 0;

    const prev = Number(previousOperand);
    const current = Number(currOperand);

    switch (operation) {
        case "+":
            calculation = prev + current;
            break;
        case "-":
            calculation = prev - current;
            break;
        case "*":
            calculation = prev * current;
            break;
        case "÷":
            calculation = prev / current;
            break;
        default:
            return;
    }
    currOperand = calculation;
    previousOperand = "";
    operation = "";
};






