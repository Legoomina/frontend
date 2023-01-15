import { useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

import UserContext from "../../context/UserContext";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddBoxIcon from "@mui/icons-material/AddBox";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { Grid, Typography } from "@mui/material";
import { events } from "../../data/mock";
import LatestEvents from "../../components/LatestEvent/LatestEvents";
import AppWidgetSummary from "../../components/AppWidgetSummary/AppWidgetSummary";
import AppCurrentSubject from "../../components/AppCurrentSubject/AppCurrentSubject";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/TableComponent/TableComponent";
import useWebSocket from "react-use-websocket";

const Dashboard = ({}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { user } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState(false);

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

    const sorted = events.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    const ws = new WebSocket("ws://127.0.0.1:2137");

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

    // useWebSocket(WS_URL, {
    //     onOpen: () => {
    //         console.log("WebSocket connection established.");
    //     },
    //     onConnect: () => {
    //         console.log("aaa");
    //     },
    // });

    return (
        <>
            <TableComponent />
            <Typography variant="h4" sx={{ mb: 5 }} padding={2}>
                Hi, Welcome back
            </Typography>
            <Grid container xs={15} padding={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total money earned"
                        total={faker.datatype.number() % 1000}
                    >
                        <MonetizationOnIcon />
                    </AppWidgetSummary>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Events organized"
                        total={faker.datatype.number() % 100}
                        color="info"
                    >
                        <AssignmentIndIcon />
                    </AppWidgetSummary>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Item Orders"
                        total={faker.datatype.number() % 100}
                        color="info"
                        icon={AssignmentIndIcon}
                    >
                        <AddBoxIcon />
                    </AppWidgetSummary>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Hours taken"
                        total={faker.datatype.number() % 100}
                        color="warning"
                        icon={AssignmentIndIcon}
                    >
                        <QueryBuilderIcon />
                    </AppWidgetSummary>
                </Grid>

                <Grid item xs={6} padding={1.5}>
                    <LatestEvents
                        title="News Update"
                        list={events.slice(0, 3).map((item) => {
                            return {
                                id: item.id,
                                title: item.name,
                                description: faker.name.jobTitle(),
                                startAt: item.startDate,
                                endAt: item.endDate,
                            };
                        })}
                    />
                </Grid>
                <Grid item xs={6} padding={1.5}>
                    <AppCurrentSubject
                        title="Current Subject"
                        chartLabels={[
                            "English",
                            "History",
                            "Physics",
                            "Geography",
                            "Chinese",
                            "Math",
                        ]}
                        chartData={[
                            {
                                name: "Main Stream focus",
                                data: [80, 50, 30, 40, 100, 20],
                            },
                            {
                                name: "Passionate doings",
                                data: [20, 30, 40, 80, 20, 80],
                            },
                            {
                                name: "Free stuff chilling",
                                data: [44, 76, 78, 13, 43, 10],
                            },
                        ]}
                        chartColors={[...Array(6)].map(
                            () => theme.palette.text.secondary
                        )}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
