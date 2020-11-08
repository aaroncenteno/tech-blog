async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const notFound = document.querySelector('#not-found');

    if (username && password) {
        const getUsers = await fetch('/api/users').then(
            function(response) {
                response.json().then(function(data) {
                    for (let i = 0; i < data.length; i++) {
                        if(username != data[i].username) {
                            notFound.classList.remove('hide');
                            return;
                        }
                    }
                })
            }
        );

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
            // alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);