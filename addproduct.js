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
let quantity = document.getElementById('quantity');
let description = document.getElementById('description');
let image = document.getElementById('image');
let submit = document.getElementById('submit');

// Retrieve products array from localStorage (or initialize empty array if not available)
let products = JSON.parse(localStorage.getItem('products')) || [];

submit.addEventListener('click', function() {

    // Input validation
    if (name.value === '' || price.value === '' || quantity.value === '' || description.value === '') {
        alert('Please fill out all fields!');
        return;
    }
    else if (quantity.value <= 0) {
        alert('Invalid Quantity!');
        return;
    }
    else if (image.files.length === 0) {
        alert('Please select an image!');
        return;
    }
    else {
        let img = new FileReader();
        img.readAsDataURL(image.files[0]);
        img.onload = function() {
            // Create the product object
            let product = {
                product_id: products.length + 1,  // Generate unique ID based on array length
                product_name: name.value,
                product_price: price.value,
                quantity: quantity.value,
                description: description.value,
                image: img.result,
                status: 'AVAILABLE',
                created_at: new Date()
            };

            alert('Added successfully!');
            
            // Push the new product to the products array
            products.push(product);

            // Store the updated array in localStorage
            localStorage.setItem('products', JSON.stringify(products));

            // Clear the form
            name.value = '';
            price.value = '';
            quantity.value = '';
            description.value = '';
            image.value = '';  // Clear the file input
        };
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
