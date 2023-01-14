import { Grid, Slider, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";

import { useState } from "react";

const FindActivities = () => {
    const [range, setRange] = useState(20);
    const [category, setCategory] = useState("")
    return (
        <Box>
            <Grid
                container
                columns={{ xs: 12 }}
                alignItems="center"
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
                <Grid item xs={6}>
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
            </Grid>
        </Box>
    );
};

export default FindActivities;
