let userFirstName = document.querySelector(".f-name");
let userLastName = document.querySelector(".l-name");
let userEmail = document.querySelector(".email");
let userPassword = document.querySelector(".pass");
let confirmPassword = document.querySelector(".c-pass");
let btn = document.querySelector(".btn-sign");
let messageErrName = document.querySelector(".msg");
let messageErrPaas = document.querySelector(".pass-err");
let emailErr = document.querySelector(".emailErr");
let confirmPassErr = document.querySelector(".confirm-Pass");
let users = [];

btn.addEventListener("click", signUp);

//check localStorage is not empty
if (localStorage.getItem("usersData") != null) {
  users = JSON.parse(localStorage.getItem("usersData"));
}

function signUp() {
  const check = checkValidation();
  const isEmailExist = emailIsExist();

  if (check && !isEmailExist) {
    //create users Data object
    const usersData = {
      firstName: userFirstName.value,
      lastName: userLastName.value,
      email: userEmail.value,
      password: userPassword.value,
      passwordConfirm: confirmPassword.value,
    };
    users.push(usersData);
    //save array of users at local storage
    localStorage.setItem("usersData", JSON.stringify(users));
  }
  clearForm();
}

//to check all validtions return true
function checkValidation() {
  const isNameValid = nameValidation();
  const isEmailValid = emailValidation();
  const isPasswordValid = passwordValidtion();
  const isPasswordConfirmValid = passwordConfirmValidation();

  if (
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordConfirmValid
  ) {
    return true;
  } else {
    return false;
  }
}

//function to check first name and last name is not empty
function nameValidation() {
  if (userFirstName.value !== "" && userLastName.value !== "") {
    return true;
  } else {
    messageErrName.textContent = "please enter first name and last name";
    return false;
  }
}

//to check password is valid
function passwordValidtion() {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (passwordRegex.test(userPassword.value)) {
    return true;
  } else {
    messageErrPaas.textContent =
      "password must be at least 8 characters with at least one uppercase one lowercase and a number 0-9*";
    return false;
  }
}

//to check password and confirm password is equal
function passwordConfirmValidation() {
  if (userPassword.value === confirmPassword.value) {
    return true;
  } else {
    confirmPassErr.textContent = "passwords doesn't match";
    return false;
  }
}

//to validate user email
function emailValidation() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(userEmail.value)) {
    return true;
  } else {
    emailErr.textContent = "please enter valid email";
    return false;
  }
}

//check if user email is exist
function emailIsExist() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === userEmail.value) {
      emailErr.textContent = "email already exist";
      return true;
    }
  }
  return false;
}

// to clear form
function clearForm() {
  userFirstName.value = "";
  userLastName.value = "";
  userEmail.value = "";
  userPassword.value = "";
  confirmPassword.value = "";
}
