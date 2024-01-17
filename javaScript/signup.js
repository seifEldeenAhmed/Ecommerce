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

class User {
  constructor(firstName, lastName, email, password, confirmPassword, isLogged) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.isLogged = isLogged || false;
  }
}

function signUp() {
  const check = checkValidation();
  const isEmailExist = emailIsExist();

  if (check && !isEmailExist) {
    //create users Data object
    const usersData = new User(
      userFirstName.value,
      userLastName.value,
      userEmail.value,
      userPassword.value,
      confirmPassword.value
    );
    users.push(usersData);
    //save array of users at local storage
    localStorage.setItem("usersData", JSON.stringify(users));
    location.assign("../html/login.html");
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
    userFirstName.style.border = "1px solid green";
    userLastName.style.border = "1px solid green";
    return true;
  } else {
    messageErrName.textContent = "please enter first name and last name";
    userFirstName.style.border = "1px solid red";
    userLastName.style.border = "1px solid red";
    return false;
  }
}

//to check password is valid
function passwordValidtion() {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (passwordRegex.test(userPassword.value)) {
    userPassword.style.border = "1px solid green";
    return true;
  } else {
    messageErrPaas.textContent =
      "password must be at least 8 characters with at least one uppercase one lowercase and a number 0-9*";
    userPassword.style.border = "1px solid red";
    return false;
  }
}

//to check password and confirm password is equal
function passwordConfirmValidation() {
  if (userPassword.value === confirmPassword.value) {
    confirmPassword.style.border = "1px solid green";
    return true;
  } else {
    confirmPassErr.textContent = "passwords doesn't match";
    userPassword.style.border = "1px solid red";
    confirmPassword.style.border = "1px solid red";
    return false;
  }
}

//to validate user email
function emailValidation() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(userEmail.value)) {
    userEmail.style.border = "1px solid green";
    return true;
  } else {
    emailErr.textContent = "please enter valid email";
    userEmail.style.border = "1px solid red";
    return false;
  }
}

//check if user email is exist
function emailIsExist() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === userEmail.value) {
      emailErr.textContent = "email already exist";
      userEmail.style.border = "1px solid red";
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
