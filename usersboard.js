if (!localStorage.getItem('UserisLoggedIn')) {
    // If not logged in, redirect to the login page
    alert('Please login first.')
    window.location.href = 'login.html';
  } else {
    // Otherwise, show the logged-in content
    console.log('User is logged in');
  }

// // Create an order object
// const order = {
//     order_id: orders.length + 1,
//     userName: currentUser.userName,
//     productName: product.product_name,
//     productPrice: product.product_price,
//     quantity_bought: quantityToBuy,
//     buyed_at: new Date()
// };

// // Store the order in localStorage
// orders.push(order);
// localStorage.setItem('orders', JSON.stringify(orders));

// // Reduce the product quantity
// product.quantity -= quantityToBuy;

// let available_products = document.getElementById("available_products");
// let user_history = document.getElementById("user_history");
// let logout = document.getElementById("logout");

// available_products.addEventListener('click', function(){
//     window.location.href = "user_availableproducts.html"
// });

// user_history.addEventListener('click', function(){
//     window.location.href = "userhistory.html"
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