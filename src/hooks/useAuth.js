import { useSelector } from "react-redux";

export function useAuth() {
    const {email, token, id} = useSelector(state => state.user);

    //const localToken = localStorage.getItem('token');
    
    return {
        isAuth: (email === null ? false : true),
        email, 
        token, 
        id
    };
}