import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1 className="title"><Link to="/">Product</Link></h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="merchandise/page/1">產品</NavLink>
                    </li>
                    <li>
                        <NavLink to="tire/upstair/spec/12">庫存管理</NavLink>
                    </li>    
                    <li>
                        <NavLink to="record">銷售</NavLink>
                    </li>
                    <li>
                        <NavLink to="csv">CSV</NavLink>
                    </li>               
                </ul>
            </nav>
            <h5 className="manage"><Link to="/backend">後台管理</Link></h5>
        </header>
    )
}