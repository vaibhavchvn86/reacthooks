import React, { useState, useEffect } from 'react';
import './TableData.css';

function TableData() {
    const [alldata, setAlldata] = useState([]);

    useEffect(() => {
        getUserDetails();
    }, []);

    async function getUserDetails() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAlldata(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className='container mt-5 p-5'>
            <table className="table table-striped table-bordered table-responsive">
                <thead className="thead-dark">
                    <tr>
                        <th className='th_first' scope="col">Id</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Name</th>
                        <th scope="col">Current Price</th>
                        <th scope="col">Total Volume</th>
                        <th scope="col">Image</th>
                        <th className='th_last' scope="col">Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {alldata?.map((e, idx) => (
                        <tr key={idx}>
                            <th scope="row">{e?.id}</th>
                            <td>{e?.symbol}</td>
                            <td>{e?.name}</td>
                            <td>{e?.current_price}</td>
                            <td>{e?.total_volume}</td>
                            <td className='img-tag'>
                                <img src={e?.image} alt={e?.name} className='w-25 img-fluid' />
                            </td>
                            <td>{e?.last_updated}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableData;
