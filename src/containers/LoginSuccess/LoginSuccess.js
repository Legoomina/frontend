import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const LoginSuccess = () => {
    const params = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    setUser((prev) => ({
        ...prev,
        accessToken: params.get("accessToken"),
        refreshToken: params.get("refreshToken"),
        isUserLoaded: false,
    }));

    navigate("/");
};

export default LoginSuccess;
