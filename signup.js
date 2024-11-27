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

let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let submit = document.getElementById('submit');
let users = JSON.parse(localStorage.getItem('users')) || [];

submit.addEventListener('click', function(event) {
    event.preventDefault();

    //no input at all
    if(email.value === '' && username.value === '' && password.value === '') {
        alert('Please fill out all fields!');
        return;
    }
    //no user and email
    else if(email.value === '' && username.value === '') {
        alert('Please input username and email!');
        return;
    }
    //no user and password
    else if(password.value === '' && username.value === '') {
        alert('Please input username and password!');
        return;
    }
    //no email and password
    else if(password.value === '' && email.value === '') {
        alert('Please input email and password!');
        return;
    }
    //no user
    else if(username.value === '') {
        alert('Please input username!');
        return;
    }
    //no email
    else if(email.value === '') {
        alert('Please input email!');
        return;
    }
    //no password
    else if(password.value === '') {
        alert('Please input password!');
        return;
    }

    //check if user already exist
    const userExist = users.some(user => user.username === username.value);
    if(userExist){
      alert('User already exist. Please try again.')
      return;
    }
    //check if email already exist
    const emailExist = users.some(user => user.email === email.value);
    if(emailExist){
      alert('Email already exist. Please try again.')
      return;
    }

    

    let account = {
        user_id: users.length + 1,
        username: username.value,
        email: email.value,
        password: password.value,
        created_at: new Date()
    };
    alert('Registered successfully!');
    users.push(account);
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = "login.html";
});

