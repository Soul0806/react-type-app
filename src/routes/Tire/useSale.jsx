import React, { useState, useEffect } from 'react'
import { dt, ajax_get } from '../../lib/helper';
import { axi } from '../../lib/axios';

const d = dt.getTodayDate();

export async function getDbSale(date, init) {
  const url = 'http://localhost:9000/io/readFile';
  const fileName = 'static/sale.json';
  const data = { fileName };
  const res = await axi.post(url, data);
  const result = await res.data;
  const id = parseInt(result.at(-1).id) + 1;

  if (!result) {
    const sale = init;
    return { id, sale };
  }

  const sale = result.filter(item => {
    if (item.date == date) {
      return item;
    }
  })

  return { id, sale };
}

function useSale(init = []) {
  const [dbSale, setDbSale] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    getDbSale(d, init).then(({ id, sale }) => {
      setId(id);
      setDbSale(sale)
    })
  }, [])

  return [dbSale, setDbSale, id]
}

export { useSale }