import {
    Typography,
    Box,
    TextField,
    Avatar,
    Button,
    Grid,
    Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

import axios from "axios";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = () => {
        axios
            .post(process.env.REACT_APP_API_URL + "/api/auth/login", {
                email: email,
                password: password,
            })
            .then((res) => {
                navigate(
                    `/login/success?accessToken=${res.data.tokens.accessToken}&refreshToken=${res.data.tokens.refreshToken}`
                );
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
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
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    startIcon={<GoogleIcon />}
                    component="a"
                    href={
                        process.env.REACT_APP_API_URL + "/api/auth/login/google"
                    }
                >
                    Login with Google
                </Button>
                <Grid container>
                    <Grid item xs>
                        {/* <Link href="#" variant="body2">
                            Forgot password?
                        </Link> */}
                    </Grid>
                    <Grid item>
                        <Link href="/register" variant="body2">
                            Register with your email
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default SignIn;
