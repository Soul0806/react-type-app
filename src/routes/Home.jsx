import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from './Header';

export default function Home() {

    return (
        <>
            <div id="container">
                <Header />
                <main>
                    <Outlet />
                </main>
            </div >
        </>
    );
}
