import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import TableComponent from "../../components/TableComponent/TableComponent";
import UserContext from "../../context/UserContext";

const Dashboard = ({}) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(user.email !== null);
    }, []);

    // if (loggedIn);

    // console.log(loggedIn);

    // return <Navigate to="/login" />;
    return <TableComponent />;
};

export default Dashboard;
