const tbody = document.querySelector("#bodyProduct");

async function fetchAllProduct() {
  const response = await fetch("https://jsonserver-vercel-api.vercel.app/products");
  const products = await response.json();
  console.log(products);
  return products;
}

const getAllProduct = async () => {
  const products = await fetchAllProduct();

  products.forEach((item) => {
    const str = renderProduct(item);
    console.log(str);
    tbody.innerHTML += str;
  });

  function renderProduct(product) {
    const starRating = getStarRating(product.star);
    return `
      <div class="col-md-3 mb-4 products">
        <div class="card" style="width: 18rem;">
          <img src="${product.img}"  class="card-img-top" alt="${product.title}" width="200" height="100">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-star"><span class="star-rating">${starRating}</span> (${product.reviews} reviews)</p>
            <p class="card-text">$${product.prevPrice} $${product.newPrice}</p>
            <a href="#"><i class="fa-solid fa-cart-arrow-down"></i></a>
          </div>
        </div>
      </div>
    `;
  }
};

function getStarRating(stars) {
    const maxStars = 5;
    const fullStar = '★';
    const halfStar = '☆';
  
    const fullStarsCount = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;
  
    let starRating = '';
  
    for (let i = 0; i < fullStarsCount; i++) {
      starRating += fullStar;
    }
  
    if (hasHalfStar) {
      starRating += halfStar;
    }
  
    for (let i = 0; i < maxStars - Math.ceil(stars); i++) {
      starRating += halfStar;
    }
  
    return starRating;
  }

getAllProduct();