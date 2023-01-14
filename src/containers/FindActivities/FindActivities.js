import {
    Grid,
    Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
} from "@mui/material";
import { Box } from "@mui/system";

import SearchIcon from "@mui/icons-material/Search";

import { useContext, useState, useEffect } from "react";

import axios from "axios";
import UserContext from "../../context/UserContext";
import { axiosConfig } from "../../utils/axiosConfig";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "./find-activities.css";
import "leaflet/dist/leaflet.css";

import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from "leaflet";

const icon = L.icon({ 
    iconRetinaUrl:iconRetina, 
    iconUrl: iconMarker, 
    shadowUrl: iconShadow 
});

const FindActivities = () => {
    const { user } = useContext(UserContext);

    const [range, setRange] = useState(20);
    const [category, setCategory] = useState("");
    const [events, setEvents] = useState([]);

    const [map, setMap] = useState(null);

    const [userCoords, setUserCoords] = useState([0, 0]);

    useEffect(() => {
        setUserCoords(
            user.location
                ?.slice(1, -1)
                .split(",")
                .slice(0, 2)
                .map((e) => e - 0) || [0, 0]
        );
    }, [user.location]);

    useEffect(() => {
        if (map) {
            setInterval(function () {
                map.invalidateSize();
            }, 100);
        }
    }, [map]);

    const handleEventsFetch = () => {
        axios
            .get(
                process.env.REACT_APP_API_URL +
                    `/api/events/filter?range=${range}&category=${category}`,
                axiosConfig(user.accessToken)
            )
            .then((res) => {
                setEvents(res.data);
            });
    };

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
                <Grid item xs={12}>
                    {user.location !== null && userCoords[0] !== 0 ? (
                        <MapContainer
                            center={userCoords}
                            zoom={15}
                            scrollWheelZoom={true}
                            whenCreated={setMap}
                        >
                            {
                                console.log(userCoords)
                            }
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={userCoords} icon={icon}>
                                <Popup>
                                    Your coordinates.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    ) : null}
                </Grid>
            </Grid>
        </Box>
    );
};

export default FindActivities;
