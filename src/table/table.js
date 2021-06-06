import caretDown from '../assets/caret-down-fill.svg';
import caretUp from '../assets/caret-up-fill.svg';
import caretLeft from '../assets/caret-left.svg';
import SearchElement from '../search/search.js';
import React from 'react';
// 6:36


const Table = ({data, sortData, direction, nameField, onSearchSend}) => {
    
    const caret = (ind) =>{
        
        if (nameField === ind){
            if (direction === -1){
                return(<img src={caretUp} alt="Up"/>);
            } else {
                return(<img src={caretDown} alt="Down"/>);
            }
        } else {
            return(<img src={caretLeft} alt="Left"/>);
        }
    }
    
    var i = 1;
    return(
        <div>
            <table className="table mt-3">
                <thead className="table-info">
                    <tr>
                        <th onClick={()=> {sortData('#');}}># </th>
                        <th onClick={()=> {sortData('id');}}>ID {caret('id')}</th>
                        <th onClick={()=> {sortData('name')}}>Name {caret('name')}</th>
                        <th onClick={()=> {sortData('phone')}}>Phone {caret('phone')}</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th><SearchElement onSearchSend={onSearchSend} indInput={'name'}/></th>
                        <th></th>
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
        </div>
    )
}

export default Table;
