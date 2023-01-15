import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Divider,
} from "@mui/material";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { useContext, useState, useEffect, useCallback } from "react";
import UserContext from "../../context/UserContext";

import SendIcon from '@mui/icons-material/Send';

const ChatListItem = ({e}) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        alt=""
                        src={e.avatar}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={e.message}
                    secondary={
                        <>
                            <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {e.name}
                            </Typography>
                            <br />
                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
};

const Chat = () => {
    const WS_URL = "ws://192.168.50.161:2137";
    const ws = new WebSocket(WS_URL);
    const { user } = useContext(UserContext);

    ws.onopen = (event) => {
        ws.send(
            JSON.stringify({
                namespace: "DISCOVERY",
                payload: {
                    email: user.email,
                    name: user.firstName,
                    surname: user.lastName,
                },
            })
        );
    };

    // namespace: "MESSAGE",
    //             payload: {
    //                 uuid: destinat,
    //                 from: user.email,
    //                 text: content,
    //             },

    const [socketUrl, setSocketUrl] = useState("ws://192.168.50.161:2137");
    const [messageHistory, setMessageHistory] = useState([{
        avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/318.jpg",
        name: "You",
        message: "Hello!"
    }, {
        avatar: "https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png",
        name: "Marek Krawczyk",
        message: "Hi, how can I help you?"
    }]);

    useWebSocket(WS_URL, {
        onOpen: () => {
            console.log("WebSocket connection established.");
        },
        onConnect: () => {
            console.log("aaa");
        },
        onClose: () => {
            console.log("test");
        },
    });

    return (
        <Box>
            <Paper sx={{ p: 2 }}>
                <Grid
                    container
                    columns={{ xs: 12 }}
                    justifyContent="center"
                    justifyItems="center"
                    alignItems="center"
                >
                    <Grid item xs={8}>
                        <TextField
                            variant="outlined"
                            label="Chat with..."
                            sx={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Button type="button" variant="contained">
                            Start!
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            style={{
                                minHeight: 500,
                                maxHeight: 500,
                                overflow: "auto",
                            }}
                        >
                            <List>
                                {messageHistory.map((e) => (
                                    <ChatListItem e={e}/>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            variant="outlined"
                            label="Chat with..."
                            sx={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: "center", marginY: 4 }}>
                        <Button type="button" variant="contained" startIcon={<SendIcon />} sx={{p: 2}}>
                            
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Chat;
