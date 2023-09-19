import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from './Tire';


function Note() {

    const { note } = useContext(AppContext);
    let el = [];
    window.onload = () => {
        const div = document.querySelector(".note");
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((record) => {
                // console.log(record);
            });
        });

        observer.observe(div, {
            childList: true,
            attributes: true,
            characterData: true,
        });
    }

    return (
        <div className="note-wrapper">
            <div className="note">
            </div>
        </div>

    )
}

export default Note