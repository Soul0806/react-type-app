import { Component } from 'react';
import { Form } from 'react-router-dom';
import { ajax_importJson } from '../../lib/helper';
const HOST_URL = 'https://localhost:7123';
const WRITE_ACTION = `${HOST_URL}/write/`

export async function action({ request }) {
    const formData = Object.fromEntries(await request.formData());
    const rebuild = formData.rebuild;
    const url = `${WRITE_ACTION}${rebuild}`;
    ajax_importJson(url);
    return {}
}
export default function Backend() {
    const test = true;
    return (
        <>
            <div>
                <Form method="post">
                    <select name="rebuild">
                        <option value=""> --------</option>
                        <option value="30"> 重建30筆</option>
                        <option value="50"> 重建50筆</option>
                        <option value="100">重建100筆</option>
                    </select>
                    <select name="mode">
                        <option value="fix"> 固定</option>
                        <option value="fix"> 隨機</option>
                    </select>
                    <button className="" value="submit">確定</button>
                </Form>
            </div>
        </>
    )
}

