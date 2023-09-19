import React, { useContext, useState, useImperativeHandle, useRef, useEffect, useReducer, useMemo } from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom'
import _ from 'lodash';
import { axi } from '../../lib/axios';

import { AppContext } from '.';
import Note from './Note';

import FormSelect from '../Custom/FormSelect'
import Sale from './Sale';

import { dt, ajax_post, ajax_get } from '../../lib/helper';
import { combineTire } from './useTire';
import { useSale } from './useSale';

//test 
// const option = _.range(1, 11);

// import { ACTION } from './Tire';

// export const ACTION = {
//     INCREASE: 'increase',
//     DECREASE: 'decrease',
// }

// const reducer = (state, action) => {
//     switch (action.type) {
//         case ACTION.INCREASE:
//             const num = action.payload.num;
//             const inch = action.payload.inch;
//             const spec = action.payload.s;
//             console.log({ ...state, [inch]: { ...state[inch], spec: { ...state[inch]['spec'], [spec]: num + 1 } } });
//             return { ...state, [inch]: { ...state[inch], spec: { ...state[inch]['spec'], [spec]: num + 1 } } }
//         default:
//             return state;
//     }

// }
// const sale = localStorage.getItem('sale') ? JSON.parse(localStorage.getItem('sale'))[getToday()] : [];


const day = dt.getTodayDate();

function Spec() {

    const noteRef = useRef([]);
    const modalRef = useRef('');
    const { specs, inches, setInches, areas } = useContext(AppContext);
    const [target, setTarget] = useState('');
    const [behavior, setBehavior] = useState('insert');
    const [btnAbort, setBtnAbort] = useState(false);
    const navigate = useNavigate()

    const { allSale, setAllsale, dbSale, setDbSale, id } = useSale([]);

    const { ref } = useOutletContext();
    // let [state, dispatch] = useReducer(reducer, inches);

    useImperativeHandle(ref, () => {
        return {
            cancelTarget: () => setTarget(''),
            cleanNoteRef: () => noteRef.current = [],
            cleanNote: () => cleanNote()
        }
    })

    useEffect(() => {
        const openBtn = document.querySelector("[data-open-modal]");
        const modalDialog = document.querySelector("[data-modal]");

        openBtn.addEventListener("click", () => {
            modalDialog.showModal();
        })

    }, [])

    function fadeIn(el) {
        el.style.animation = 'fade-in 1s linear';
    }

    function cleanNote() {
        const note = document.querySelector('.note');
        note.replaceChildren();
    }

    function note(s) {
        const note = document.querySelector('.note');
        let div = document.createElement("div");
        div.className = 'noti';
        div.appendChild(document.createTextNode(s));
        noteRef.current.push(div);

        if (noteRef.current.length > 4) {
            noteRef.current.shift();
            note.removeChild(note.firstElementChild);
        }

        if (noteRef.current.length == 1) {
            note.appendChild(div);
        } else {
            setBtnAbort(true);
            let index = 0;
            let lastIndex = noteRef.current.length - 1;
            let offset = -50;
            while (index < lastIndex) {
                let move = (lastIndex - index) * (offset) + "px"
                noteRef.current[index].style.transform = `translateY(${move})`;
                index++;
            }
            document.querySelector('.noti').addEventListener("transitionend", (event) => {
                note.appendChild(div);
                setBtnAbort(false);
            });
        }
    }

    function onclick(s, action) {
        if (btnAbort) { return undefined }
        return () => {
            const inch = s.slice(-2);
            const num = inches[inch]['spec'][s];
            if (action == 'add') {
                // dispatch({ type: ACTION.INCREASE, payload: { inch: inch, s: s, num: num } })
                note(s);
                setInches(prev => {
                    return { ...prev, [inch]: { ...prev[inch], spec: { ...prev[inch]['spec'], [s]: num + 1 } } }
                })
            } else {
                setInches(prev => {
                    return { ...prev, [inch]: { ...prev[inch], spec: { ...prev[inch]['spec'], [s]: num - 1 } } }
                })
            }
            setTarget(s);
        }
    }

    function active(s) {
        return {
            color: s == target ? 'red' : 'black'
        }
    }

    function handleBehav(e) {
        setBehavior(e.target.value);
    }

    function reset() {
        combineTire().then(res => {
            areas.map(area => localStorage.setItem(area.path, JSON.stringify(res)))
        });
        combineTire().then(res => setInches(res));
        ref.current.cancelTarget();
        ref.current.cleanNote();
        ref.current.cleanNoteRef();
    }

    const salesState = useMemo(() => {
        return {
            dbSale, setDbSale, id
        }
    }, [dbSale, setDbSale, id])


    function modalSubmit(e) {
        const api_tire = 'http://localhost:9000/tire';
        const data = { format: modalRef.current.value };
        const inch = data.format.slice(-2);

        axi.post(api_tire, data);

        setInches(prev => {
            return { ...prev, [inch]: { ...prev[inch], spec: { ...prev[inch]['spec'], [data.format]: 0 } } }
        })

        navigate(0);
    }

    return (
        <>
            <div className="spec-wrapper">
                <div className="behavior">
                    <div className="reset"><button onClick={reset}>Reset</button></div>
                    <div>
                        <button data-open-modal className="btn btn-success">新增規格</button>
                        <dialog data-modal>
                            <form method="dialog">
                                <label htmlFor="insert">新增</label><input type="text" id="insert" ref={modalRef} />
                                <div className="act">
                                    <button>Cancel</button>
                                    <button onClick={modalSubmit}>Submit</button>
                                </div>
                            </form>
                        </dialog>
                    </div>
                    <label htmlFor="insert">
                        <input type="radio" id="insert" value="insert" name="behavior" onChange={handleBehav} checked={behavior == 'insert'} />新增
                    </label>
                    <label htmlFor="sale">
                        <input type="radio" id="sale" value="sale" name="behavior" onChange={handleBehav} />銷售
                    </label>
                    {/* <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm btn-secondary selling">
                        <span>詳細銷售</span>
                    </button> */}
                    {/* <button onclick={() => openSellingModel}></button> */}
                </div>
                {specs.map((spec, idx) => {
                    const num = inches[spec.slice(-2)]['spec'][spec];
                    const btnStyle = (num == 0) ? { opacity: 0.7, cursor: 'not-allowed' } : { opacity: 1 };
                    const disabled = (num == 0) ? true : false;
                    return <div className="item" key={idx}>
                        <div className="spec">{spec}</div>
                        <div className="num" style={active(spec)}>{num}</div>
                        <div className="mode">
                            {behavior == 'insert' ?
                                <>
                                    <div>
                                        <button className="button minor" style={btnStyle} disabled={disabled} onClick={onclick(spec, 'minor')}> - </button>
                                        <button className="button increase" onClick={onclick(spec, 'add')}> + </button>
                                    </div>
                                </>
                                :
                                <>
                                    <div><button className="button minor" style={btnStyle} disabled={disabled} > 售 </button></div>
                                    <FormSelect option={_.range(0, num + 1)} />
                                    <div className="input-icon">
                                        <input className="price " type="text" placeholder="0.0" />
                                        <i>$</i>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                }
                )}
            </div>
            <Note />
        </>
    )
}

export default React.forwardRef(Spec)