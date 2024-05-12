import  { redirect } from 'react-router-dom'
import { isAuthenticated } from "./auth";


const authMiddleware = (store) => (next) => (action) => {
    console.log("action", action);
    // if(isAuthenticated()){
    //     console.log("authenticated");
    //     next(action);
    // } else {
    //     console.log("redirecting");
    //     return redirect('/login');
    // }
    next(action);
  };

export {authMiddleware};