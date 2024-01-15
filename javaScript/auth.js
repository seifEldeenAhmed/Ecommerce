let cartViewButton = document.querySelector("#cart-view");

cartViewButton.addEventListener("click", function () {
  if (localStorage.getItem("usresData") != null) {
    this.href = "../html/shopping-cart.html";
  } else {
    alert("login");
  }
});
