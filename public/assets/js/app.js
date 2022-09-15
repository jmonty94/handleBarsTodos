const usernameInput = document.getElementById(`username`);
const passwordInput = document.getElementById(`passwordInput`);
const signUpBtn = document.getElementById(`signUpBtn`);


signUpBtn.addEventListener(`click`, async (event) => {
    event.preventDefault();
    console.log(`We out here breh`);
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (username.trim().length === 0) {
        alert('Please Enter a valid username');
        return;
    }
    if (password.trim().length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    try {
        const response = await fetch(`/api/signup`, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            })
        })
        window.location.href = '/users';
        console.log(user);
    } catch (error) {
        console.error({ error });
    }

});