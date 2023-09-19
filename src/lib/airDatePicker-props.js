export let btn = {
    content: 'Today',
    className: 'custom-button-classname',
    onClick: (dp) => {
        let date = new Date();
        dp.selectDate(date);
        dp.setViewDate(date);
        refDate.current = date;
    }
}
export let prevBtn = {
    content: 'Prev',
    className: 'custom-button-classname',
    onClick: (dp) => {
        refDate.current = dt.getLastday(refDate.current);
        dp.selectDate(refDate.current);
        dp.setViewDate(refDate.current);
    }
}

export let nextBtn = {
    content: 'Next',
    className: 'custom-button-classname',
    onClick: (dp) => {
        refDate.current = dt.getNextday(refDate.current);
        dp.selectDate(refDate.current);
        dp.setViewDate(refDate.current);
    }
}