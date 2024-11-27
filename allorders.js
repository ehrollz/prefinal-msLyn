if (!localStorage.getItem('AdminisLoggedIn')) {
    // If not logged in, redirect to the login page
    alert('Please login first.')
    window.location.href = 'login.html';
  } else {
    // Otherwise, show the logged-in content
    console.log('User is logged in');
  }

const tableBody = document.getElementById('dataTable').querySelector('tbody');
let name = document.getElementById('name');
let price = document.getElementById('price');
let quantity = document.getElementById('quantity');
let user = document.getElementById('user');
let submit = document.getElementById('submit');

// Function to read array from localStorage and display it in a table
function loadArrayFromLocalStorage() {

// Retrieve the stored string from localStorage and parse it into an array, default to an empty array if not found
const storedData = JSON.parse(localStorage.getItem('orders')) || [];

// Check if data exists in localStorage
if (storedData.length > 0) {

    // Create table rows for each user
    storedData.forEach((order, index) => {
        const newRow = document.createElement('tr');

        // Create table cells for each property of the user object
        newRow.innerHTML = `
            <td>${order.order_id}</td>
            <td>${order.productName}</td>
            <td>${order.productPrice}</td>
            <td>${order.quantity_bought}</td>
            <td>${order.userName}</td>
        `;

        // Append the new row to the table body
        tableBody.appendChild(newRow);
    });
} else {
    // If no data is found in localStorage, show the default message
    alert('NO DATA SAVED YET!');
}
}

// SEARCH FUNCTION
submit.addEventListener('click', function () {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    tableBody.innerHTML = '';
    let results = orders.filter(order => {
        const isNameMatch = name.value.toLowerCase() === order.productName.toLowerCase();
        const isPriceMatch = price.value === order.productPrice;
        const isQuantityMatch = Number(quantity.value) === order.quantity_bought;
        const isUserMatch = user.value.toLowerCase() === order.userName.toLowerCase();
      
        return (
          // All fields match
          (isNameMatch && isPriceMatch && isQuantityMatch && isUserMatch) || 
      
          // Only user match
          (!name.value && !price.value && !quantity.value && isUserMatch) ||
      
          // Only quantity match
          (!name.value && !price.value && !user.value && isQuantityMatch) ||
      
          // Only price match
          (!name.value && !quantity.value && !user.value && isPriceMatch) ||
      
          // Only name match
          (!price.value && !quantity.value && !user.value && isNameMatch)
        );
      });
      
    results.forEach((order, index) => {
        let content = `
            <div>
                <td>${order.order_id}</td>
                <td>${order.productName}</td>
                <td>${order.productPrice}</td>
                <td>${order.quantity_bought}</td>
                <td>${order.userName}</td>
            </div>
        `;

        tableBody.innerHTML += content;
    }

        
);  

        if((results.length === 0)) {
            tableBody.innerHTML = '<p>No matching properties found.</p>';
        }
});

// Call the function when the page loads
window.onload = loadArrayFromLocalStorage;

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



