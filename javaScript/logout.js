let logOutButton = document.querySelector(".logout-btn");
let users = JSON.parse(localStorage.getItem("usersData"));

logOutButton.addEventListener("click", logOut);

function logOut() {
  let userIndex = findLoggedInUserIndex();

  if (userIndex !== -1) {
    users[userIndex].isLogged = false;
    localStorage.setItem("usersData", JSON.stringify(users));
  } else {
    
  }
}

function findLoggedInUserIndex() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].isLogged === true) {
      return i;
    }
  }
  return -1; // Return -1 if no user is found with isLogged set to true
}
