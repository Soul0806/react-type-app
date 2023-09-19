import { useEffect, useRef, useState, useCallback, useReducer } from 'react';
import { useParams } from 'react-router';

import { ajax_get, uuid, isObjectEmpty } from '../../lib/helper';
import { axi } from '../../lib/axios';
import _ from 'lodash';

export const areas = [
    { name: '隔壁 樓上', path: 'upstair' },
    { name: '隔壁 樓下', path: 'downstair' },
    { name: '店外', path: 'out-store' },
    { name: '倉庫', path: 'warehouse' }
]
export const combineTire = async (signal = {}) => {
    let tire_api_mssql = 'https://localhost:7123/api/tire';
    let tire_api_mysql = 'http://localhost:9000/';

    // default tire_api 
    let api_tire = tire_api_mysql;
    const [head, last] = [12, 22];
    const inchRange = _.range(head, last + 1);

    let inchTmplt = {};
    inchRange.map(inch => inchTmplt[inch] = { id: uuid(), spec: {}, active: false })

    const res = await axi.get(api_tire);
    res.data.map(spec => {
        const name = spec.format;
        const inch = name.slice(-2);
        inchTmplt[inch]['spec'][name] = 0;
    })
    return inchTmplt;
}

export const useTire = () => {
    const param = useParams();
    const [inches, setInches] = useState({});

    useEffect(() => {
        !isObjectEmpty(inches) && setInches(JSON.parse(localStorage.getItem(param.area)))
    }, [param])

    useEffect(() => {
        !isObjectEmpty(inches) && localStorage.setItem(param.area, JSON.stringify(inches))
    }, [inches])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (localStorage.length != areas.length) {
            areas.map(area => {
                combineTire(signal).then(res => {
                    setInches(res);
                    localStorage.setItem(area.path, JSON.stringify(res))
                });
            })
        } else {
            // setInches(prev => {
            //     return JSON.parse(localStorage.getItem(param.area));
            // });
            combineTire(signal).then(res => {
                setInches(res);
            });
        }
        return () => controller.abort()
    }, [])

    return [inches, setInches, areas, combineTire]
}




