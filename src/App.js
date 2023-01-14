import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import axios from "axios"

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Container from "@mui/material/Container";
import SignIn from "./containers/SignIn/SignIn";

import UserContext from "./context/UserContext";
import LoginSuccess from "./containers/LoginSuccess/LoginSuccess";

import { axiosConfig } from "./utils/axiosConfig";

const App = () => {
    const theme = createTheme();
    const [tokens, ] = useLocalStorage("tokens")
    const [user, setUser] = useState({
        isUserLoaded: false,
        isLoggedIn: false,
        isStudent: false,
        isTeacher: true,
        accessToken: tokens?.accessToken || null,
        refreshToken: tokens?.refreshToken || null,
        firstName: null,
        lastName: null,
        id: null,
        email: null,
    });

    useEffect(() => {
        if (!user.isUserLoaded) {
            console.log(user)
            console.log(axiosConfig(user.accessToken))
            axios
                .get(
                    process.env.REACT_APP_API_URL + "/api/user",
                    axiosConfig(user.accessToken)
                )
                .then((res) => {
                    console.log(res.data);
                    setUser(prev => ({
                        ...prev,
                        isUserLoaded: true
                    }))
                });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Routes>
                        <Route path="/login" element={<SignIn />}></Route>
                        <Route
                            path="/login/success"
                            element={<LoginSuccess />}
                        ></Route>
                    </Routes>
                </Container>
            </ThemeProvider>
        </UserContext.Provider>
    );
};

export default App;
