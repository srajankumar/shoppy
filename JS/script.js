const cartItems = {};

function addToCart(itemName, price) {
  if (cartItems[itemName]) {
    cartItems[itemName].quantity++;
  } else {
    cartItems[itemName] = {
      price: price,
      quantity: 1,
    };
  }

  updateCart();
  alert(itemName + " added to cart");
}

function removeFromCart(itemName) {
  if (cartItems[itemName]) {
    cartItems[itemName].quantity--;
    if (cartItems[itemName].quantity === 0) {
      delete cartItems[itemName];
    }
  }

  updateCart();
  alert(itemName + " removed from cart");
}

function updateCart() {
  const cartList = document.getElementById("cart");
  const totalPriceElement = document.getElementById("total-price");
  let totalPrice = 0;

  cartList.innerHTML = "";

  for (const item in cartItems) {
    const { price, quantity } = cartItems[item];
    const itemTotal = price * quantity;
    totalPrice += itemTotal;

    const li = document.createElement("li");
    li.classList.add("cart-item"); // Add a class to each cart item for styling

    const quantitySpan = document.createElement("span");
    quantitySpan.innerText = `${quantity} x ${item} - $${itemTotal}`;
    quantitySpan.classList.add("item-details"); // Add a class for the left-aligned content
    li.appendChild(quantitySpan);

    const removeButton = document.createElement("button");
    removeButton.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path fill="currentColor" d="M4 9h12v2H4z" />
      </svg>
    `;
    removeButton.classList.add("remove-button"); // Add a class for the right-aligned button
    removeButton.onclick = () => removeFromCart(item);

    li.appendChild(removeButton);
    cartList.appendChild(li);
  }

  totalPriceElement.innerText = totalPrice;
}
