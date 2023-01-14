import {
    Paper, Box, Grid, Typography
} from "@mui/material";

const Hero = () => {
    return (
        <Paper
            sx={{
                position: "relative",
                backgroundColor: "white",
                color: "#000",
                mb: 4,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                // backgroundImage: `url(${post.image})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {/* {
                <img
                    style={{ display: "none" }}
                    // src={post.image}
                    // alt={post.imageText}
                />
            } */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: "rgba(0,0,0,.3)",
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: "relative",
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                        >
                            TutorHub
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            Find the perfect tutor for your needs with our easy-to-use platform. Browse a wide selection of highly qualified and experienced tutors, and rent them by the hour or session.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Hero;
