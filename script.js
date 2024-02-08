const list = document.getElementById("list");
const containerSidebar = document.getElementById("containerSidebar");
const count = document.getElementById("count");

const fetchData = async () => {
  const products = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product) => {
        const { id, image, price, title } = product;
        const limitHuruf =
          title.length > 10 ? title.slice(0, 15) + "..." : title;
        const converUsd = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);
        list.innerHTML += `
          <div id=${id}
          class="bg-white hover:scale-105 hover:transition-all hover:duration-300 shadow-2xl shadow-black w-40 h-62 p-2 flex flex-col items-center justify-center rounded-md mt-4 cursor-grab"
        >
          <img src="${image}" class="rounded-md w-32 h-32" alt="" />
          <h1 class="font-poppins text-sm mt-1">${limitHuruf}</h1>
          <p class="text-sm mt-1 font-bold">${converUsd}</p>
          <button onclick="addToCart(${id})"
            class="bg-black hover:scale-105 hover:duration-300 hover:transition-all mt-1 text-white text-[12px] rounded-md py-1 px-2 cursor-pointer"
          >
            Add to cart
          </button>
        </div>
        `;
        product.quantity = 0; // Add quantity property to product object
        cards.push(product); // Add entire product object to cards
      });
    });
};

fetchData();

function closeElement() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
}

function shoppingNow() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.add("fixed");
  sidebar.classList.toggle("hidden");
  console.log(sidebar);
}

let cards = [];

function addToChart(productId) {
  addToChart(productId);
}

function addToCart(productId) {
  const productIndex = cards.findIndex((product) => product.id == productId);
  if (productIndex !== -1) {
    cards[productIndex].quantity++;
    addCartToHtml();
  }
}

function addCartToHtml() {
  containerSidebar.innerHTML = "";
  let totalPrice = 0;
  let totalQuantity = 0;

  cards.forEach((product) => {
    totalQuantity += product.quantity;
    const subtotalPrice = product.price * product.quantity;
    totalPrice += subtotalPrice;

    if (product.quantity > 0) {
      const limitHuruf =
        product.title.length > 10
          ? product.title.slice(0, 20) + "..."
          : product.title;

      containerSidebar.innerHTML += `
        <div  class="flex">
          <img src=${product.image} class="w-20 h-20 mt-5" alt="" />
          <div>
            <p class="font-poppins text-sm mt-4 ml-5">${limitHuruf}</p>
            <p class="font-poppins mt-2 ml-5 text-sm">Price: ${subtotalPrice}</p>
            <img id="remove" class="cursor-pointer filter brightness-0 invert mt-2 h-5 w-5 ml-5 text-white" src="./images/remove.png" alt="">
          </div>
        </div>
      `;
    }
  });

  count.textContent = totalQuantity;

  document.querySelectorAll("#remove").forEach((remove) => {
    remove.addEventListener("click", function (event) {
      const parentDiv = event.target.parentElement.parentElement
      parentDiv.remove()
    });
  });
}
