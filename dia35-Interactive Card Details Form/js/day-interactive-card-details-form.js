//Variables para el formulario del card
let cardholder_name = document.getElementById("name");
let number = document.getElementById("card");
let date_MM = document.getElementById("date_mm");
let date_YY = document.getElementById("date_yy");
let cvv = document.getElementById("cvv");

//Variables para el card
let card_name = document.getElementById("card__name");
let card_number = document.getElementById("card__number");
let card_date = document.getElementById("card__date");
let card_cvv = document.getElementById("card__cvv");

//Variables para el error
let error_mensaje = document.querySelectorAll(".error__mensaje");

function validateCard() {
  let isValidCardName = validateCardName();
  let isValidCardNumber = validateCardNumber();
  let isValidCardDate = validateCardDate();
  let isValidCVV = validateCVV();

  console.log(isValidCardName, isValidCardNumber, isValidCardDate, isValidCVV);

  if (isValidCardName && isValidCardNumber && isValidCardDate && isValidCVV) {
    card_name.innerHTML = cardholder_name.value;
    card_number.innerHTML = number.value;
    card_date.innerHTML = date_MM.value + "/" + date_YY.value;
    card_cvv.innerHTML = cvv.value;
    displayMessageSuccess();
  }
}

function displayMessageSuccess() {
  let confirm = document.querySelector(".confirmacion");
  let form_card = document.querySelector(".tarjeta-ppal__formato");

  confirm.classList.add("is_confirm");
  form_card.classList.add("is_confirm");
}

function validateCardName() {
  return validateEmptyField(cardholder_name, 0) ? true : false;
}

function validateCardNumber() {
  let trimmedValue = number.value.replace(/\s+/g, '');
  if (validateEmptyField(number, 1)) {
    if (trimmedValue.length !== 16){
      activeError(number, 'Invalid card number', 1);
      return false;
    } else {
      clearError(number, 1);
    }
  } else {
    return false;
  }

  return true;
}

function validateCardDate() {
  let isValidMonth = validateEmptyField(date_MM, 2);
  let isValidYear = validateEmptyField(date_YY, 2);
  let actualYear = new Date().getFullYear().toString().slice(-2);
  
  if (isValidMonth && isValidYear) {
    if (!(date_MM.value >= 1 && date_MM.value <= 12)) {
      activeError(date_MM, 'Invalid date', 2);
      return false;
    } else {
      clearError(date_MM, 2);
    }

    if (parseInt(date_YY.value) < parseInt(actualYear)) {
      activeError(date_YY, 'Invalid date', 2);
      return false;
    } else {
      clearError(date_YY, 2);
    }
  } else {
    return false;
  }

  return true;
}

function validateCVV() {
  if (validateEmptyField(cvv, 3)) {
    if (cvv.value.length !== 3) {
      activeError(cvv, 'Invalid CVV', 3);
      return false;
    } else {
      clearError(cvv, 3);
    }
  } else {
    return false;
  }

  return true;
}

function validateEmptyField(input, position) {
  if (input.value === '') {
    activeError(input, `Can't be blank`, position);
    return false;
  } else {
    clearError(input, position);
  }

  return true;
}

function activeError(input, errormensaje, position) {
  input.classList.add('error');
  error_mensaje[position].textContent = errormensaje;
  error_mensaje[position].classList.add('active');
}

function clearError(input, position) {
  input.classList.remove('error');
  error_mensaje[position].classList.remove('active');
}

// Back

function back() {
  let confirm = document.querySelector(".confirmacion");
  let form_card = document.querySelector(".tarjeta-ppal__formato");

  confirm.classList.remove("is_confirm");
  form_card.classList.remove("is_confirm");

  clearAll();
}

function clearAll() {
  cardholder_name.value = '';
  number.value = '';
  date_MM.value = '';
  date_YY.value = '';
  cvv.value = '';

  card_name.innerHTML = 'Jane Appleseed';
  card_number.innerHTML = '0000 0000 0000 0000';
  card_date.innerHTML = '00/00';
  card_cvv.innerHTML = '000';

  for (let i = 0; i < error_mensaje.length; i++) {
    error_mensaje[i].classList.remove('active');
  }
}

//Format card number
number.addEventListener('input', function(event) {
  const input = event.target;
  const trimmedValue = input.value.replace(/\s+/g, '');
  const value = trimmedValue.replace(/\D/g, ''); 
  const formattedValue = formatCardNumber(value);
  
  input.value = formattedValue;
});

function formatCardNumber(value) {
  let formatted = '';
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formatted += ' ';
    }
    formatted += value.charAt(i);
  }
  return formatted;
}