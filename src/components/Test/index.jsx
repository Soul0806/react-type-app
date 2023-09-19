import { useEffect } from "react";
import API from "../../api";
import { axi } from "../../lib/axios";

const getSale = async () => {
    const fileName = 'static/sale.json';
    const data = { fileName };
    const { data: result } = await axi.post(API.READ_JSONFILE, data);
    // console.log(result);
}

const Test = () => {
    getSale();
    return (
        <div>Test</div>
    );
}

export default Test;