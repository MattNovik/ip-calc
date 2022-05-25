import React, { useEffect, useState } from "react";
import './index.scss';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PaymentShedule = (dataInfo) => {
  const [infoData, setInfoData] = useState({});

  useEffect(() => {
    setInfoData(dataInfo);
  })

  return (
    <div className="payment-shedule">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
            width={500}
            height={300}
            data={infoData.dataInfo}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width={90} tickFormatter={tick => {return tick.toLocaleString();}} />
            <Legend iconType="circle"/>
            <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)}/>
            <Area type="monotone" name="Погашение долга" dataKey="rub" stackId="1" stroke="#8884d8" fill="#8884d8" unit=" руб."/>
            <Area type="monotone" name="Погашение процентов" dataKey="rubDop" stackId="1" stroke="#82ca9d" fill="#82ca9d" unit=" руб."/>
          </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PaymentShedule;