if (!localStorage.getItem('AdminisLoggedIn')) {
    // If not logged in, redirect to the login page
    alert('Please login first.')
    window.location.href = 'login.html';
  } else {
    // Otherwise, show the logged-in content
    console.log('User is logged in');
  }

let name = document.getElementById('name');
let price = document.getElementById('price');
let submit = document.getElementById('submit');
let products = JSON.parse(localStorage.getItem('products')) || [];
const tableBody = document.getElementById('dataTable').querySelector('tbody');

document.addEventListener('DOMContentLoaded', display_availableproducts);

//DISPLAY DATA
function display_availableproducts() {
    let results = products.filter(product => product.status === 'AVAILABLE');
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
            </div>
        `;
        tableBody.innerHTML += content;
    });


if(results <= 0) {
    // If no data is found in localStorage, show the default message
    alert('NO DATA SAVED YET!');
}
};

// SEARCH FUNCTION
submit.addEventListener('click', function () {
    tableBody.innerHTML = '';
    let results = products.filter(product => product.status === 'AVAILABLE' &&
        (((product.product_name.toLowerCase() === name.value.toLowerCase()) &&
        (product.product_price.toLowerCase() === price.value.toLowerCase())) || 
        (!name.value && (product.product_price.toLowerCase() === price.value.toLowerCase())) ||
        (!price.value && (product.product_name.toLowerCase() === name.value.toLowerCase())))
    );

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
            </div>
        `;

        tableBody.innerHTML += content;
    }

        
);  

        if((results.length === 0)) {
            tableBody.innerHTML = '<p>No matching properties found.</p>';
        }
});

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