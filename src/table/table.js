import caretDown from '../assets/caret-down-fill.svg';
import caretUp from '../assets/caret-up-fill.svg';
import caretLeft from '../assets/caret-left.svg';
import funnel from '../assets/funnel-fill.svg';
import SearchElement from '../search/search.js';
import React, { Component } from 'react';
import './table.css'


class Table extends Component {
    state = {
        searchElement: null,
        indexElement: '',
        searchText: '',
        indexFiltered: ''
    }

    // Метод создание стрелки "направления фильтрации"
    caret = (index) =>{
        if (this.props.nameField === index){
            if (this.props.direction === -1){
                return(<img src={caretUp} alt="Up"/>);
            } else {
                return(<img src={caretDown} alt="Down"/>);
            }
        } else {
            return(<img src={caretLeft} alt="Left"/>);
        }
    }

    // Создание поля ввода
    setSearchText = searchText => {
        this.setState({searchText})
    }
    
    setIndexFiltered = indexFiltered => {
        this.setState({indexFiltered})
    }

    creatingInput = (index) => {
        if (index === this.state.indexElement) {
            this.setState({
                searchElement: null,
                indexElement: '',
                searchText: ''
            })
        } else {
            this.setState({
                searchElement: <SearchElement
                    setSearchText={this.setSearchText}
                    index={index}
                    setIndexFiltered={this.setIndexFiltered}
                    />,
                indexElement: index,
                searchText: ''
            })
        }
    }

    // Вывод (показ) поля вода в таблице
    viewInput = (index) => {
        if (index === this.state.indexElement) {
            return this.state.searchElement;
        }
    }

    // Фильтрация значений на основании того, что было записано в input    
    getFilteredDate = (index) => {
      if (this.state.indexElement !== this.state.indexFiltered) {
        return this.props.data;
      } else {
        return this.props.data.filter(
            item => String(item[index]).toLowerCase().includes(this.state.searchText.toLowerCase())
        )
      }
    }

    render() {

        const filteredData = this.getFilteredDate(this.state.indexFiltered);
        var i = 1;
        return(
            <div>
                <table className="table mt-3">
                    <thead className="table-light">
                        <tr>
                            <th>
                                <div className="stick height" onClick={()=> {this.props.sortData('#');}}><span>#</span></div>
                            </th>
                            <th>
                                <div className="stick height">
                                    <div onClick={()=> {this.props.sortData('id');}}>ID {this.caret('id')}</div>
                                    <div className="d-flex justify-content-end mt-1">
                                        {this.viewInput('id')}
                                        <button type="button"
                                            className="btn btn-outline-light"
                                            onClick={() => this.creatingInput('id')}
                                            >
                                            <img src={funnel} alt="funnel"/>
                                        </button>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="stick height">
                                    <div onClick={()=> {this.props.sortData('name');}}>Name {this.caret('name')}</div>
                                    <div className="d-flex justify-content-end mt-1">
                                        {this.viewInput('name')}
                                        <button type="button"
                                            className="btn btn-outline-light"
                                            onClick={() => this.creatingInput('name')}
                                            >
                                            <img src={funnel} alt="funnel"/>
                                        </button>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="stick height">
                                    <div onClick={()=> {this.props.sortData('phone');}}>Phone {this.caret('phone')}</div>
                                    <div className="d-flex justify-content-end mt-1">
                                        {this.viewInput('phone')}
                                        <button type="button"
                                            className="btn btn-outline-light"
                                            onClick={() => this.creatingInput('phone')}
                                            >
                                            <img src={funnel} alt="funnel"/>
                                        </button>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="height">
                                    <div onClick={()=> {this.props.sortData('date');}}>Date {this.caret('date')}</div>
                                    <div className="d-flex justify-content-end mt-1">
                                        {this.viewInput('date')}
                                        <button type="button"
                                            className="btn btn-outline-light"
                                            onClick={() => this.creatingInput('date')}
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
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default Table;
