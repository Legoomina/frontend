import { createContext, useState } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
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

export { UserProvider };
export default UserContext;