import React, { useEffect, useRef, useState } from 'react'
import { dt } from '../../lib/helper';
import { getDbSale } from './useSale';
import { isEmpty } from 'lodash';
import { axi } from '../../lib/axios';

// Air Datepicker 
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

const PAY = {
    CASH: '現金',
    CREDIT: '刷卡',
    TRANSFER: '轉帳'
}
function Sale({ salesState }) {
    const [today, setToday] = useState(new Date());
    const [remove, setRemove] = useState(false);
    const ref = useRef(false);

    let button = {
        content: 'Today',
        className: 'custom-button-classname',
        onClick: (dp) => {
            let date = new Date();
            dp.selectDate(date);
            dp.setViewDate(date);
        }
    }
    useEffect(() => {
        if (ref.current) {
            // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            // var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
            //     return new bootstrap.Tooltip(tooltipTriggerEl)
            // })

            const picker = new AirDatepicker('#datepicker', {
                navTitles: {
                    days: today.toDate()
                },
                locale: localeEn,
                inline: true,
                buttons: [button],
                onSelect: function ({ date, datepicker }) {
                    datepicker.nav.$title.innerHTML = date.toDate();
                    // this.navTitles.days = date.toDate();
                    getDbSale(date.toDate()).then(({ id, sale: res }) => salesState.setDbSale(res))
                    setToday(date);
                },
            });
        }
        return () => {
            ref.current = true;
        }
    }, [])

    function toLast() {
        const lastDate = dt.getLastday(today).toDate();
        // salesState.setSales(JSON.parse(localStorage.getItem('sale'))?.[lastDate] || []);
        getDbSale(lastDate).then(({ id, sale: res }) => salesState.setDbSale(res))
        setToday(prev => dt.getLastday(today))
    }

    function toNext() {
        const nextDate = dt.getNextday(today).toDate();
        // salesState.setSales(JSON.parse(localStorage.getItem('sale'))?.[nextDate] || []);
        getDbSale(nextDate).then(({ id, sale: res }) => salesState.setDbSale(res))
        setToday(prev => dt.getNextday(today))
    }

    function onclick(to) {
        if (to == 'last') {
            toLast();
        } else {
            toNext();
        }
    }

    function handleClick() {
        setRemove(prev => !prev);
    }

    return (
        <div className="sale-wrapper">
            <div className="date flex g-1">
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm btn-secondary selling">
                    <span>詳細銷售</span>
                </button>
                <div className="action">
                    <span>操作</span>
                    <input type="checkbox" onClick={handleClick} />
                </div>

                {/* <div className="material-symbols-outlined arrow-back" onClick={() => onclick('last')}>
                    arrow_back
                </div> */}
                {/* <div>Date: {today.toDate()}</div> */}
                {/* <div className="material-symbols-outlined arrow-forward" onClick={() => onclick('next')}>
                    arrow_forward
                </div> */}
            </div>
            <div id="datepicker"></div>
            {isEmpty(salesState.dbSale) ? <div>No Data</div> :
                <>
                    {salesState.dbSale.map(sale => {
                        return <SaleTmp sale={sale} salesState={salesState} remove={remove} />
                    })
                    }
                </>}
        </div>
    )
}


async function handleDel(id, salesState) {
    let del = window.confirm('Delete');
    if (del) {
        salesState.setDbSale(sale => {
            return sale.filter(s => {
                if (s.id != id)
                    return s;
            })
        });
    }
    const res = await axi.delete(`http://localhost:9000/sale/${id}`);
}


function SaleTmp({ sale, salesState, remove }) {
    return (
        <div key={sale.id} className="flex g-1">{sale?.id}
            {sale.service == 'fix' ?
                <>
                    <div>補</div>
                </>
                :
                <>
                    <div>售</div>
                    <div className="f-g-1">{sale.spec}</div>
                    <div>{sale.quantity}</div>
                </>
            }
            <div className="d-sign">{sale.price}</div>

            {remove &&
                <>
                    <div className="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="right" title={PAY[sale.pay.toUpperCase()]}>
                        {sale.pay == 'cash' && 'monetization_on'}
                        {sale.pay == 'credit' && 'credit_card'}
                        {sale.pay == 'transfer' && 'phone_iphone'}
                    </div>
                    <div className="created-at">
                        {sale.createdAt.split(' ')[1]}
                    </div>
                    <div className="del"><span className="material-symbols-outlined" onClick={() => handleDel(sale.id, salesState)}>
                        delete
                    </span></div>
                </>
            }
        </div>
    )
}

export default Sale