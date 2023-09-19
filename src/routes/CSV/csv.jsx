import React, { useState } from "react";
import Papa from "papaparse";
const allowedExtensions = ["csv"];

import { ajax_post } from '../../lib/helper';

function csv() {
    // This state will store the parsed data
    const [data, setData] = useState([]);

    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    // It will store the file uploaded by the user
    const [file, setFile] = useState("");

    // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {
        setError("");

        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            // If input type is correct set the state
            setFile(inputFile);
        }
    };
    const handleParse = () => {

        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Enter a valid file");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();
        const result = [];
        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            const columns = Object.keys(parsedData[0]);
            const arr = target.result.split('\r\n');

            arr.map(str => {
                str.split(',').map(spec => {
                    if(spec) {
                        result.push(spec)
                    }
                })
            })
            let newResult;
            newResult = result.map(spec => {
                if(spec.length > 6) {
                  
                    return spec.slice(0,3) + '/' + spec.slice(4,6) + '-' + spec.slice(7);
                }
                return spec;
            })

            newResult.map(spec => {
                const url = 'https://localhost:7123/api/tire';
                const data = { Name: spec};
                ajax_post(url, data);
            });
            setData(columns);
        };
        reader.readAsText(file);

    };

    return (
        <div>
            <label htmlFor="csvInput" style={{ display: "block" }}>
                Enter CSV File
            </label>
            <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
            />
            <div>
                <button onClick={handleParse}>Parse</button>
            </div>
            <div style={{ marginTop: "3rem" }}>
                {error ? error : data.map((col,
                    idx) => <div key={idx}>{col}</div>)}
            </div>
        </div>
    );
}

export default csv