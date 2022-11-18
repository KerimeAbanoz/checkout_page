//! ------------------ variables ------------------
const taxtRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 200;

const products = document.querySelector(".products");

// const subTotal = document.querySelector("#cart-subtotal");
// const taxt = document.querySelector("#cart-tax");
// const shipping = document.querySelector("#cart-shipping");
// const total = document.querySelector("#cart-total");

let productTotal = document.querySelectorAll(".product-line-price");
// console.log(productTotal);

//! ---------------- events ------------------

//? ---------------- onload ----------------
window.addEventListener("load", () => {
  calculateCardPrice();
  // set items to localstorage
  localStorage.setItem("taxtRate", taxtRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  //   set items to sessionstorage
  sessionStorage.setItem("taxtRate", taxtRate);
  sessionStorage.setItem("shippingPrice", shippingPrice);
  sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
});

//? ---------------- capturing ----------------

products.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-minus")) {
    if (e.target.parentElement.querySelector(".quantity").innerText > 1) {
      e.target.parentElement.querySelector(".quantity").innerText--;
      calculateProductPrice(e.target);
      calculateCardPrice();
    } else {
      if (
        confirm(
          `${
            e.target.parentElement.parentElement.querySelector("h2").innerText
          } will be deleted`
        )
      ) {
        // e.target.parentElement.parentElement.parentElement.innerHTML = "";
        e.target.closest(".product").innerHTML = "";
        calculateCardPrice();
      }
    }

    // let productTotal = Number(
    //   e.target.parentElement.parentElement.lastElementChild.innerHTML
    // );
    // productTotal -= 25.98;
    // e.target.parentElement.parentElement.lastElementChild.innerHTML =
    //   productTotal;
  } else if (e.target.classList.contains("fa-plus")) {
    e.target.previousElementSibling.innerText++;
    calculateProductPrice(e.target);
    calculateCardPrice();
    // let productTotal = Number(
    //   e.target.parentElement.parentElement.lastElementChild.innerHTML
    // );
    // productTotal += 25.98;
    // e.target.parentElement.parentElement.lastElementChild.innerHTML =
    //   productTotal;
    // console.log(productTotal);
  } else if (e.target.classList.contains("remove-product")) {
    e.target.closest(".product").remove();
    calculateCardPrice();
  }
});

//! ---------------- Function declerations ------------------

const calculateProductPrice = (clickedBtn) => {
  const productInfoDiv = clickedBtn.parentElement.parentElement;
  const price = productInfoDiv.querySelector(".product-price strong").innerText;
  const quantity = productInfoDiv.querySelector(".quantity").innerText;
  const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
  productTotalDiv.innerText = (price * quantity).toFixed(2);
  //   console.log(quantity);
};

const calculateCardPrice = () => {
  const productsTotalPricesDivs = document.querySelectorAll(
    ".product-line-price"
  );

  let subTotal = 0;
  productsTotalPricesDivs.forEach((div) => {
    subTotal += parseFloat(div.innerText);
  });

  //   const subtotal = [...productsTotalPricesDivs].reduce(
  //     (acc, price) => acc + Number(price.innerText),
  //     0
  //   );

  const taxPrice = subTotal * localStorage.getItem("taxRate");

  const shippingPrice = parseFloat(
    subTotal > 0 && subTotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );

  document.querySelector("#cart-subtotal").lastElementChild.innerText =
    subTotal.toFixed(2);

  document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);

  document.querySelector("#cart-shipping").children[1].innerText =
    shippingPrice.toFixed(2);

  document.querySelector("#cart-total").lastElementChild.innerText = (
    subTotal +
    taxPrice +
    shippingPrice
  ).toFixed(2);
};
