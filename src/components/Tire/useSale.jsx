import React, { useState, useEffect } from 'react'
import { dt } from '../../lib/helper';
import { axi } from '../../lib/axios';
import API from '../../api';

const d = dt.getTodayDate();

export async function getDbSale(date, init) {
  const url = API.READ_JSONFILE;
  const fileName = 'static/sale.json';
  const data = { fileName };
  const res = await axi.post(url, data);
  const allSale = await res.data;
  const id = parseInt(allSale.at(-1).id) + 1;

  if (!allSale) {
    const sale = init;
    return { id, sale };
  }

  const sale = allSale.filter(item => {
    if (item.date == date) {
      return item;
    }
  })

  return { id, sale, allSale };
}

function useSale(init = []) {
  const [allSale, setAllsale] = useState([]);
  const [dbSale, setDbSale] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    getDbSale(d, init).then(({ id, sale, allSale }) => {
      setId(id);
      setDbSale(sale)
      setAllsale(allSale)
    })
  }, [])

  // return [dbSale, setDbSale, id]
  return { allSale, setAllsale, dbSale, setDbSale, id }
}

export { useSale }