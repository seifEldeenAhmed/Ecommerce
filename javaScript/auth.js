let cartViewButton = document.querySelector("#cart-view");
let logOutButton = document.querySelector(".logout-btn");
let users = JSON.parse(localStorage.getItem("usersData"));

cartViewButton.addEventListener("click", function () {
  let loginStatus = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].isLogged === true&& users!==null) {
          loginStatus = true;
        }
      }
  if (loginStatus) {
    this.href = "../html/shopping-cart.html";
  } else {
    var $popupContainer = $("#loginPopUp");
    $popupContainer.fadeIn(500, function () {
    $(this).delay(1000).fadeOut(5000);
      });
  }
  
});

logOutButton.addEventListener("click", logOut);

function logOut() {
    var $popupContainer = $("#logOutPopUp");
   $popupContainer.fadeIn(500, function () {
    $(this).delay(1000).fadeOut(5000);
    });

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

