import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "./Table";

import _ from 'lodash'

function Paging() {
    const [home, setHome] = useState(null);

    const {pages} = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isAvtive =
        ({ isActive, isPending }) => {
            if (home && p == 1) {
                isActive = true;
            }
            return {
                fontWeight: isActive ? "bold" : "bold",
                color: isActive ? "red" : "black",
                cursor: isActive ? "text" : ""
            };
        }
        
    useEffect(() => {
        location.pathname == '/' ? setHome(true) : setHome(false);

    })

    function onclick(e) {
        if(e.target.className == 'prev') {
            navigate(`/merchandise/page/${_.first(pages)}`);
        }else {
            navigate(`/merchandise/page/${_.last(pages)}`);
        }
    }

    return (
        <div className="pages">
            <span className="prev" onClick={onclick}></span>
            {pages.map(p => (
                <span key={p}>
                    <NavLink style={isAvtive}
                        to={`page/${p}`}>{p} </NavLink>
                </span>
            ))}
            <span className="next" onClick={onclick}></span>
        </div>
    )
}

export default Paging;