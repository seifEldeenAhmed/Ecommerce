let loginEmail = document.querySelector(".email-login");
let loginPass = document.querySelector(".pass-login");
let btnLogin = document.querySelector(".btn-login");
let message = document.querySelector(".err-login");
let usersData = JSON.parse(localStorage.getItem("usersData"));

btnLogin.addEventListener("click", login);

function login() {
  loginEmail.style.borderColor = "red";
  loginPass.style.borderColor = "red";
  if (loginEmail.value === "" && loginPass.value === "") {
    message.textContent = "Enter email and password";
  } else {
    let userIndex;
    let found = false;
    for (let i = 0; i < usersData.length; i++) {
      if (
        usersData[i].email === loginEmail.value &&
        usersData[i].password === loginPass.value
      ) {
        found = true;
        userIndex = i;
        break;
      }
    }
    if (found) {
      usersData[userIndex].isLogged = true;
      localStorage.setItem("usersData", JSON.stringify(usersData));
      message.textContent = "success";
      location.assign("../html/index.html");
    } else {
      message.textContent = "incorrect email or password";
      loginEmail.style.borderColor = "red";
      loginPass.style.borderColor = "red";
    }
  }
  clearForm();
}

function clearForm() {
  loginEmail.value = "";
  loginPass.value = "";
}
