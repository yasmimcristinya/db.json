document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/products")
      .then(response => response.json())
      .then(products => {
        const productsContainer = document.querySelector(".row.g-4");
  
        productsContainer.innerHTML = products.map(product => `
          <div class="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
            <div class="product-item text-center border h-100 p-4">
              <img class="custom-img" src="${product.image}" alt="${product.name}">
              <div class="mb-2">
                ${'<small class="fa fa-star text-primary"></small>'.repeat(product.rating)}
                <small>(${product.reviews})</small>
              </div>
              <a href="${product.url}" class="h6 d-inline-block mb-2">${product.name}</a>
              <h5 class="text-primary mb-3">R$ ${product.price.toFixed(2)}</h5>
              <a href="carrinho.html" class="btn btn-outline-primary px-3">Adicionar ao carrinho</a>
            </div>
          </div>
        `).join('');
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  });

  class ProductItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set product(data) {
        this.shadowRoot.innerHTML = `
            <style>
                .product-item {
                    text-align: center;
                    border: 1px solid #ddd;
                    padding: 16px;
                    border-radius: 4px;
                }
                .product-item img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin-bottom: 8px;
                }
                .product-item h5 {
                    color: #007bff;
                }
            </style>
            <div class="product-item">
                <img src="${data.image}" alt="${data.name}">
                <div class="mb-2">
                    ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}
                    <small>(${data.reviews})</small>
                </div>
                <a href="${data.link}" class="h6 d-inline-block mb-2">${data.name}</a>
                <h5 class="text-primary mb-3">R$ ${data.price.toFixed(2)}</h5>
                <a href="carrinho.html" class="btn btn-outline-primary px-3">Adicionar ao carrinho</a>
            </div>
        `;
    }
}

customElements.define('product-item', ProductItem);

customElements.define('custom-img', CustomImage);
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.row.g-4');

    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            data.products.forEach(product => {
                const productElement = document.createElement('product-item');
                productElement.product = product; // Passa os dados do produto para o custom element
                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));

        document.addEventListener('DOMContentLoaded', () => {
            const productsContainer = document.querySelector('.row.g-4');
        
            fetch('db.json')
                .then(response => response.json())
                .then(data => {
                    data.products.forEach(product => {
                        const productElement = document.createElement('product-item');
                        productElement.product = {
                            id: product.id,
                            image: product.image,
                            name: product.name,
                            rating: product.rating,
                            reviews: product.reviews,
                            price: product.price
                        };
                        productsContainer.appendChild(productElement);
                    });
                })
                .catch(error => console.error('Erro ao carregar produtos:', error));
        });
});