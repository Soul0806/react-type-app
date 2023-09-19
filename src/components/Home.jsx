import { Outlet } from "react-router-dom";
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
