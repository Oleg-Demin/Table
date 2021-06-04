// import down from '../assets/caret-down-fill.svg';
// import up from '../assets/caret-up-fill.svg';
// import left from '../assets/caret-left-fill.svg';
import React from 'react';


const Table = ({data, sortData, direction, nameField}) => {
    var i = 1;
    return(
        <table className="table mt-3">
        <thead className="table-info">
            <tr>
                <th onClick={()=> {sortData('#')}}>#</th>
                <th onClick={()=> {sortData('id')}}>ID ({nameField === 'id' ? direction : 0})</th>
                <th onClick={()=> {sortData('name')}}>Name ({nameField === 'name' ? direction : 0})</th>
                <th onClick={()=> {sortData('phone')}}>Phone ({nameField === 'phone' ? direction : 0})</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item =>(
                <tr key={item.id}>
                    <td className="fw-bold">{i++}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                </tr>
            ))}
        </tbody>
    </table>
    )
}

export default Table;
