import React, { useState, createContext, useReducer, useRef, useEffect, useMemo } from 'react'
import { Outlet, useParams } from 'react-router-dom';

import _ from 'lodash';

import { useTire } from './useTire';
import Inch from './Inch';
import Area from './Area';
import { isObjectEmpty } from '../../lib/helper';

export const AppContext = createContext();

function Tire() {
  const param = useParams();
  const ref = useRef([]);

  const [specs, setSpecs] = useState([]);
  const [inches, setInches, areas] = useTire();

  useEffect(() => {
    setSpecs(Object.keys(JSON.parse(localStorage.getItem(param.area))[12]['spec']))
  }, [])

  function inchClick(specs) {
    setSpecs(specs.sort());
  }

  return (
    <div className="tire">
      {!isObjectEmpty(inches) &&       
        <AppContext.Provider value={{ specs, inches, setInches, areas }}>
          <Area />
          <Inch onclick={inchClick} />
          <Outlet context={{ ref }} />
        </AppContext.Provider>
      }
    </div>
  )
}

export default Tire