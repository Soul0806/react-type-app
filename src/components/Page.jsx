import { useContext, useEffect, useState, createContext, useLayoutEffect } from 'react';
import { useLoaderData, useLocation, useOutletContext, useParams, useNavigate } from "react-router-dom";

// Third party JS utility library
import _ from 'lodash'

// helper
import { ajax_get, ajax_del, empty } from '../lib/helper';

// use Context
import { AppContext } from './Table';

const API_URL = 'https://localhost:7123/api/merchandise';
const PAGE_ACTION = `${API_URL}/page/`;

export default function Page() {
    const { item, setItem, all, setAll, pages, limit, remain, lastNumOfPages, display, showDisplay } = useContext(AppContext);

    const param = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const currentPage = param.pageN;

    useLayoutEffect(() => {
        showDisplay(param.pageN);
    }, [all, location])

    function handleDelete(pId) {
        const url = `${API_URL}/${pId}`;
        ajax_del(url);

        setAll((prev) => {
            return prev.filter(i => i.id !== pId);
        })

        if (remain == 1) {
            if (param.pageN == pages[pages.length - 1]) {
                const page = pages[pages.length - 1] - 1;
                const path = `/merchandise/page/${page}`;
                navigate(path);
            }
        }
    }

    const mIndex = (idx) => {
        // mark (limit)
        return (currentPage - 1) * limit + idx + 1;
    }

    function onclick() {
        setItem(empty(item));
    }

    return (
        <>
            <div className="add">
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm btn-secondary" onClick={onclick}>
                    <span className="material-symbols-outlined md-18">新增</span>
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        display.map((m, idx) => (
                            <tr key={m.id}>
                                <td data-id={m.id} className="id left_round">{mIndex(idx)}</td>
                                <td className="title">{m.title}</td>
                                <td className="price">{m.price}</td>
                                <td className="brand">{m.brand}</td>
                                <td className="category right_round">{m.category}</td>
                                <td>
                                    <span className="material-symbols-outlined" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setItem(m)}>edit</span>
                                    <span className="material-symbols-outlined" onClick={() => handleDelete(m.id)}>
                                        delete
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

