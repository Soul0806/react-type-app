import React, { useEffect, useState, memo  } from 'react'
import { NavLink, Link, useParams } from 'react-router-dom'

import { areas } from './useTire';

const Area = () => {
    const param = useParams();
    function theme(areaName) {
        return { color: param.area == areaName ? 'red' : 'rgb(202, 199, 199)' }
    }

    return (
        <div className="area-wrapper">
            {areas.map((area) => {
                const to = `${area.path}/spec/${param.inch}`;
                return <Link to={to} key={to} style={theme(area.path)}>{area.name}</Link>
            }
            )}
        </div>
    )
}

export default Area