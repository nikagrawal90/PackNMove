import { registerUser } from "../auth/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
 
  function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const user = {
      name: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    registerUser(user).then(response => {
        if(response && response.ok() && response.user != null && response.user.userId != null){
            return navigate("/success");
        }
        else {
          throw new Error({"message": "User Not registered"});
        }
    }).catch(error => {
        console.log(error);
        navigate('/error');
    })
  }
 
  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;