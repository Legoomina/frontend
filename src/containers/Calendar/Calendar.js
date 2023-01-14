import { Box } from '@mui/system';

import {
    Scheduler,
    WeekView,
    Appointments,
  } from '@devexpress/dx-react-scheduler-material-ui';

const data = [
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2023, 0, 13, 9, 30),
      endDate: new Date(2023, 0, 13, 11, 0),
      id: 0,
      location: 'Room 1',
    }, {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2018, 5, 25, 12, 11),
      endDate: new Date(2018, 5, 25, 13, 0),
      id: 1,
      location: 'Room 1',
    }, {
      title: 'Install New Router in Dev Room',
      startDate: new Date(2018, 5, 25, 14, 30),
      endDate: new Date(2018, 5, 25, 15, 35),
      id: 2,
      location: 'Room 2',
    }, {
      title: 'Approve Personal Computer Upgrade Plan',
      startDate: new Date(2018, 5, 26, 10, 0),
      endDate: new Date(2018, 5, 26, 11, 0),
      id: 3,
      location: 'Room 2',
    }, {
      title: 'Final Budget Review',
      startDate: new Date(2018, 5, 26, 12, 0),
      endDate: new Date(2018, 5, 26, 13, 35),
      id: 4,
      location: 'Room 2',
    }
]

const Calendar = () => {
    return (
        <Box>
            <Scheduler data={data} height={700}>
                <WeekView startDayHour={6} endDayHour={19} />
                <Appointments />
            </Scheduler>
        </Box>
    )
}

export default Calendar