const tbody = document.getElementById("bodyProduct");

const search=document.getElementById("search");

// const buttons = document.querySelectorAll('.btn');

const option5=document.getElementById("option5");
const option6=document.getElementById("option6");
const option7=document.getElementById("option7");
const option8=document.getElementById("option8");
const option9=document.getElementById("option9");


const allRadioButton = document.getElementById("cart_0");
const sneakersRadioButton = document.getElementById("cart_1");
const flatsRadioButton = document.getElementById("cart_2");
const sandalsRadioButton = document.getElementById("cart_3");
const hellsRadioButton = document.getElementById("cart_4");

const price_0 = document.getElementById("price_0");
const price_1 = document.getElementById("price_1");
const price_2 = document.getElementById("price_2");
const price_3 = document.getElementById("price_3");
const price_4 = document.getElementById("price_4");
const price_5 = document.getElementById("price_5");

const color_0 = document.getElementById("color_0");
const color_1 = document.getElementById("color_1");
const color_2 = document.getElementById("color_2");
const color_3 = document.getElementById("color_3");
const color_4 = document.getElementById("color_4");
const color_5 = document.getElementById("color_5");

const api = "https://jsonserver-vercel-api.vercel.app/products";

async function fetchAllProduct() {
  const response = await fetch(api);
  const products = await response.json();
  // console.log(products);
  return products;
}

const getAllProduct = async () => {
  const products = await fetchAllProduct();
  products.forEach((item) => {
    const str = renderProduct(item);
    tbody.innerHTML += str;
  });
};

function renderProduct(product) {
  const starRating = getStarRating(product.star);
  return `
      <div class="col-md-3 mb-4">
        <div class="card d-flex align-items-center pt-2" >
          <img src="${product.img}"  class="card-img-top" alt="${product.title}" width="20" height="100">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-star"><span class="star-rating">${starRating}</span> (${product.reviews} reviews)</p>
            <div class="d-flex align-items-center justify-content-between">
            <div>
            <del class="line-through me-2"> $${product.prevPrice}</del>
            <span>$${product.newPrice}</span>
            </div>
            <a href="#" class="icon" ><i class="fa-solid fa-cart-arrow-down"></i></a>
            </div>
          </div>
        </div>
      </div>
    `;
}

function getStarRating(stars) {
  const maxStars = 5;
  const fullStar = "★";
  // const halfStar = '☆';

  const fullStarsCount = Math.floor(stars);
  const hasHalfStar = stars % 1 !== 0;

  let starRating = "";

  for (let i = 0; i < fullStarsCount; i++) {
    starRating += fullStar;
  }

  if (hasHalfStar) {
    starRating += "";
  }

  for (let i = 0; i < maxStars - Math.ceil(stars); i++) {
    starRating += "";
  }

  return starRating;
}


search.addEventListener("input",filterProducts);

option5.addEventListener("change",filterProducts);
option6.addEventListener("change",filterProducts);
option7.addEventListener("change",filterProducts);
option8.addEventListener("change",filterProducts);
option9.addEventListener("change",filterProducts);

allRadioButton.addEventListener("change",filterProducts);
sneakersRadioButton.addEventListener("change", filterProducts);
sandalsRadioButton.addEventListener("change",filterProducts);
flatsRadioButton.addEventListener("change",filterProducts);
hellsRadioButton.addEventListener("change",filterProducts);
price_0.addEventListener("change", filterProducts);
price_1.addEventListener("change", filterProducts);
price_2.addEventListener("change", filterProducts);
price_3.addEventListener("change", filterProducts);
price_4.addEventListener("change", filterProducts);
color_0.addEventListener("change", filterProducts);
color_1.addEventListener("change", filterProducts);
color_2.addEventListener("change", filterProducts);
color_3.addEventListener("change", filterProducts);
color_4.addEventListener("change", filterProducts);
color_5.addEventListener("change", filterProducts);


async function filterProducts() {
  const category = getCategoryOption();
  const price = getPriceOption();
  const color = getColorOption();
  const searchTerm = searchProduct();
  const buttonOption=buttonProduct();

  const products = await fetchAllProduct();
  let filteredData = products;
  
  if (buttonOption) {
    filteredData = filteredData.filter((item) => item.company === buttonOption);
  }
 
  
  if (category) {
    filteredData = filteredData.filter((item) => item.category === category);
  }

  if (price) {
    if (Array.isArray(price)) {
      filteredData = filteredData.filter((item) => item.newPrice >= price[0] && item.newPrice < price[1]);
    } else {
      filteredData = filteredData.filter((item) => item.newPrice >= price);
    }
  }

  if (color) {
    filteredData = filteredData.filter((item) => item.color === color);
  }

  if (searchTerm) {
    filteredData = filteredData.filter((item) => item.title.toLowerCase().includes(searchTerm));
  }

  tbody.innerHTML = '';
  filteredData.forEach((item) => {
    const str = renderProduct(item);
    tbody.innerHTML += str;
  });
}

function getCategoryOption(){
  if(allRadioButton.checked){
    return null;
  }else if(sneakersRadioButton.checked){
    return "sneakers";
  }else if(sandalsRadioButton.checked){
    return "sandals"
  }else if(flatsRadioButton.checked){
    return "flats"
  }else if(hellsRadioButton.checked){
    return "heels"
  }
}

function getColorOption() {
  if (color_0.checked) {
    return null;
  } else if (color_1.checked) {
    return "black";
  }else if (color_2.checked) {
    return "blue";
  }else if (color_3.checked) {
    return "red";
  }else if (color_4.checked) {
    return "green";
  }else if (color_5.checked) {
    return "white";
  }
  
}

function getPriceOption() {
  if (price_0.checked) {
    return null; 
  } else if (price_1.checked) {
    return [0, 50]; 
  } else if (price_2.checked) {
    return [50, 100]; 
  }else if (price_3.checked) {
    return [100, 150]; 
  }else if (price_4.checked) {
    return [150, 500]; 
  }
}
function searchProduct(){
  const searchTerm = search.value.trim().toLowerCase(); 
  return searchTerm;
}

function buttonProduct(){
  if(option5.checked){
    return null;
  }
  if(option6.checked){
    return "Nike";
  }if(option7.checked){
    return "Adidas";
  }if(option8.checked){
    return "Puma";
  }if(option9.checked){
    return "Vans";
  }
}

// let selectedCompany = '';

// buttons.forEach((button) => {
//   button.addEventListener('click', () => {
//     buttons.forEach((btn) => {
//       btn.classList.remove('active');
//     });
//     button.classList.add('active');
//     selectedCompany = button.textContent.trim();

    
   
//     filterProductsByCompany(selectedCompany);
//   });
// });

// function filterProductsByCompany(selectedCompany) {
//   filterProducts(selectedCompany);
// }

getAllProduct();
