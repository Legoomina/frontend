import { createContext, useState } from "react";

const UserContext = createContext({});

const defaultUser = {
    isStudent: true,
    isTeacher: true,
    isLoggedIn: false,
    accesToken: null,
    refreshToken: null,
    firstName: null,
    lastName: null,
    id: null,
    email: null,
};

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        avatar: null,
        isStudent: true,
        isTeacher: true,
        isLoggedIn: false,
        accesToken: null,
        refreshToken: null,
        firstName: null,
        lastName: null,
        id: null,
        email: null,
    });

    return (
        <UserContext.Provider value={(user, setUser)}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, defaultUser };
export default UserContext;
