import { products } from "./products.js";

const divHeader = document.querySelector("#header");
divHeader.setAttribute(
  "class",
  `flex w-full text-gray-900 text-4xl text-bold justify-center pt-10`
);
divHeader.setAttribute(
  "style",
  "font-family: 'Prompt', sans-serif; font-size: 3em;"
);
divHeader.innerHTML = "<b>iPhone รุ่นไหนที่ใช่สำหรับคุณ</b>";

console.log(products);
const divProducts = document.querySelector("#products");
divProducts.setAttribute(
  "class",
  `mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8`
);
divProducts.setAttribute("style", "margin-bottom: 5%;");

showProducts();

function showProducts() {
  for (const pd of products) {
    let divEachProduct = document.createElement("div");
    divEachProduct.setAttribute("id", pd.product_id);
    divEachProduct.setAttribute("class", "product");

    let divName = document.createElement("div");
    divName.setAttribute("class", "mt-4 flex justify-center text-3xl");
    divName.textContent = pd.product_name;
    divEachProduct.appendChild(divName);

    let pStock = document.createElement("p");
    pStock.setAttribute("class", "mt-1 flex justify-center");
    pStock.textContent = pd.stock > 0 ? `Stock : ${pd.stock}` : `Out Of Stock`;
    divEachProduct.appendChild(pStock);

    let divImage = document.createElement("div");
    divImage.setAttribute(
      "class",
      "w-full min-h-80 transition duration-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-80 lg:h-80 lg:aspect-none cursor-pointer"
    );
    let imgElem = document.createElement("img");
    imgElem.setAttribute("src", pd.product_image);
    imgElem.setAttribute(
      "class",
      "w-full h-full object-center object-cover lg:w-full lg:h-full"
    );
    divImage.appendChild(imgElem);
    divEachProduct.appendChild(divImage);

    let divPriceAdd = document.createElement("div");
    divPriceAdd.setAttribute("class", "mt-4 flex justify-between");

    let divPrice = document.createElement("div");
    divPrice.setAttribute("class", "mt-2 text-2xl text-gray-900 pr-10");
    divPrice.textContent = `${pd.product_price}฿`;

    let add = document.createElement("button");
    if (pd.stock > 0) {
      add.setAttribute("type", "submit");
      add.setAttribute(
        "class",
        "mt-0 w-full bg-blue-500 transition duration-200 border border-transparent rounded-2xl py-3 px-3 flex items-center justify-center text-base font-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      );
      add.textContent = "Add to Cart";
    } else {
      add.setAttribute(
        "class",
        "mt-0 w-full bg-gray-300 rounded-2xl py-3 px-3 flex items-center justify-center text-base font-sm text-white"
      );
      add.textContent = "Out Of Stock";
    }

    divPriceAdd.appendChild(divPrice);
    divPriceAdd.appendChild(add);
    divEachProduct.appendChild(divPriceAdd);

    divProducts.appendChild(divEachProduct);

    let searchName = document.querySelector("#searchBox");

    searchName.addEventListener("keyup", (e) => {
      let text = e.target.value.toLowerCase();
      for (const pd of products) {
        let productName = pd.product_name;
        if (!productName.toLowerCase().includes(text)) {
          document.querySelector(pd.product_id).style.display = "none";
        }
      }
    });
  }
}

let filterProduct = document.querySelectorAll(".product");
document.querySelector("#searchBox").addEventListener("keyup", filter);

function filter(e) {
  let text = e.target.value;
  console.log(text);
  for (let i = 0; i < filterProduct.length; i++) {
    let productName = products[i].product_name;
    if (productName.toLowerCase().trim().includes(text.toLowerCase())) {
      filterProduct[i].style.display = "";
    } else {
      filterProduct[i].style.display = "none";
    }
  }
}
