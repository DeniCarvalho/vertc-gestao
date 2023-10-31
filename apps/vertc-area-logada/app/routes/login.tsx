export default function Login() {
  // login page
  return (
    <div>
      <h1>Login</h1>
      <form action="/login" method="post">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
