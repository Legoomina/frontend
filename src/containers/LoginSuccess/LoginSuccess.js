import { useContext } from "react"
import { Navigate } from "react-router-dom"
import UserContext from "../../context/UserContext"

import useLocalStorage from "use-local-storage";

const LoginSuccess = () => {
    const params = new URLSearchParams(window.location.search)

    const { setUser } = useContext(UserContext)

    const [, setTokens] = useLocalStorage("tokens")

    // setTokens({
    //     accessToken: params.get("accessToken"),
    //     refreshToken: params.get("refreshToken"),
    // })

    setUser((prev) => ({
        ...prev,
        accessToken: params.get("accessToken"),
        refreshToken: params.get("refreshToken"),
        isUserLoaded: false
    }))

    return (
        <Navigate 
            to="/"
        />
    )
}

export default LoginSuccess