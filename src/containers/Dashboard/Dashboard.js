import { useContext } from "react";
import TableComponent from "../../components/TableComponent/TableComponent";
import UserContext from "../../context/UserContext";

const Dashboard = ({}) => {
    const { user } = useContext(UserContext);

    return <TableComponent isOpen={user.firstName === null} />;
    // return <></>;
};

export default Dashboard;
