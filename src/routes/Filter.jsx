export default function Filter({ onchange }) {
    return (
        <aside>
        <div className="keyword">
            <label>關鍵字</label>
            <input type="text" name="keyword" autoComplete="off" onChange={onchange}/>
        </div>

        <div className="brand">
            <input type="checkbox" />
            <label htmlFor="">品牌</label>
            <select>
                <option value="">-----</option>
                <option value=""></option>
                <option value=""></option>
            </select>
        </div>

        <div className="category">
            <input type="checkbox" />
            <label htmlFor="">類型</label>
            <select>
                <option value="">-----</option>
                <option value=""></option>
                <option value=""></option>
            </select>
        </div>

        <div className="price">
            <input type="checkbox" />
            <label htmlFor="">價格</label>
            <input type="text" />
        </div>
    </aside>
    )
}