import axios from "axios";

export async function registerUser(user) {
    return await axios.post('http://localhost:8080/api/v1/user/register', user);
}

export async function loginUser({username, password}) {
    return await axios.post('http://localhost:8080/api/v1/auth/login', {username, password});

}

export async function getPlansApi() {
    return await axios.get("http://localhost:8080/api/v1/plans/getPlans", getAuthorizationToken());
}

export function logoutUser() {
    localStorage.clear();
}

export async function getUserFromToken() {
    const authorizationHeader = getAuthorizationToken();
    if(authorizationHeader){
        return await axios.get("http://localhost:8080/api/v1/user/getUser", authorizationHeader);
    } else {
        return null;
    }
    
}

export async function addPlanToCart({planId, userId}) {
    const authorizationHeader = getAuthorizationToken();
    if(authorizationHeader){
        return await axios.post(`http://localhost:8080/api/v1/user/addPlanToCart?userId=${userId}&planId=${planId}`, {}, authorizationHeader);
    } else {
        return null;
    }
}

export async function removePlanFromCart({planId, userId}) {
    const authorizationHeader = getAuthorizationToken();
    if(authorizationHeader){
        return await axios.post(`http://localhost:8080/api/v1/user/removePlanFromCart?userId=${userId}&planId=${planId}`, {}, authorizationHeader);
    } else {
        return null;
    }
}

function getAuthorizationToken() {
    const token = localStorage.getItem("token");
    if(token) {
        return {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }
    }
    else return null;
    
}

export async function isAuthenticated() {
    return await axios.post("http://localhost:8080/api/v1/auth/verifyToken", localStorage.getItem("token"))
}

export function verifyUserEmail() {

}

export function setSession(user, token) {
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('token', token);
}