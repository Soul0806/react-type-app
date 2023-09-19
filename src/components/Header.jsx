import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1 className="title"><Link to="/">Product</Link></h1>
            <nav>
                {/* <li>
                        <NavLink to="merchandise/page/1">產品</NavLink>
                    </li> */}
                <div className="navigate">
                    <div>
                        <NavLink to="tire/upstair/spec/12">庫存管理</NavLink>
                    </div>
                    <div>
                        <NavLink to="record">銷售</NavLink>
                    </div>
                    <div>
                        <NavLink to="todo">代辦清單</NavLink>
                    </div>
                    <div>
                        <NavLink to="csv">CSV</NavLink>
                    </div>

                </div>

                <h5 className="manage"><Link to="/backend">後台管理</Link></h5>

            </nav>

        </header>
    )
}