import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { loginUser } from "../auth/auth";
import { login } from "../states/slices/userSlice";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    return loginUser({username, password}).then(response => {
      dispatch(login(response.data));
      return navigate("/dashboard")
    }).catch(error => {
      console.log(error)
      return navigate("/error")
    });
    
  }
 
  return (
    <div className="min-h-screen">
      <Link to="/register">If you are not registered click here</Link>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;