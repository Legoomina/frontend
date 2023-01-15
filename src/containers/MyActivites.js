import {
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
    Stack,
} from "@mui/material";
import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { events } from "../data/mock";
import UserContext, { UserProvider } from "../context/UserContext";
import Menu from "../Menu/Menu";
import { axiosConfig } from "../utils/axiosConfig";

const MyActivities = () => {
    const [myActivities, setMyActivites] = useState([]);
    const { user } = useContext(UserContext);

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        axios
            .get(
                process.env.REACT_APP_API_URL + "/api/calendar/events",
                axiosConfig(user.accessToken)
            )
            .then(events)
            .then((res) => {
                setMyActivites(events);
                console.log(events);
            })
            .catch((err) => {});
    }, []);

    return (
        <Menu>
            <List
                sx={{
                    width: "80%",
                    bgcolor: "background.paper",
                }}
                component="div"
            >
                {myActivities.map((value) => (
                    <ListItem alignItems="center" divider>
                        <ListItemText
                            primary={""}
                            secondary={
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                        fontSize={23}
                                    >
                                        Main Theme: {value.name}
                                    </Typography>
                                    <br></br>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                        fontSize={16}
                                    >
                                        Start date:{" "}
                                        {formatDate(value.startDate)}
                                    </Typography>
                                    <br></br>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                        fontSize={16}
                                    >
                                        End date: {formatDate(value.endDate)}
                                    </Typography>
                                </Fragment>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Menu>
    );
};

export default MyActivities;
