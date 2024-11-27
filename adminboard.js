
if (!localStorage.getItem('AdminisLoggedIn')) {
    // If not logged in, redirect to the login page
    alert('Please login first.')
    window.location.href = 'login.html';
  } else {
    // Otherwise, show the logged-in content
    console.log('User is logged in');
  }

// let user_management = document.getElementById('user_management');
// let add_product = document.getElementById('add_product');
// let available_products = document.getElementById('available_products');
// let sold_products = document.getElementById('sold_products');
// let all_products = document.getElementById('all_products');
// let all_orders = document.getElementById('all_orders');
// let logout = document.getElementById('logout');


// user_management.addEventListener('click', function(){
//     window.location.href = "usermanagement.html";
// });

// add_product.addEventListener('click', function(){
//     window.location.href = "addproduct.html";
// });

// available_products.addEventListener('click', function(){
//     window.location.href = "availableproducts.html";
// });

// sold_products.addEventListener('click', function(){
//     window.location.href = "soldproducts.html";
// });

// all_products.addEventListener('click', function(){
//     window.location.href = "allproducts.html";
// });

// all_orders.addEventListener('click', function(){
//     window.location.href = "allorders.html";
// });

// logout.addEventListener('click', function(){
//     const userConfirmed = confirm(`Do you want to logout?`);
//     if (userConfirmed) {
//         localStorage.removeItem('UserisLoggedIn');
//         localStorage.removeItem('currentUser');
//         localStorage.removeItem('AdminisLoggedIn');
//         window.location.href = "login.html";}
//     else{
//         ('Logout cancelled.');
//     };
    
// });

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
