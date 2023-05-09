// @ts-nocheck
import { menuArray } from "./data.js";

const menuItems = document.getElementById("menu-items");
const orderedHtml = document.getElementById("ordered");
const totalPrice = document.getElementById("total-price");
const completeOrderBtn = document.getElementById("complete-order");
const orderSection = document.querySelector(".order-section");
const modalSection = document.querySelector(".dialog");
const thankYou = document.querySelector(".thank-you");
const modalForm = document.getElementById("modal-form");
let userName = "";
let orderedItems = [];

/* 
Grab Username data on submit of the form, clear the ordered items, add the thankyou message.
*/
modalForm.addEventListener('submit', function (e) {
  e.preventDefault();
  modalSection.close();
  const modalData = new FormData(modalForm);
  userName = modalData.get("name");
  orderedItems = [];
  render();
  addThankYou();
});

/* Add event listener to the clicks on the page, check if an item has been clicked, a remove option or the complete order button */
document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    menuArray.find((item) => {
      if (item.id === Number(e.target.dataset.id)) {
        orderedItems.unshift(item);
        thankYou.classList.add("hide");
      }
    });
  } else if (e.target.dataset.remove) {
    menuArray.find((item) => {
      if (item.id === Number(e.target.dataset.remove)) {
        orderedItems.splice(orderedItems.indexOf(item), 1);
      }
    });
  } else if (e.target.id === "complete-order") {
    modalSection.showModal();
  }
  render();
  console.log(orderedItems);
});

/** A function that takes in the array of menu item objects and creates an HTML string to insert into the correct element */
const getMenuHtml = (array) => {
  const menuHtml = array.map((item) => {
    return `      <section class="item">
        <div class="emoji">${item.emoji}</div>
        <div class="about">
          <div class="name">${item.name}</div>
          <div class="ingredients">${item.ingredients}</div>
          <div class="price">£${item.price}</div>
        </div>
        <div class="plus-btn" data-id="${item.id}" ><i  class="fa-regular fa-plus"></i></div>
      </section>`;
  });
  return menuHtml;
};
/* Renders the necessary html on the page and adds/removes hide class */
const render = () => {
  let total = 0;
  const menuHtmltoInsert = getMenuHtml(menuArray);
  const orderedItemsHtmltoInsert = getOrderedHtml(orderedItems);
  orderedItems.map((item) => (total += item.price));
  menuItems.innerHTML = menuHtmltoInsert;
  orderedHtml.innerHTML = orderedItemsHtmltoInsert;
  totalPrice.innerHTML = `£${total}`;
  if (total === 0) {
    orderSection.classList.add("hide");
    completeOrderBtn.classList.add("hide");
  } else {
    orderSection.classList.remove("hide");
    completeOrderBtn.classList.remove("hide");
  }
};
/** A function that takes in the array of ordered item objects and creates an HTML string to insert into the correct element */
const getOrderedHtml = (arr) => {
  const orderedHtml = arr.map((item) => {
    return `  <div class="ordered-item">
    <div class="ordered-item-name">${item.name}</div>
    <div class="remove" data-remove="${item.id}">remove</div>
    <div class="ordered-item-price">£${item.price}</div>
  </div>`;
  });
  return orderedHtml;
};
/* Takes the name grabbed from the form and inserts it into the element */
const addThankYou = () => {
  thankYou.classList.remove("hide");
  thankYou.innerHTML = ` Thanks ${userName}! Your order is on its way!`;
};

render();
