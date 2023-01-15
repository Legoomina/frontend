import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Typography, Button, TextField, Grid } from "@mui/material";
import { withStyles } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { axiosConfig } from "../../utils/axiosConfig";

const TableComponent = () => {
    const rows = [
        { id: 1, name: "First Name" },
        { id: 2, name: "Last Name" },
        { id: 3, name: "Role" },
    ];

    const top = 50;
    const left = 50;

    const theme = useTheme();
    const { user, setUser } = useContext(UserContext);
    const [location, setLocation] = useState("0.0");
    const [openedModal, setOpenModal] = useState();
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [teacherBtn, setTeacherBtn] = useState(false);
    const [studentBtn, setStudentBtn] = useState(false);
    const [submitBtn, setSubmitPressable] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLocation(
                `@${pos.coords.latitude},${pos.coords.longitude},${pos.coords.longitude}z`
            );

            setSubmitPressable(true);
        });
    }, [location]);

    const handleChangesSubmit = async () => {
        const endpoints = [
            {
                url: process.env.REACT_APP_API_URL + "/api/user/name",
                body: {
                    firstName: firstName,
                    lastName: lastName,
                },
            },
            {
                url: process.env.REACT_APP_API_URL + "/api/user/location",
                body: {
                    location: location,
                },
            },
            {
                url: teacherBtn
                    ? process.env.REACT_APP_API_URL + "/api/user/accountType"
                    : "",
            },
        ];

        Promise.all(
            endpoints.map(({ url, body }) =>
                axios.put(url, body, axiosConfig(user.accessToken))
            )
        )
            .then(
                axios.spread((...allData) => {
                    setOpenModal(false);
                })
            )
            .then(
                setUser((prev) => ({
                    ...prev,
                    firstName: firstName,
                    lastName: lastName,
                    location: location,
                    isTeacher: teacherBtn,
                }))
            )
            .catch((err) => {
                console.log(err);
            });
    };

    if (user.firstName == null) {
        return (
            <div>
                <Typography gutterBottom>
                    Click to get the full Modal experience!
                </Typography>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={true}
                >
                    <div
                        style={{
                            position: "absolute",
                            backgroundColor: theme.palette.background.paper,
                            top: `${top}%`,
                            left: `${left}%`,
                            transform: `translate(-${top}%, -${left}%)`,
                            padding: 30,
                            borderRadius: 10,
                        }}
                    >
                        <Typography variant="h4" id="modal-title">
                            Hi it is really nice having You here!
                        </Typography>
                        <Typography variant="h6" id="simple-modal-description">
                            As it is Your first time here, please fill inputs
                            below :)
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="First Name"
                            label="First Name"
                            id="first-name"
                            autoComplete="first-name"
                            value={firstName}
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Last Name"
                            label="Last Name"
                            id="last-name"
                            autoComplete="last-name"
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                        />
                        <Grid container>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => setTeacherBtn(!teacherBtn)}
                                    style={{
                                        backgroundColor: teacherBtn
                                            ? "pink"
                                            : "white",
                                    }}
                                >
                                    teacher
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => setStudentBtn(!studentBtn)}
                                    style={{
                                        backgroundColor: studentBtn
                                            ? "pink"
                                            : "white",
                                    }}
                                >
                                    student
                                </Button>
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            disabled={!submitBtn}
                            variant="outlined"
                            onClick={handleChangesSubmit}
                        >
                            Apply
                        </Button>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default TableComponent;
