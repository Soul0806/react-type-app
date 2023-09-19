import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useParams } from 'react-router';

import { ajax_get, uuid, isObjectEmpty, combineTire } from '../../lib/helper';
import _ from 'lodash';

import { areas } from './Area';

const API_TIRE = 'https://localhost:7123/api/tire';
const [head, last] = [12, 22];
const inchRange = _.range(head, last + 1);

let inchTmplt = {};
inchRange.map(inch => inchTmplt[inch] = { id: uuid(), spec: {}, active: false })

function useLocalStorage(area, init) {
    const param = useParams();
    const [inches, setInches] = useState({});
    const ref = useRef(false);
    const localValue = localStorage.getItem(param.path);


    function setLocalStorage(data) {
        if (localStorage.length == 0) {
            areas.map(area => {
                localStorage.setItem(area.path, data);
            })
        }
    }

    function setData(data) {
        setInches(prev => {
            return data;
        });
    }

    useEffect(() => {
        if (localValue != null) {
            setData(JSON.parse(localValue));
        } else {
        
            // const fetchData = async () => {
            //     const data = await combineTire();
            //     // setLocalStorage(data);
            //     setData(data);
            // }
            // fetchData();
            combineTire().then(res => setData(res));
        }
    }, [])

    return [inches, setInches]
}
export { useLocalStorage } 