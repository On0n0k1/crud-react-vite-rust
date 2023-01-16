import { Task as ModelTask } from '../../../model/task';

import React, { useState, useEffect } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarProps {
    task: React.MutableRefObject<ModelTask>,
}

interface CalendarTimeHourProps {
    task: React.MutableRefObject<ModelTask>,
    isAm: boolean,
}

function CalendarTimeHour({ task, isAm }: CalendarTimeHourProps){
    const [hour, setHour] = useState(task.current.due.getHours() - (isAm ? 0 : 12));

    useEffect(()=>{
        task.current.due.setHours(hour + (isAm ? 0 : 12));
    },[hour]);


    return(
        <select 
            className='w-auto'
            value={hour} onChange={(e) => setHour(Number(e.target.value))}
        >
            <option value={1}>1h</option>
            <option value={2}>2h</option>
            <option value={3}>3h</option>
            <option value={4}>4h</option>
            <option value={5}>5h</option>
            <option value={6}>6h</option>
            <option value={7}>7h</option>
            <option value={8}>8h</option>
            <option value={9}>9h</option>
            <option value={10}>10h</option>
            <option value={11}>11h</option>
            <option value={12}>12h</option>
        </select>
    );
}

function CalendarTimeMinute({ task }: CalendarProps){
    const [minute, setMinute] = useState(task.current.due.getMinutes());

    useEffect(()=>{
        task.current.due.setMinutes(minute);
    },[minute]);

    return(
        <select 
            className='cols-span-1 w-auto'    
            value={minute} onChange={(e) => setMinute(Number(e.target.value))}
        >
            <option value={0}>0 min</option>
            <option value={5}>5 min</option>
            <option value={10}>10 min</option>
            <option value={15}>15 min</option>
            <option value={20}>20 min</option>
            <option value={25}>25 min</option>
            <option value={30}>30 min</option>
            <option value={35}>35 min</option>
            <option value={40}>40 min</option>
            <option value={45}>45 min</option>
            <option value={50}>50 min</option>
            <option value={55}>55 min</option>
        </select>
    );
}


function CalendarTime({task}: CalendarProps) {
    // false: PM true: AM
    const [isAm, setIsAm] = useState(task.current.due.getHours() < 12);

    return (
            <span className='
                w-auto h-auto
                flex flex-row items-center
            '>
                <select 
                    className='row-span-1 sm:row-auto mx-1'
                    value={isAm? "AM": "PM"} onChange={(e) => setIsAm(e.target.value.startsWith("AM"))}
                >
                    <option value={"AM"}>AM</option>
                    <option value={"PM"}>PM</option> 
                </select>
                <CalendarTimeHour task={ task } isAm={ isAm }/>
                <CalendarTimeMinute task={ task }/>
            </span>
        
    )
}


function Calendar({ task }: CalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(task.current.due);
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
    useEffect(()=>{
        task.current.due = selectedDate;
    },[selectedDate]);

    const handleHover = (date: Date) => {
        setHoveredDate(date);
    };

    const handleSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const customProps: ReactDatePickerProps = {
        selected: selectedDate,
        onChange: handleSelect,
        onDayMouseEnter: handleHover,
        onMonthMouseLeave: () => setHoveredDate(null),
        dayClassName: (date:Date) => {
        return hoveredDate && date.getTime() === hoveredDate.getTime()
            ? 'bg-blue-200'
            : '';
        },
    };

    return (
        <div className='
            flex lg:flex-row flex-col 
            items-center w-full'
        >
            <DatePicker
                {...customProps}
                className='
                    py-3 px-1 w-28 h-5 m-3
                    border border-gray-500 rounded-md
                    text-center
                '
                placeholderText="Select a date"
            />
            <CalendarTime task={ task }/>
        </div>
    );
};

export default Calendar;