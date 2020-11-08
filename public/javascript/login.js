async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const takenUsername = document.querySelector('#taken');
    
    if (username && password) {
        // get all users and compare username
        const getUsers = await fetch('/api/users').then(
            function(response) {
                response.json().then(function(data) {
                    for (let i = 0; i < data.length; i++) {
                        if(username === data[i].username) {
                            // alert('That username is already taken! Please try again.');
                            takenUsername.classList.remove('hide');
                            return;
                        }
                    }
                })
            }
        );

        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            console.log('success');
            takenUsername.classList.add('hide');
            document.location.replace('/dashboard');

         } else {
            console.log(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);


async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);