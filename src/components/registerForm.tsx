const RegisterForm = () => {
  return (
  <>
          <h1>Login</h1>
          <form onSubmit={ handleSubmit }>
               <div>
                   <label htmlFor="UserWithLevelname">Username</label>
                  <input
                      name="username"
                      type="text"
                      id="UserWithLevelname"
                      onChange={ handleInputChange }
                      autoComplete="username"
                  />
              </div>
              <div>
                  <label htmlFor="loginpassword">Password</label>
                   <input
                      name="password"
                      type="password"
                      id="loginpassword"
                      onChange={ handleInputChange}
                      autoComplete="current-password"
                  />
              </div>
              <button type="submit">Login</button>
          </form>
      </>
  )
}

export default RegisterForm;
