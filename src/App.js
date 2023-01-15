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
import Dashboard from "./containers/Dashboard/Dashboard";

import Register from "./containers/Register/Register";
import Calendar from "./containers/Calendar/Calendar";
import Settings from "./containers/Settings/Settings";
import Hero from "./containers/Hero/Hero";
import FindActivities from "./containers/FindActivities/FindActivities";
import MyActivities from "./containers/MyActivites";
import Chat from "./containers/Chat/Chat";

const App = () => {
    const theme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#5b8764",
                light: "#7b9f83",
                dark: "#3f5e46",
                contrastText: "#ffffff",
            },
            secondary: {
                main: "#986337",
                light: "rgba(172,130,95,0.99)",
                dark: "#6a4526",
                contrastText: "#ffffff",
            },
            info: {
                main: "#68CC7B",
                light: "#86d695",
                dark: "#488e56",
                contrastText: "rgba(0,0,0,0.87)",
            },
            text: {
                primary: "#ffffff",
                secondary: "rgba(255,255,255,0.7)",
                disabled: "rgba(255,255,255,0.5)",
                hint: "rgba(255,255,255,0.5)",
            },
            background: {
                default: "#303030",
                paper: "#424242",
            },
            error: {
                main: "#f44336",
                light: "#f6685e",
                dark: "#aa2e25",
                contrastText: "#ffffff",
            },
            warning: {
                main: "#ff9800",
                light: "#ffac33",
                dark: "#b26a00",
                contrastText: "rgba(0,0,0,0.86)",
            },
            success: {
                main: "#4caf50",
                light: "#6fbf73",
                dark: "#357a38",
                contrastText: "rgba(0,0,0,0.89)",
            },
            divider: "rgba(255,255,255,0.12)",
        },
    });
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
        isStudent: null,
        isTeacher: null,
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
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={{ user, setUser }}>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <div className="large-form">
                                <SignIn />
                            </div>
                        }
                    ></Route>
                    <Route
                        path="/register"
                        element={
                            <div className="large-form">
                                <Register />
                            </div>
                        }
                    ></Route>
                    <Route
                        path="/login/success"
                        element={<LoginSuccess />}
                    ></Route>

                    <Route
                        path="/calendar/:id"
                        element={
                            <Menu>
                                <Calendar />
                            </Menu>
                        }
                    ></Route>
                    <Route
                        path="/find-activities"
                        element={
                            <Menu>
                                <FindActivities />
                            </Menu>
                        }
                    ></Route>
                    <Route
                        path="/calendar"
                        element={
                            <Menu>
                                <Calendar />
                            </Menu>
                        }
                    ></Route>
                    <Route
                        path="/settings"
                        element={
                            <Menu>
                                <Settings />
                            </Menu>
                        }
                    ></Route>
                    <Route
                        path="/find-activities"
                        element={
                            <Menu>
                                <FindActivities />
                            </Menu>
                        }
                    ></Route>
                    <Route
                        path="/"
                        element={
                            <Menu>
                                <Dashboard></Dashboard>
                            </Menu>
                        }
                    ></Route>
                    <Route path="/myactivs" element={<MyActivities />}></Route>
                    <Route
                        path="/chat"
                        element={
                            <Menu>
                                <Chat />
                            </Menu>
                        }
                    ></Route>
                </Routes>
            </UserContext.Provider>
        </ThemeProvider>
    );
};

export default App;
