if (!localStorage.getItem('AdminisLoggedIn')) {
    // If not logged in, redirect to the login page
    alert('Please login first.')
    window.location.href = 'login.html';
  } else {
    // Otherwise, show the logged-in content
    console.log('User is logged in');
  }
    
    const tableBody = document.getElementById('dataTable').querySelector('tbody');

// Function to read array from localStorage and display it in a table
function loadArrayFromLocalStorage() {
    
    // Retrieve the stored string from localStorage and parse it into an array, default to an empty array if not found
    const storedData = JSON.parse(localStorage.getItem('products')) || [];

    // Check if data exists in localStorage
    if (storedData.length > 0) {

        // Create table rows for each user
        storedData.forEach((product, index) => {
            const newRow = document.createElement('tr');

            // Create table cells for each property of the user object
            newRow.innerHTML = `
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
                <button class="editBtn" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;

            // Append the new row to the table body
            tableBody.appendChild(newRow);
        });

        // Attach event listeners to all delete buttons
        const deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const userIndex = button.getAttribute('data-index');
                deleteUser(userIndex);
            });
        });

        // Attach event listeners to all edit buttons
        const editButtons = document.querySelectorAll('.editBtn');
        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                const userIndex = button.getAttribute('data-index');
                editUser(userIndex);
            });
        });
    } else {
        // If no data is found in localStorage, show the default message
        alert('NO DATA SAVED YET!');
    }
}

// Function to edit user data
function editUser(index) {
    const storedData = JSON.parse(localStorage.getItem('products')) || [];

    const product = storedData[index]; // Get the user to edit

    // Populate the edit form (create a simple form for editing)
    const editForm = `
    <div class="editForm">
        <h3>EDIT PRODUCT</h3>
        <label>IMAGE: <input type="file" id="editImage"></label><br>
        <label>ID: <input type="text" id="editProductID" value="${product.product_id}" disabled></label><br>
        <label>NAME: <input type="text" id="editName" value="${product.product_name}"></label><br>
        <label>PRICE: <input type="number" id="editPrice" value="${product.product_price}"></label><br>
        <label>QUANTITY: <input type="number" id="editQuantity" value="${product.quantity}"></label><br>
        <label>DESCRIPTION: <input type="text" id="editDescription" value="${product.description}"></label><br>
        <label>STATUS: <input type="text" id="editStatus" value="${product.status}" disabled></label><br>
        <label>CREATED_AT: <input type="text" id="editCreatedAt" value="${product.created_at}" disabled></label><br>
        <label>EDITED_AT: <input type="text" id="editEditedAt" value="${product.edited_at}" disabled></label><br>
        <button id="saveEditBtn">SAVE CHANGES</button>
        <button id="cancelEditBtn">CANCEL</button>
        </div>
        
    `;

    storedData.splice(index, 1);

    // Show the edit form
    const editContainer = document.getElementById('editContainer');
    editContainer.innerHTML = editForm;
    let image = document.getElementById('editImage');

    // Save button functionality
    document.getElementById('saveEditBtn').addEventListener('click', function () {
        //input all fields
    if(editName.value === '' || editPrice.value === '' || editQuantity.value === '' || editDescription.value === '') {
        alert('Please fill out all fields!');
        return; }
        
    
    else if (image.files.length === 0) {
            alert('Please select an image!');
            return;
        }
        // Get the updated values from the form
    else{``
    let img = new FileReader();
    img.readAsDataURL(image.files[0]);
    img.onload =  function(){
        const updatedUser = {
            image: img.result,
            product_id: document.getElementById('editProductID').value,
            product_name: document.getElementById('editName').value,
            product_price: document.getElementById('editPrice').value,
            quantity: document.getElementById('editQuantity').value,
            description: document.getElementById('editDescription').value,
            status: document.getElementById('editStatus').value,
            created_at: document.getElementById('editCreatedAt').value,
            edited_at: new Date()
        }

        // Update the user data in the array
        storedData.push(updatedUser);

        // Save the updated array back to localStorage
        localStorage.setItem('products', JSON.stringify(storedData));

        // Reload the table to reflect the changes
        tableBody.innerHTML = '';
        loadArrayFromLocalStorage();

        // Clear the edit form
        editContainer.innerHTML = '';

    };
    }});

    // Cancel button functionality
    document.getElementById('cancelEditBtn').addEventListener('click', function () {
        // Clear the edit form
        editContainer.innerHTML = '';
    });
    
}

// Function to delete a user from localStorage
function deleteUser(index) {
    const product = JSON.parse(localStorage.getItem('products')) || [];
    
    // Remove the user at the given index
    product.splice(index, 1);

    // Save the updated users array back to localStorage
    localStorage.setItem('products', JSON.stringify(product));

    // Reload the table to reflect the changes
    tableBody.innerHTML = '';
    loadArrayFromLocalStorage();
    
}
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



