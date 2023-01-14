import { Task as ModelTask } from '../../../model/task';

import React, { useState, useEffect } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface CalendarProps {
    task: React.MutableRefObject<ModelTask>,
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
        <div className="flex flex-col items-center">
        <DatePicker
            {...customProps}
            className="p-2 border border-gray-500 rounded-md"
            placeholderText="Select a date"
        />
        </div>
    );
};

export default Calendar;