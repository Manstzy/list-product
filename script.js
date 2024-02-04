const list = document.getElementById("list");
const containerSidebar = document.getElementById("containerSidebar");

const fetchData = async () => {
  const product = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      data.map((product) => {
        const { id, image, price, title } = product;
        // console.log(product);
        // batasi huruf
        const limitHuruf =
          title.length > 10 ? title.slice(0, 15) + "..." : title;
        // convert to dollar
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
        <button onclick="addToChart(${id})"
          class="bg-black hover:scale-105 hover:duration-300 hover:transition-all mt-1 text-white text-[12px] rounded-md py-1 px-2 cursor-pointer"
        >
          Add to chart
        </button>
      </div>
      `;
        containerSidebar.innerHTML += `
        <div class="flex hidden">
        <img src=${product.image} class="w-20 h-20 mt-5" alt="" />
        <div>
          <p class="font-poppins text-sm mt-4 ml-5">title</p>
          <p class="font-poppins mt-2 ml-5 text-sm">price : $200</p>
          <div class="font-poppins mt-3 ml-5 text-sm flex gap-3">
            <img
              onclick="left()"
              src="./images/left.png"
              class="w-5 h-5 text-white filter brightness-0 invert cursor-pointer"
              alt=""
            />
            <p id="jumlah">1</p>
            <img
              onclick="rigth()"
              src="./images/right.png"
              class="w-5 h-5 text-white filter brightness-0 invert cursor-pointer"
              alt=""
            />
          </div>
        </div>
      </div>
        
        `;
      });
    });
  return product;
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

let cartCount = 0;

function addToChart(productId) {
  // increment
  cartCount++;

  updateCartCount();
}

function updateCartCount() {
  const count = document.getElementById("count");
  count.textContent = cartCount;
}
