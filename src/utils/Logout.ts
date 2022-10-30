import {useHistory} from "react-router-dom";
import {useContext} from "react";
import {TokenContext} from "../loginContext";

const useLogout = () => {
    const history = useHistory();
    const {token, setToken} = useContext(TokenContext);
    return function logout() {
        setToken("");
        history.push("/login");
    }
};

export default useLogout;