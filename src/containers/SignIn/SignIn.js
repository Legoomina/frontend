import { Typography, Box, TextField, Avatar, Button, Grid, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from '@mui/icons-material/Google';

// const handle

const SignIn = () => {
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
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
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
					href={process.env.REACT_APP_API_URL + "/api/auth/login/google"}
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
                        <Link href="#" variant="body2">
                            Register with your email
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default SignIn;
