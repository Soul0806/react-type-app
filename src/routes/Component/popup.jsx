import { useEffect, useState, useContext, useInsertionEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomSelect from './CustomSelect';
import { AppContext } from '../Tire/Tire';
import { dt, ajax_post, ajax_get } from '../../lib/helper';
import { axi } from '../../lib/axios';


// Component custom 
import FormInput from '../../components/Custom/FormText';

import _ from 'lodash'
import Litepicker from 'litepicker';

const WRITE_API = `http://localhost:9000/io/writeFile`;
const SALE_API_URL = `https://localhost:7123/api/Sale/`;

const toDate = dt.getTodayDate();

function Popup({ salesState }) {

    var myModalEl = document.getElementById('exampleModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)

    const optionInch = _.range(12, 23);
    const { inches } = useContext(AppContext);
    const [specs, setSpecs] = useState([]);
    const navigate = useNavigate();
    const priceRef = useRef();

    const [selling, setSelling] = useState({
        id: '',
        place: '',
        service: '',
        inch: '',
        spec: '',
        price: '',
        quantity: '',
        pay: '',
        note: '',
        date: dt.getTodayDate(),
        createdAt: ''
    });

    const styling = {
        opacity: !selling.spec && selling.service != 'fix' ? '.4' : 1,
        cursor: !selling.spec && selling.service != 'fix' ? 'not-allowed' : 'pointer'
    }

    useEffect(() => {
        // const picker = new Litepicker({
        //     element: document.getElementById('litepicker'),
        //     setup: (picker) => {
        //         picker.on('selected', (date) => {
        //             console.log(date.dateInstance.toLocaleString().split(' ')[0]);
        //         });
        //     },
        // });
    }, [])

    useEffect(() => {
        if (selling.inch) {
            setSpecs((prev) => {
                return Object.keys(inches[selling['inch']]['spec']).sort();
            })
        }
    }, [selling.inch])


    useEffect(() => {
        selling.quantity && priceRef.current.focus();
    }, [selling.quantity])

    function handleChange(e) {
        console.log(salesState.id);
        e.target.name == 'price' && priceRef.current.focus();
        const { name, value } = e.target;
        setSelling(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    function handleSubmit(e) {
        e.preventDefault();

        const content = {
            id: salesState.id,
            area: selling.place,
            service: selling.service,
            spec: selling.spec,
            price: selling.price,
            quantity: selling.quantity,
            pay: selling.pay,
            note: selling.note,
            date: selling.date,
            createdAt: dt.getDateTime()
        }

        const fileName = 'static/sale.json';
        const data = { fileName, content }
        axi.post(WRITE_API, data);
        // modal.toggle();
        navigate(0);
    }

    function handleClose() {
        // setSelling({
        //     place: '',
        //     service: '',
        //     inch: '',
        //     spec: '',
        //     price: '',
        //     quantity: 1,
        //     pay: '',
        //     note: ''
        // })
    }

    const inputs = [
        {
            id: "store",
            type: "radio",
            name: "place",
            value: "store",
            label: "店內",
        },
        {
            id: "out-service",
            type: "radio",
            name: "place",
            value: "out-service",
            label: "外出",
        }, {
            id: "price",
            type: "text",
            name: "price",
            value: "price",
            label: "價格",
        }
    ]
    return (
        <>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">詳細銷售</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="mb-3 modal-date" >
                                <div>
                                    <label htmlFor="y-day">
                                        <input type="radio" id="y-day" name="date" value={dt.getLastday(new Date()).toLocaleString().split(' ')[0]} onChange={handleChange} checked={selling.date == dt.getLastday(new Date()).toLocaleString().split(' ')[0] ? 'checked' : ''} />昨日</label>
                                </div>
                                <div>
                                    <label htmlFor="today">
                                        <input type="radio" id="today" name="date" value={dt.getTodayDate()} onChange={handleChange} checked={selling.date == dt.getTodayDate() ? 'checked' : ''} />今日
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 modal-place" >
                                <div>
                                    <label htmlFor="store">
                                        <input type="radio" id="store" name="place" value="store" onChange={handleChange} checked={selling.place == 'store' ? 'checked' : ''} />店內</label>
                                </div>
                                <div>
                                    <label htmlFor="out-service">
                                        <input type="radio" id="out-service" name="place" value="out-service" onChange={handleChange} checked={selling.place == 'out-service' ? 'checked' : ''} />外出
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 modal-service">
                                <div>
                                    <label htmlFor="fix">
                                        <input type="radio" id="fix" name="service" value="fix" onChange={handleChange} checked={selling.service == 'fix' ? 'checked' : ''} />補胎</label>
                                </div>
                                <div>
                                    <label htmlFor="tire-change">
                                        <input type="radio" id="tire-change" name="service" value="tire-change" onChange={handleChange} checked={selling.service == 'tire-change' ? 'checked' : ''} />換胎
                                    </label>
                                </div>
                            </div>
                            {selling.service != 'fix' &&
                                <div className="mb-3 modal-tire" onChange={handleChange}>
                                    <div>規格</div>
                                    <div>
                                        <CustomSelect name="inch" option={optionInch} selling={selling} />
                                    </div>
                                    {specs.length != 0 &&
                                        <>
                                            <div>
                                                <CustomSelect name="spec" option={specs} />
                                            </div>
                                        </>
                                    }
                                </div>
                            }
                            <div className="mb-3 modal-quantity" onChange={handleChange} >
                                <div>數量</div>
                                <div>
                                    <CustomSelect name="quantity" option={_.range(1, 11)} />
                                </div>
                            </div>
                            <div className="mb-3 input-icon modal-input-icon">
                                <input ref={priceRef} className="price" name="price" type="text" placeholder="0.0" value={selling.price} onChange={handleChange} />
                                <i>$</i>
                                {selling.service == 'fix' &&
                                    <>
                                        <div>
                                            <label htmlFor="custom">
                                                <input type="radio" id="custom" name="price" value="" onChange={handleChange} checked={selling.price == '' ? 'checked' : ''} />自訂
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="twohundred">
                                                <input type="radio" id="twohundred" name="price" value="200" onChange={handleChange} checked={selling.price == '200' ? 'checked' : ''} />200
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="threehunderd">
                                                <input type="radio" id="threehunderd" name="price" value="300" onChange={handleChange} checked={selling.price == '300' ? 'checked' : ''} />300
                                            </label>
                                        </div>
                                    </>
                                }
                            </div>

                            <div className="mb-3 modal-pay" onChange={handleChange}>
                                <div className="text-pay">付款方式</div>
                                <div>
                                    <label htmlFor="cash">
                                        <input type="radio" id="cash" name="pay" value="cash" />現金</label>
                                </div>
                                <div>
                                    <label htmlFor="credit">
                                        <input type="radio" id="credit" name="pay" value="credit" />刷卡
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="transfer">
                                        <input type="radio" id="transfer" name="pay" value="transfer" />轉帳
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 modal-note">
                                <label className="note" htmlFor="note">備註 </label>
                                <input id="note" name="note" type="text" onChange={handleChange} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                <button type="submit" style={styling}
                                    className="btn btn-primary">Send message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Popup;