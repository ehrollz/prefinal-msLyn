if (!localStorage.getItem('AdminisLoggedIn')) {
    // If not logged in, redirect to the login page
    alert('Please login first.')
    window.location.href = 'login.html';
  } else {
    // Otherwise, show the logged-in content
    console.log('User is logged in');
  }

// Function to read array from localStorage and display it in a table
function loadArrayFromLocalStorage() {
    // Retrieve the stored string from localStorage and parse it into an array, default to an empty array if not found
    const storedData = JSON.parse(localStorage.getItem('users')) || [];

    let number = 1;  // Start the numbering from 1

    // Get the table body element
    const tableBody = document.getElementById('dataTable').querySelector('tbody');

    // Check if data exists in localStorage
    if (storedData.length > 0) {
        // Clear the current table row
        tableBody.innerHTML = ''; // Clear previous content

        // Create table rows for each user
        storedData.forEach((user, index) => {
            const newRow = document.createElement('tr');

            // Create table cells for each property of the user object
            newRow.innerHTML = `
                <td>${user.user_id}</td>
                <td>${user.username}</td>
                <td>${user.password}</td>
                <td>${user.email}</td>
                <td>${user.created_at}</td>
                <td>${user.last_login}</td>
                <td>${user.edited_at}</td>
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
        tableBody.innerHTML = '<tr><td colspan="8">No data saved yet.</td></tr>';
    }
}

// Function to edit user data
function editUser(index) {
    const storedData = JSON.parse(localStorage.getItem('users')) || [];

    const user = storedData[index]; // Get the user to edit

    // Populate the edit form (create a simple form for editing)
    const editForm = `
    <div class="editForm">
        <h3>EDIT USER</h3>
        <label>ID: <input type="text" id="editUserID" value="${user.user_id}" disabled></label><br>
        <label>USERNAME: <input type="text" id="editUsername" value="${user.username}"></label><br>
        <label>PASSWORD: <input type="text" id="editPassword" value="${user.password}"></label><br>
        <label>EMAIL: <input type="email" id="editEmail" value="${user.email}"></label><br>
        <label>CREATED_AT: <input type="text" id="editCreatedAt" value="${user.created_at}" disabled></label><br>
        <label>LAST_LOGIN: <input type="text" id="editLastLogin" value="${user.last_login}" disabled></label><br>
        <label>EDITED_AT: <input type="text" id="editEditedAt" value="${user.edited_at}" disabled></label><br>
        <button id="saveEditBtn">SAVE CHANGES</button>
        <button id="cancelEditBtn">CANCEL</button>
        </div>
        
    `;

    // Show the edit form
    const editContainer = document.getElementById('editContainer');
    editContainer.innerHTML = editForm;

    // Save button functionality
    document.getElementById('saveEditBtn').addEventListener('click', function () {
        // Get the updated values from the form
        const updatedUser = {
            user_id: document.getElementById('editUserID').value,
            username: document.getElementById('editUsername').value,
            password: document.getElementById('editPassword').value,
            email: document.getElementById('editEmail').value,
            created_at: document.getElementById('editCreatedAt').value,
            last_login: document.getElementById('editLastLogin').value,
            edited_at: new Date()
        };

        // Update the user data in the array
        storedData[index] = updatedUser;

        // Save the updated array back to localStorage
        localStorage.setItem('users', JSON.stringify(storedData));

        // Reload the table to reflect the changes
        loadArrayFromLocalStorage();

        // Clear the edit form
        editContainer.innerHTML = '';
    });

    // Cancel button functionality
    document.getElementById('cancelEditBtn').addEventListener('click', function () {
        // Clear the edit form
        editContainer.innerHTML = '';
    });
}

// Function to delete a user from localStorage
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Remove the user at the given index
    users.splice(index, 1);

    // Save the updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Reload the table to reflect the changes
    loadArrayFromLocalStorage();

    editContainer.innerHTML = '';
    
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