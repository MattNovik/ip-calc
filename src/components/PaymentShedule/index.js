import React, { useEffect, useState } from "react";
import './index.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
          <YAxis width={100}/>
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Bar name="main" stackId="a" dataKey="rub" fill="#8884d8" unit="rub"/>
          <Bar name="perc" stackId="a" dataKey="rubDop" fill="red" unit="dop"/>
        </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PaymentShedule;