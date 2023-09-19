import { capitalize } from "lodash";

const FormCheck = ({ label, onchange, ...props }) => {
    return (
        <>
            <label htmlFor={label}>{capitalize(label)}
            </label>
            <input type="checkbox" {...props} onChange={onchange} />
        </>
    );
}

export default FormCheck; 