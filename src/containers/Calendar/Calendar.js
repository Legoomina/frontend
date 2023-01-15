import { Box } from "@mui/system";

import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { axiosConfig } from "../../utils/axiosConfig";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Room from "@mui/icons-material/Room";
import { Button, Link } from "@mui/material";

const PREFIX = "Demo";

const classes = {
    icon: `${PREFIX}-icon`,
    textCenter: `${PREFIX}-textCenter`,
    firstRoom: `${PREFIX}-firstRoom`,
    secondRoom: `${PREFIX}-secondRoom`,
    thirdRoom: `${PREFIX}-thirdRoom`,
    header: `${PREFIX}-header`,
    commandButton: `${PREFIX}-commandButton`,
};

const StyledGrid = styled(Grid)(() => ({
    [`&.${classes.textCenter}`]: {
        textAlign: "center",
    },
}));

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
    [`&.${classes.icon}`]: {
        color: palette.action.active,
    },
}));



const Calendar = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);
    const handleEventsFetch = () => {
        axios
            .get(
                process.env.REACT_APP_API_URL + "/api/calendar/events/" + id,
                axiosConfig(user.accessToken)
            )
            .then((res) => {
                setData(
                    res.data.map((item) => ({
                        title: item.summary,
                        id: item.id,
                        startDate: new Date(item.start.dateTime),
                        endDate: new Date(item.end.dateTime),
                    }))
                );
            });
    };

    const Content = ({ children, appointmentData, ...restProps }) => (
      <AppointmentTooltip.Content
          {...restProps}
          appointmentData={appointmentData}
      >
          <Grid container alignItems="center">
              <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => handleAppointment(appointmentData.id)}
              >
                  Make appointment
              </Button>
          </Grid>
      </AppointmentTooltip.Content>
  );

    const handleAppointment = (id) => {
        axios
            .post(
                process.env.REACT_APP_API_URL +
                    "/api/events/sign?eventId=" +
                    id,
                {
                    eventId: id,
                },
                axiosConfig(user.accessToken)
            )
            .then((res) => {
                console.log(res.data);
            });
    };

    useEffect(() => {
        handleEventsFetch();
    }, []);

    return (
        <Box>
            <Scheduler data={data} height={700}>
                <WeekView startDayHour={6} endDayHour={19} />
                <Appointments />
                <AppointmentTooltip contentComponent={Content} />
                {/* <AppointmentForm 
                  basicLayoutComponent={BasicLayout}
                /> */}
            </Scheduler>
        </Box>
    );
};

export default Calendar;
