import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import axios from "axios";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Container from "@mui/material/Container";
import SignIn from "./containers/SignIn/SignIn";

import UserContext from "./context/UserContext";
import LoginSuccess from "./containers/LoginSuccess/LoginSuccess";

import { axiosConfig } from "./utils/axiosConfig";
import Menu from "./Menu/Menu";
import Register from "./containers/Register/Register";

const App = () => {
    const theme = createTheme();
    const [accessTokenLS, setAccessTokenLS] = useLocalStorage(
        "accessToken",
        ""
    );
    const [refreshTokenLS, setRefreshTokenLS] = useLocalStorage(
        "refreshToken",
        ""
    );

    const [user, setUser] = useState({
        isLoggedIn: false,
        isStudent: false,
        isTeacher: true,
        accessToken: accessTokenLS || null,
        refreshToken: refreshTokenLS || null,
        firstName: null,
        lastName: null,
        id: null,
        email: null,
        avatar: null,
        location: null,
    });

    useEffect(() => {
        if (user.accessToken) {
            setAccessTokenLS(user.accessToken);
        }

        if (user.refreshToken) {
            setRefreshTokenLS(user.refreshToken);
        }
    }, [user.accessToken, user.refreshToken]);

    useEffect(() => {
        if (!user.isUserLoaded && user.accessToken) {
            axios
                .get(
                    process.env.REACT_APP_API_URL + "/api/user",
                    axiosConfig(user.accessToken)
                )
                .then((res) => {
                    console.log(res.data);
                    setUser((prev) => ({
                        ...prev,
                        isLoggedIn: true,
                        email: res.data.email,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        avatar: res.data.avatar,
                        id: res.data.id,
                        location: res.data.location,
                    }));
                });
        }
    }, [accessTokenLS]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/login" element={<SignIn />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route
                        path="/login/success"
                        element={<LoginSuccess />}
                    ></Route>
                    <Route path="/" element={<Menu></Menu>}></Route>
                </Routes>
            </ThemeProvider>
        </UserContext.Provider>
    );
};

export default App;
