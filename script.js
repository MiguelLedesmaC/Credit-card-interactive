/**Variables para nombre */
let inputName = document.querySelector("#name");
let nameInCard = document.querySelector(".front-card__data-container__name");
let nameError = document.querySelector(".error-name");

/**variables para numeroTarjeta de credito */
let numberCard = document.querySelector("#numberCard");
let inputCardNumbers = document.querySelector("#select-card-number");
let errorNumbers = document.querySelector(".error-numbers");

/**Variables para Date */
let inputMonth = document.querySelector("#month");
let cardMonth = document.querySelector("#cardMonth");
let errorData = document.querySelector(".error-data");
let inputYear = document.querySelector("#year");
let yearInvalid = document.querySelector('.year-invalid')
let cardYear = document.querySelector("#cardYear");

/**Formulario */
let form = document.querySelector("#form");
let inputs = document.querySelectorAll("input");

/**Numero cvc */
let cardCvc = document.querySelector(".card-container__behind__csv__number");
let inputCvc = document.querySelector(".cvc-form");
let errorCvc = document.querySelector(".error-cvc");

//Variable Thank you
const thankYou = document.querySelector(".validate-container");
const btnThankYou = document.querySelector(".validate-container__button");

//variables RegExp
const regExp = /([A-z])/g;
let onlyNums = new RegExp(/^[A-Za-z0-9\s]+$/);

//Variables verificar inputs
let nameValid = false;
let numberValid = false;
let monthValid = false;
let yearValid = false;
let cvcValid = false;

//*Ingreso de nombre Dinamico
inputName.addEventListener("input", () => {
    if (inputName.value == "") {
        nameInCard.innerText = "Ingresa nombre";
    } else {
        nameInCard.innerText = inputName.value;
    }
});

//*Ingreso de number cards Dinamico
inputCardNumbers.addEventListener("input", (e) => {
    let inputValue = e.target.value;

    //Validamos que haya una letra
    if (regExp.test(inputCardNumbers.value)) {
        error(
            inputCardNumbers,
            errorNumbers,
            "Wrong format, numbers only",
            true
        );
        numberValid = false;

        //Si el input esta vacio renderizamos un valor
    } else if (inputCardNumbers.value == "") {
        numberCard.innerText = "0000 0000 0000 0000";
        error(inputCardNumbers, errorNumbers, "", false);
        //Caso contrario renderizamos lo que se vaya escribiendo en input
    } else {
        //* Importante!! PRIMER REPLACE: cambiamos el espacio por un caracter vacio
        //* Importante!! SEGUNDO REPLACE: entre parentesis y luego las acciones a realizar
        //* [0-9] lo que hace es buscar numeros entre 0 y 9 {4} y que cada 4 numeros ponga 1 espacio
        //* Añadiendo '$1 ' y por ultimo con trim eliminamos los espacios finales
        inputCardNumbers.value = inputValue
            .replace(/\s/g, "")
            .replace(/([0-9]{4})/g, "$1 ")
            .trim(); //Cuando se pulse la tecla espacio, la reemplazamos por un texto vacio
        numberCard.innerText = inputCardNumbers.value;
        error(inputCardNumbers, errorNumbers, "", false);
    }
});

//*Ingreso de més Dinamico
inputMonth.addEventListener("input", () => {
    if (inputMonth.value == "") {
        cardMonth.innerText = "00";
    } else if (regExp.test(inputMonth.value)) {
        error(inputMonth, errorData, "Only numbers", true);
    } else {
        cardMonth.innerText = inputMonth.value;
        error(inputMonth, errorData, "", false);
    }
});

//* Ingreso año dinamico

inputYear.addEventListener("input", () => {
    cardYear.innerText = inputYear.value;

    if (inputYear.value == "") {
        error(inputYear, errorData, "Cant be blank", true);
        cardYear.innerText = "00";
    } else if (regExp.test(inputYear.value)) {
        error(inputYear, errorData, "Only numbers");
    } else {
        error(inputYear, errorData, "", false);
    }
});

