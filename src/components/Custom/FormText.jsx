import React, { forwardRef } from "react";

const FormText = forwardRef((props, ref) => {
    const { label, onchange, ...inputs } = props;
    return (
        <div className="form__group">
            <input ref={ref} onChange={onchange} {...inputs}
            />
            <label key={props.id} htmlFor={props.id}>{label}
            </label>
        </div>
    )
})

export default FormText