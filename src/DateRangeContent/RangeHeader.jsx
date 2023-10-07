import React from 'react';
import './RangeHeader.css';
import {DateRangePicker, LocalizationProvider} from "@mui/x-date-pickers-pro";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'


const RangeHeader = () => {
  return (
    <div className="App">
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
        </LocalizationProvider>
    </div>
  );
};

export default RangeHeader;
