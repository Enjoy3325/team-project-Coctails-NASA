export function getAuthForm() {
  return ` <form class='auth-form login' id="auth-form">
        <div class='auth-form__item'>
          <label class='auth-form__label' for='login_email'>E-mail</label>
          <input class='auth-form__input'
                 type='email'
                 name='e-mail'
                 id='login_email'
                 placeholder='example@gmail.com'
                 required>
          <div class='error-group'>
            <p class='error'>Please enter a valid email address</p>
          </div>
          <div class='req-error-group'>
            <p class='req-error'>This field is required</p>
          </div>
        </div>
        <div class='auth-form__item'>
          <label class='auth-form__label' for='login_password'>Password</label>
          <input class='auth-form__input'
                 type='password' name='password' id='login_password'
                 minlength='6'
                 placeholder='Your password' required>
          <div class='error-group'>
            <p class='error'>The password must be more than 6 characters</p>
          </div>
          <div class='req-error-group'>
            <p class='req-error'>This field is required</p>
          </div>
          <div class='auth-form__item'>
          </div>
        </div>
        <button type='submit' class='auth-form__button'>
          <span>Login</span>
        </button>

      </form>`;
}

export function authWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyD79-omqaLtvu66EEQJ3kKALZdvvly4S9k';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then(response => response.json())
    .then(response => {
      console.log(response);
      return response;
    });
}
