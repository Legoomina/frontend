import {
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext, { UserProvider } from "../context/UserContext";
import Menu from "../Menu/Menu";
import { axiosConfig } from "../utils/axiosConfig";

const MyActivities = () => {
    const [myActivities, setMyActivites] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios
            .get(
                process.env.REACT_APP_API_URL + "/api/calendar/events",
                axiosConfig(user.accessToken)
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return <Menu></Menu>;
};

export default MyActivities;

/*
<List
                sx={{
                    marginTop: 6,
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}
            >
                {[1, 2, 3].map((value) => (
                    <ListItem
                        key={value}
                        disableGutters
                        secondaryAction={
                            <IconButton aria-label="comment">
                                 <CommentIcon /> 
                                </IconButton>
                            }
                        >
                            <ListItemText primary={`Line item ${value}`} />
                        </ListItem>
                    ))}
                </List>

                */
