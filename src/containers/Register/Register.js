import { Typography, Box, TextField, Button, Grid, Link } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = () => {
        axios
            .post(process.env.REACT_APP_API_URL + "/api/auth/register", {
                email: email,
                password: password,
            })
            .then(() => {
                navigate("/login");
            });
    };
    return (
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form">
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleRegister}
                >
                    Register
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="/login" variant="body2">
                            Have an account? Login.
                        </Link>
                    </Grid>
                    <Grid item>
                        {/* <Link href="#" variant="body2">
                            Register with your email
                        </Link> */}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Register;
