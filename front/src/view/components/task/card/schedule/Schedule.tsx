import { Task as ModelTask } from '../../../../../model/model';
import Time from './Time';

import React, { useState, useEffect } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ScheduleProps {
    task: React.MutableRefObject<ModelTask>,
}

export function Schedule({ task }: ScheduleProps) {
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
            <Time task={ task }/>
        </div>
    );
};

export default Schedule;