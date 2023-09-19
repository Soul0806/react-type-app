import { useEffect, useState } from "react";
import { axi } from "../../lib/axios";
import { get, isEmpty } from "lodash";
import API from "../../api";

const getGroupData = (data) => {
    const groupData = {}

    data.map(item => {
        const date = item.createdAt;

        if (!groupData[date]) {
            return groupData[date] = []
        }

        return groupData[date].push(item);
    })

    return groupData;
}

const getTodo = async () => {
    const url = API.READ_JSONFILE;
    const fileName = 'static/todo.json';
    const payload = { fileName };
    const res = await axi.post(url, payload);
    const data = await res.data;
    const id = isEmpty(data) ? 0 : parseInt(data.at(-1).id) + 1
    // const groupData = getGroupData(data);

    // const todos = { alldata: data, groupData };
    // console.log(todos);
    return [id, data];
}

const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [id, setId] = useState(null);

    useEffect(() => {
        getTodo().then(([id, data]) => {
            setTodos(data);
            setId(id);
        })
    }, [])

    return { id, setId, todos, setTodos }
}

export default useTodos;