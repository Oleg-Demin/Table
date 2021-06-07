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
    

    //Создание поля ввода    
    const [inputIndex, setInputIndex] = useState('');
    const [searchElement, setSearchElement] = useState('');
    
    const creatingInput = (index) => {
        if (index === inputIndex) {
            setSearchElement('');
            setInputIndex('');
        } else {
            setSearchElement(<SearchElement onSearchSend={onSearchSend} index={index} onIndex={onIndex}/>);
            setInputIndex(index);
            setSearchText(''); //обнуляем строку поиска (мы создали новый input, что там было в старом нас не интересует)
        }
    }

    const viewInput = (index) => {
        if (index === inputIndex) {
            return searchElement;
        }
    }

    // console.log(inputIndex)
    // console.log(indexFiltered)
    // console.log(inputIndex === indexFiltered)
    // console.log(searchElement === '')

    // Фильтрация значений на основании того, что было записано в input
    const [searchText, setSearchText] = useState('')
    const [indexFiltered, setIndexFiltered] = useState('')

    const onSearchSend = (text) => {
        setSearchText(text);
    }

    const onIndex = (text) => {
        setIndexFiltered(text)
    }
    
    
    const getFilteredDate = (index) => {
      if (inputIndex !== indexFiltered) {
        return data;
      } else {
        return data.filter(
            item => String(item[index]).toLowerCase().includes(searchText.toLowerCase())
        )
      }
    }

    const filteredData = getFilteredDate(indexFiltered);
    
    // Возврат таблицы
    var i = 1;
    return(
        <div>
            <table className="table mt-3">
                <thead className="table-light">
                    <tr>
                        <th>
                            <div className="stick height" onClick={()=> {sortData('#');}}><span>#</span></div>
                        </th>
                        <th>
                            <div className="stick height">
                                <div onClick={()=> {sortData('id');}}>ID {caret('id')}</div>
                                <div className="d-flex justify-content-end mt-1">
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
                             <div className="stick height">
                                <div onClick={()=> {sortData('name');}}>Name {caret('name')}</div>
                                <div className="d-flex justify-content-end mt-1">
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
                              <div className="height">
                                <div onClick={()=> {sortData('phone');}}>Phone {caret('phone')}</div>
                                <div className="d-flex justify-content-end mt-1">
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
