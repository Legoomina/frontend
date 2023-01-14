import { Box, Typography, Divider, Button } from "@mui/material"

const Settings = () => {
    return (
        <Box>
            <Typography component="h1" variant="h5">
                Settings
            </Typography>
            <Divider />
            <Button
                type="button"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                component="a"
                href={
                    process.env.REACT_APP_API_URL + "/api/calendar"
                }
            >
                Authorize calendar
            </Button>
        </Box>
    )
}

export default Settings