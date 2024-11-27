
if (!localStorage.getItem('UserisLoggedIn')) {
    // If not logged in, redirect to the login page
    alert('Please login first.')
    window.location.href = 'login.html';
  } else {
    // Otherwise, show the logged-in content
    console.log('User is logged in');
  }

let products = JSON.parse(localStorage.getItem('products')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
const tableBody = document.getElementById('dataTable').querySelector('tbody');

// Get the modal and the content elements
const modal = document.getElementById('productModal');
const modalProductName = document.getElementById('modalProductName');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductQuantity = document.getElementById('modalProductQuantity');
const modalProductDescription = document.getElementById('modalProductDescription');


//DISPLAY DATA
function display_availableproducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let results = products.filter(product => product.status === 'AVAILABLE');
    // Update the products array in localStorage
    results.forEach((product, index) => {
        let content = `
            <div>
                <td>${product.product_id}</td>
                <td><img src="${product.image}" style="width: 50px; height: 50px;"></td>
                <td>${product.product_name}</td>
                <td>${product.product_price}</td>
                <td>${product.quantity}</td>
                <td>${product.description}</td>
                <td>${product.edited_at}</td>
                <td>${product.created_at}</td>
                <td>${product.status}</td>
                <td>
                <button class="editBtn" data-index="${index}">SHOW</button>
                <button class="delete" data-index="${index}">BUY</button>
                </td>
            </div>
        `;
        tableBody.innerHTML += content;
    });


if(results <= 0) {
    // If no data is found in localStorage, show the default message
    alert('NO DATA SAVED YET!');
}
};

// Function to open the modal and display product details
function showProductDetails(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.status === 'AVAILABLE'); // Ensure only AVAILABLE products

    const product = products[index];
    // Populate modal with product details
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
        showProductDetails(index);
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

function buyProduct(index) {
    // Get the products and users from localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    products = products.filter(product => product.status === 'AVAILABLE'); // Ensure only AVAILABLE products



    // Get the selected product
    const product = products[index];

    // Confirm the purchase with the user
    const userConfirmed = confirm(`Do you want to buy the product: ${product.product_name}?`);

    if (userConfirmed) {
        // Get the quantity to buy from the user
        let quantityToBuy = prompt(`How many units of ${product.product_name} do you want to buy?`);
        
        // Ensure the quantity is a valid number
        quantityToBuy = parseInt(quantityToBuy);
        if (isNaN(quantityToBuy) || quantityToBuy <= 0 || quantityToBuy > product.quantity) {
            alert('Invalid quantity!');
            return;
        }

        // Create an order object
        const order = {
            order_id: orders.length + 1,
            userName: currentUser.userName,
            productName: product.product_name,
            productPrice: product.product_price,
            quantity_bought: quantityToBuy,
            bought_at: new Date()
        };

        // Store the order in localStorage
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Reduce the product quantity
        product.quantity -= quantityToBuy;

        // If the product's quantity becomes zero or less, set status to 'SOLD'
        if (product.quantity <= 0) {
            product.status = 'SOLD';
            product.sold_at = new Date(); // Mark the sold date
        }

        // Store the updated products list back in localStorage
        let allProducts = JSON.parse(localStorage.getItem('products')) || [];
        const productIndex = allProducts.findIndex(p => p.product_id === product.product_id);
        if (productIndex !== -1) {
            allProducts[productIndex] = product; // Update the product in the list
            localStorage.setItem('products', JSON.stringify(allProducts)); // Save back to localStorage
        }

        // Show a success message
        alert(`Thank you for your purchase, ${currentUser.userName}! You've bought ${quantityToBuy} of ${product.product_name}.`);

        // Optionally, re-display the available products
        tableBody.innerHTML = ''; // Clear the table to force a re-render

        // Re-display available products after purchase
        display_availableproducts(); // Re-render the products table with updated data;



    } else {
        alert('Purchase cancelled.');
    }
}



// Event listeners for the "BUY" buttons
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const index = event.target.getAttribute('data-index');
        buyProduct(index); // Call the buyProduct function when the "BUY" button is clicked
    }
});


// Call the function when the page loads
window.onload = display_availableproducts;

function logOut(){
    const userConfirmed = confirm(`Do you want to logout?`);
    if (userConfirmed) {
        localStorage.removeItem('UserisLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('AdminisLoggedIn');
        window.location.href = "login.html";}
    else{
        ('Logout cancelled.');
    };
}


