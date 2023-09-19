import { createRef, useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate, useMatch } from 'react-router-dom';

import { ajax_post, ajax_put, lowerize } from '../lib/helper';

import { AppContext } from "./Table";

const API_URL = 'https://localhost:7123/api/merchandise';


function Popup() {
    
    const {item, setItem, remain, pages, all, setAll, showDisplay} = useContext(AppContext);

    const navigate = useNavigate();
    const location = useLocation();

    const handleInputChange = (e) => {
        setItem(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleSubmit = (e) => {
        var myModalEl = document.getElementById('exampleModal')
        var modal = bootstrap.Modal.getInstance(myModalEl)

        e.preventDefault();
        let data, url, path;

        if (item.id == '') {
            data = { Title: item.title, Price: item.price, Brand: item.brand, Category: item.category, Thumbnail: item.thumbnail };

            let page = (remain == 0) ? pages[pages.length -1] + 1 : pages[pages.length - 1] ;
            let path = `/merchandise/page/${page}`;
            ajax_post(API_URL, data);

            setAll((prev) => {
                return [...prev, lowerize({ ...data, id: all[all.length - 1].id + 1 })]
            })
            navigate(path);
            showDisplay(page);
        
        } else {
            data = { ID: item.id, Title: item.title, Price: item.price, Brand: item.brand, Category: item.category, Thumbnail: item.thumbnail };

            setAll(
                all.map(i => {
                    if(i.id == item.id) 
                        return lowerize(data)
                    return i;
                })
            )
            ajax_put(API_URL, data);
        }
        modal.toggle();
    }
   
    return (
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{item.id ? "編輯" : "新增"}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onclick}></button>
                    </div>
                    <form key={item.id} method="post" onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {item.id ?
                                (<div className="mb-3">
                                    <h5>編號 : <span>{item?.id}</span></h5>
                                </div>) : ""}
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="title" value={item.title} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="price" value={item.price} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="brand" value={item.brand} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="category" value={item.category} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label"></label>
                                <input type="text" name="thumbnail" value={item.thumbnail} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit"
                                className="btn btn-primary">Send message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Popup;