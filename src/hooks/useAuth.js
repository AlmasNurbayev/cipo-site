import { useSelector } from "react-redux";

export function useAuth() {
    let {email, token, id} = useSelector(state => state.user);

    if (!email) {
       email = localStorage.getItem("email");
       token = localStorage.getItem("token")          
    }

    //const localToken = localStorage.getItem('token');
    
    return {
        isAuth: (email === null ? false : true),
        email, 
        token, 
        id
    };
}