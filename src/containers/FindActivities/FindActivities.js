import { Grid, Slider, FormControl, InputLabel, Select, MenuItem, IconButton } from "@mui/material";
import { Box } from "@mui/system";

import SearchIcon from '@mui/icons-material/Search';

import { useContext, useState } from "react";

import axios from "axios"
import UserContext from "../../context/UserContext"
import { axiosConfig } from "../../utils/axiosConfig"

const FindActivities = () => {
    const { user } = useContext(UserContext)

    const [range, setRange] = useState(20);
    const [category, setCategory] = useState("")
    const [events, setEvents] = useState([])

    const handleEventsFetch = () => {
        axios.get(process.env.REACT_APP_API_URL + `/api/events/filter?range=${range}&category=${category}`, axiosConfig(user.accessToken))
        .then((res) => {
            setEvents(res.data)
        })
    }

    return (
        <Box>
            <Grid
                container
                columns={{ xs: 12 }}
                alignItems="center"
                justifyItems="center"
                spacing={1}
            >
                <Grid item xs={4}>
                    <Slider
                        aria-label="Distance from tutor"
                        defaultValue={20}
                        color="secondary"
                        onChange={(e) => setRange(e.target.value)}
                    ></Slider>
                </Grid>
                <Grid item xs={2}>
                    Radius: {range}
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Age"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value={"Maths"}>Maths</MenuItem>
                            <MenuItem value={"Biology"}>Biology</MenuItem>
                            <MenuItem value={"Physics"}>Physics</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <IconButton aria-label="find" onClick={handleEventsFetch}>
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FindActivities;
