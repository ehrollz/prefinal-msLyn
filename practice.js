let name = document.getElementById('name');
let price = document.getElementById('price');
let submit = document.getElementById('submit');
let products = JSON.parse(localStorage.getItem('products')) || [];
const tableBody = document.getElementById('dataTable').querySelector('tbody');

// Get the modal and the content elements
const modal = document.getElementById('productModal');
const modalProductName = document.getElementById('modalProductName');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductQuantity = document.getElementById('modalProductQuantity');
const modalProductDescription = document.getElementById('modalProductDescription');

let filteredProducts = []; // Store filtered products separately

// Display available products
function display_availableproducts() {
    let results = products.filter(product => product.status === 'AVAILABLE');
    if (results.length <= 0) {
        alert('NO DATA SAVED YET!');
        return;
    }

    // Display the products
    results.forEach((product, index) => {
        let content = `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${product.image}" style="width: 50px; height: 50px;"></td>
                <td>${product.product_name}</td>
                <td>${product.product_price}</td>
                <td>${product.quantity}</td>
                <td>${product.description}</td>
                <td><button class="editBtn" data-index="${index}">SHOW</button></td>
                <td><button class="delete" data-index="${index}">BUY</button></td>
            </tr>
        `;
        tableBody.innerHTML += content;
    });
}

// Search function
submit.addEventListener('click', function () {
    tableBody.innerHTML = '';  // Clear the table body

    // Filter products based on search input
    filteredProducts = products.filter(product => product.status === 'AVAILABLE' &&
        (((product.product_name.toLowerCase().includes(name.value.toLowerCase())) &&
        (product.product_price.toLowerCase().includes(price.value.toLowerCase()))) || 
        (!name.value && (product.product_price.toLowerCase().includes(price.value.toLowerCase()))) ||
        (!price.value && (product.product_name.toLowerCase().includes(name.value.toLowerCase()))))
    );

    if (filteredProducts.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7">No matching properties found.</td></tr>';
    }

    // Display filtered results
    filteredProducts.forEach((product, index) => {
        let content = `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${product.image}" style="width: 50px; height: 50px;"></td>
                <td>${product.product_name}</td>
                <td>${product.product_price}</td>
                <td>${product.quantity}</td>
                <td>${product.description}</td>
                <td><button class="editBtn" data-index="${index}">SHOW</button></td>
                <td><button class="delete" data-index="${index}">BUY</button></td>
            </tr>
        `;
        tableBody.innerHTML += content;
    });
});

// Function to open the modal and display product details
function showProductDetails(index) {
    let product = products[index];  // Access product from filtered list

    modalProductName.textContent = product.product_name;
    modalProductImage.src = product.image;
    modalProductPrice.textContent = product.product_price;
    modalProductQuantity.textContent = product.quantity;
    modalProductDescription.textContent = product.description;

    // Display the modal
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = "none";
}

// Event listeners for the "SHOW" buttons
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('editBtn')) {
        const index = event.target.getAttribute('data-index');
        showProductDetails(index); // Show the product details from filteredProducts
    }
});

// Event listener for the close button inside the modal
document.querySelector('.closeBtn').addEventListener('click', closeModal);

// Close modal if clicked outside of the modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Call the function when the page loads
window.onload = display_availableproducts;
