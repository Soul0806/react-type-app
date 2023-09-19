import React, { useEffect, useRef, useState } from 'react'

function Datepicker() {
    const ref = useRef();
    const [ date, setDate ] = useState('');
    useEffect(() => {
        function onChange() {
            setDate(kendo.toString(this.value(), 'yyyy/MM/dd'));
        }

        $("#datepicker").kendoDatePicker({
            change: onChange,
            format: "yyyy/MM/dd",
        });
    }, [])

    return (
        <div>
            <label htmlFor="datepicker">Select date</label>
            <input id="datepicker" />
            <div></div>
        </div>
    )
}

export default Datepicker