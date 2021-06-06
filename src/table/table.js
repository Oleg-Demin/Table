import caretDown from '../assets/caret-down-fill.svg';
import caretUp from '../assets/caret-up-fill.svg';
import caretLeft from '../assets/caret-left.svg';
import funnel from '../assets/funnel-fill.svg';
import SearchElement from '../search/search.js';
import React, {useState} from 'react';
import './table.css'


const Table = ({data, sortData, direction, nameField}) => {
    
    const caret = (index) =>{
        
        if (nameField === index){
            if (direction === -1){
                return(<img src={caretUp} alt="Up"/>);
            } else {
                return(<img src={caretDown} alt="Down"/>);
            }
        } else {
            return(<img src={caretLeft} alt="Left"/>);
        }
    }
    
    var [searchText, setSearchText] = useState('')
    const [index, setIndex] = useState('')

    const onSearchSend = (text) => {
        setSearchText(text);
    }

    const onIndex = (text) => {
        setIndex(text)
    }
    
    
    const getFilteredDate = (index) => {
      if (!searchText) {
        return data;
      } else {
        return data.filter(
            item => String(item[index]).toLowerCase().includes(searchText.toLowerCase())
        )
      }
    }
    
    const [inputIndex, setInputIndex] = useState('');
    const [searchElement, setSearchElement] = useState('');
    
    const creatingInput = (index) => {
        if (index === inputIndex) {
            setSearchElement('');
            setInputIndex('');
            //
        } else {
            setSearchElement(<SearchElement onSearchSend={onSearchSend} index={index} onIndex={onIndex}/>);
            setInputIndex(index);
        }
    }

    const viewInput = (index) => {
        if (index === inputIndex) {
            return searchElement;
        }
    }

    const filteredData = getFilteredDate(index); 

    // var filteredData = searchElement === '' ? data : getFilteredDate(index);     
    var i = 1;
    return(
        <div>
            <table className="table mt-3">
                <thead className="table-light">
                    <tr>
                        <th>
                            <div className="stick" onClick={()=> {sortData('#');}}>#</div>
                        </th>
                        <th>
                            <div className="stick">
                                <div onClick={()=> {sortData('id');}}>ID {caret('id')}</div>
                                <div className="d-flex justify-content-end">
                                    {viewInput('id')}
                                    <button type="button"
                                        className="btn btn-outline-light"
                                        onClick={() => creatingInput('id')}
                                        >
                                        <img src={funnel} alt="funnel"/>
                                    </button>
                                </div>
                            </div>
                        </th>
                        <th>
                             <div className="stick">
                                <div onClick={()=> {sortData('name');}}>Name {caret('name')}</div>
                                <div className="d-flex justify-content-end">
                                    {viewInput('name')}
                                    <button type="button"
                                        className="btn btn-outline-light"
                                        onClick={() => creatingInput('name')}
                                        >
                                        <img src={funnel} alt="funnel"/>
                                    </button>
                                </div>
                            </div>
                        </th>
                        <th>
                              <div>
                                <div onClick={()=> {sortData('phone');}}>Phone {caret('phone')}</div>
                                <div className="d-flex justify-content-end">
                                    {viewInput('phone')}
                                    <button type="button"
                                        className="btn btn-outline-light"
                                        onClick={() => creatingInput('phone')}
                                        >
                                        <img src={funnel} alt="funnel"/>
                                    </button>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item =>(
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
