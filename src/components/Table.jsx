import { useEffect, createContext, useState, useSyncExternalStore } from 'react';
import { useLoaderData, NavLink, Outlet, Link } from 'react-router-dom';
import { ajax_get } from '../lib/helper';

import Paging from './Paging';
import Popup from './Popup';

import _ from 'lodash'

const API_URL = 'https://localhost:7123/api/merchandise';
const limit = 15;

export const AppContext = createContext();

export default function Table() {

    const [item, setItem] = useState({
        id: '',
        title: '',
        price: '',
        brand: '',
        category: '',
        thumbnail: ''
    });
    const [all, setAll] = useState([]);
    const [display, setDisplay] = useState([]);

    const pages = calcPage(all);
    const itemsLen = _.size(all);
    const lastNumOfPages = _.ceil(itemsLen / limit);
    const remain = itemsLen % limit;

    useEffect(() => {
        ajax_get(API_URL).then(res => res.json().then(data => setAll(data)));
    }, [])

    function calcPage(items) {
        let itemsLen = _.size(items);
        let lastNumOfPages = _.ceil(itemsLen / limit);
        return _.range(1, lastNumOfPages + 1);
    }

    const showDisplay = (numOfPage) => {
        const skip = (numOfPage - 1) * limit;
        setDisplay(all.slice(skip, skip + limit));
    }

    const appProvider = { item, setItem, all, setAll, pages, limit, remain, lastNumOfPages, display, showDisplay };
    return (
        <>
            <AppContext.Provider value={appProvider}>
                <section>
                    <Paging />
                    <Outlet />
                    <Popup />
                    {/* <Popup p={p} setP={setP} remain={remain}  pagesLen={pagesLen} setAll={setAll} all={all} showDisplay={showDisplay} /> */}
                </section>
            </AppContext.Provider>
        </>
    )
}