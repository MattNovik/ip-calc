import React, { useEffect, useState, useReducer } from "react";
import './index.scss';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PaymentShedule = (dataInfo) => {
  const [infoData, setInfoData] = useState({});

  useEffect(() => {
    setInfoData(dataInfo);
  })

  return (
    <div className="payment-shedule">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={infoData.dataInfo}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Bar name="руб. в месяц" dataKey="rub" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PaymentShedule;