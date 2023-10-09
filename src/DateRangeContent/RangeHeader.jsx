import React, {useEffect, useMemo, useState} from 'react';
import './RangeHeader.css';
import {PrimeReactProvider, PrimeReactContext} from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import {Calendar} from 'primereact/calendar';
import {CONTENT_LOADED, contentDataStream, dataStream, sendData, sendMessage} from "../util/messages";
import {DateTime} from "luxon";


// last_transaction_at
const RangeHeader = () => {
    const [data,setData] = useState([]);

    useEffect( () => {
        async function fetchData() {
            const records = await sendMessage(CONTENT_LOADED);
            setData(records);
        }
        fetchData();

    }, []);


    const [startDate, setStartDate] = useState(new Date('2012/01/20'));
    const [endDate, setEndDate] = useState(new Date());

    const parsedOrders = useMemo(() => {
        debugger;
        let luxStartDate = DateTime.fromJSDate(startDate);
        let luxEndDate = DateTime.fromJSDate(endDate);
        return data.filter((item) => {
            const itemLastTransaction = DateTime.fromISO(item.last_transaction_at);
            debugger;
            if(item.state !==
                "cancelled"
                && itemLastTransaction >= luxStartDate && itemLastTransaction <= luxEndDate){
                return true;
            }
            return false;
        });
    }, [data, startDate, endDate])

    return (
        <PrimeReactProvider>

        <div  className="App">
            <h3>Profit and Loss {parsedOrders.length}</h3>
                <div style={{display:"flex", gap:"20px", justifyContent: "start", alignContent:"center", flexDirection: "row"}}>
                    <span >
                    <Calendar   showButtonBar showIcon dateFormat={"mm/dd/yy"} value={startDate} onChange={(e) => {
                        setStartDate(e.value);
                    }}/>
                            <label htmlFor="start_date">Start Date</label>
                        </span>
                    <span >
                    <Calendar  showButtonBar showIcon dateFormat={"mm/dd/yy"} value={endDate} onChange={(e) => setEndDate(e.value)}/>
                                            <label htmlFor="end_date">End Date</label>
                    </span>
                    </div>
        </div>
        </PrimeReactProvider>
    );
};

export default RangeHeader;