//* Ingreso de CVC dinamico
inputCvc.addEventListener("input", () => {
    if (inputCvc.value == "") {
        cardCvc.innerText = "000";
        error(inputCvc, errorCvc, "Cant be blank", true);
    } else if (regExp.test(inputCvc.value)) {
        error(inputCvc, errorCvc, "Only numbers", true);
    } else {
        cardCvc.innerText = inputCvc.value;
        error(inputCvc, errorCvc, "", false);
    }
});

//*Formulario
form.addEventListener("submit", (e) => {
    console.log('cliick');
    e.preventDefault();
    
    //validacion nombre
    if (inputName.value.length > 0) {
        nameValid = true;
        error(inputName, nameError, "", false);
    } else {
        error(inputName, nameError, "Can`t be blank");
    }

    //validación card number

    if (inputCardNumbers.value.length == 0) {
        error(inputCardNumbers, errorNumbers, "Can`t be blank", true);
    }
    if (
        inputCardNumbers.value.length > 0 &&
        inputCardNumbers.value.length <= 18
    ) {
        error(inputCardNumbers, errorNumbers, "Missing numbers", true);
    }
    if (
        inputCardNumbers.value.length == 19 &&
        !regExp.test(inputCardNumbers.value)
    ) {
        numberValid = true;
    }

    //Validamos el mes
    if (inputMonth.value == "") {
        error(inputMonth, errorData, "Cant be blank", true);
    } else if (inputMonth.value > 12) {
        error(inputMonth, errorData, "Max 12 month", true);
    } else if (regExp.test(inputMonth.value)) {
        error(inputMonth, errorData, "Only numbers", true);
    } else {
        error(inputMonth, errorData, "", false);
        monthValid = true;
    }
    //Validamos año
    if (inputYear.value == "" || inputYear.value < 23) {
        error(inputYear, yearInvalid, "Year invalid", true);
    }else {
        error(inputYear, yearInvalid, "Year invalid", false);
    }
    
    if (inputYear.value > 22 && !regExp.test(inputYear.value)) {
        yearValid = true;
    }

    //Validamos cvc
    if (inputCvc.value == "") {
        cardCvc.innerText = "000";
        error(inputCvc, errorCvc, "Cant be blank", true);
    }
    if (inputCvc.value.length > 0 && inputCvc.value.length <= 2) {
        error(inputCvc, errorCvc, "CVC incorrect", true);
    }
    if (inputCvc.value.length == 3 && !regExp.test(inputCvc.value)) {
        cvcValid = true;
    }

    if (nameValid && numberValid && monthValid && yearValid && cvcValid) {
        thankYou.style.display = "flex";
        form.style.display = "none";
    }
});
//Boton thank you, cuando damos continue volvemos a formulario principal
//y reiniciamos todas las variables y se vacian los inputs
btnThankYou.addEventListener("click", () => {
    inputName.value = "";
    inputCardNumbers.value = "";
    inputMonth.value = "";
    inputYear.value = "";
    inputCvc.value = "";
    nameInCard.innerText = "jane appleseed";
    numberCard.innerText = "0000 0000 0000 0000";
    cardMonth.innerText = "00";
    cardYear.innerText = "00";
    cardCvc.innerText = "000";
    nameValid = false;
    numberValid = false;
    monthValid = false;
    yearValid = false;
    cvcValid = false;
    thankYou.style.display = "none";
    form.style.display = "flex";
});

//Funciones
/**
 *
 * @param {*Elegimos input al que darle el estilo al borde} divInput
 * @param {*Error al que queremos llamar} divError
 * @param {*Mensaje de error a renderizar} msgError
 * @param {*Mostramos true o false, a mostrare el mensaje} show
 */
function error(divInput, divError, msgError, show = true) {
    if (show) {
        divInput.style.borderColor = "red";
        divError.innerText = msgError;
        divError.classList.add("show");
    } else {
        divError.innerText = msgError;
        divInput.style.borderColor = "hsl(279, 6%, 55%)";
        divError.classList.remove("show");
    }
}
