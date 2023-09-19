import React from 'react'

function CustomSelect({ name, option, selling }) {
 
    return (
        <div>
            <select name={name}>
                {!selling?.inch && <option value="">--請選擇--</option>}
                {option.map((op, idx) => (
                    <option key={idx} value={op}>{op}</option>
                )
                )}
            </select>
        </div>
    )
}

export default CustomSelect