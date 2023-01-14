import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Typography, Button, TextField, Grid } from "@mui/material";
import { withStyles } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { axiosConfig } from "../../utils/axiosConfig";

const TableComponent = ({ isOpen }) => {
    const rows = [
        { id: 1, name: "First Name" },
        { id: 2, name: "Last Name" },
        { id: 3, name: "Role" },
    ];

    const top = 50;
    const left = 50;

    const theme = useTheme();
    const { user } = useContext(UserContext);

    const [openedModal, setOpenModal] = useState(isOpen);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [teacherBtn, setTeacherBtn] = useState(false);
    const [studentBtn, setStudentBtn] = useState(false);

    const handleChangesSubmit = async () => {
        console.log(firstName);
        console.log(lastName);
        console.log(user.accessToken);

        // await axios
        //     .put(
        //         "http://localhost:3001/api/user/name",
        //         {
        //             firstName: firstName,
        //             lastName: lastName,
        //         },
        //         axiosConfig(user.accessToken)
        //     )
        //     .then((res) => {
        //         console.log(res);
        //     });

        // setOpenModal(false);

        axios
            .get(
                process.env.REACT_APP_API_URL + "/api/user",
                axiosConfig(user.accessToken)
            )
            .then((a) => {
                console.log(a);
            });
    };

    return (
        <div>
            <Typography gutterBottom>
                Click to get the full Modal experience!
            </Typography>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={openedModal}
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
                        As it is Your first time here, please fill inputs below
                        :)
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
                        onChange={(event) => setFirstName(event.target.value)}
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
                        onChange={(event) => setLastName(event.target.value)}
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
                        variant="outlined"
                        onClick={handleChangesSubmit}
                    >
                        Apply
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default TableComponent;
