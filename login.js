if (localStorage.getItem('UserisLoggedIn')) {
    // If not logged in, redirect to the login page
    alert('Please logout first.')
    window.location.href = 'usersboard.html';
  } else if((localStorage.getItem('AdminisLoggedIn'))) {
    // Otherwise, show the logged-in content
    alert('Please logout first.')
    window.location.href = 'adminboard.html';
  } else {
    console.log('Already logged in');
  };

let username = document.getElementById("username");
let password = document.getElementById("password");
let submit = document.getElementById("submit");
let allUsers = JSON.parse(localStorage.getItem('users')) || [];

submit.addEventListener('click', function(event) {
    event.preventDefault();

    // Admin credentials
    const adminUsername = "ehrollz";
    const adminPassword = "12345678";
    // Check if the user exists
    const user = allUsers.find(user => user.username === username.value && user.password === password.value);

    // Check if the user is admin
    if (username.value === adminUsername && password.value === adminPassword) {
        localStorage.setItem('AdminisLoggedIn', 'true');
        alert('Admin login successful!');
        window.location.href = "adminboard.html"
    }
    else if(user){

        // Update the lastLogin field to the current date and time
        user.last_login = new Date();
        // Save the updated users array back to localStorage
        localStorage.setItem('users', JSON.stringify(allUsers));

        // Successful user login
        localStorage.setItem('UserisLoggedIn', 'true');
        alert('Login successful!');
        window.location.href = 'usersboard.html';

              // Create an order object
              const currentUser = {
                userName: user.username
         };
         // Store the order in localStorage
         let current = JSON.parse(localStorage.getItem('currentUser')) || [];
         current.push(currentUser);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

    }else{
        // Login failed
        alert('Invalid username or password! Please try again.');
    }
});

