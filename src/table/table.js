import caretDown from '../assets/caret-down-fill.svg';
import caretUp from '../assets/caret-up-fill.svg';
import caretLeft from '../assets/caret-left.svg';
import funnel from '../assets/funnel-fill.svg';
import React, { Component } from 'react';
import './table.css'


class Table extends Component {
    state = {
        searchElement: null,
        indexElement: '',
        
        searchFiltered: '',
        indexFiltered: '',
    }

    // Метод создание стрелки "направления фильтрации"
    caret = (index) =>{
        if (this.props.indexSort === index){
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
    createInput = (index) => {
        if (index === this.state.indexElement) {
            this.setState({
                searchElement: null,
                indexElement: '',
                searchFiltered: ''
            })
        } else {
            this.setState({
                searchElement:
                    <input
                        type="text"
                        className="form-control"
                        onChange={this.onChange}
                        onKeyPress={this.onKeyPress}
                    />,
                indexElement: index,
                searchFiltered: ''
            })
        }
    }

    // Методы отвечающие за заполнение полей: "текст по которому будет проведена фильтрация"
    // и "индекс поля ввода по которому будет проведена фильтрация"
    contentInput = ''; //
    onChange = event => {
        this.contentInput = event.target.value;
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({searchFiltered: this.contentInput});
            this.setState({indexFiltered: this.state.indexElement});
        }
    }

    // Вывод (показ) поля вода в таблице
    viewInput = (index) => {
        if (index === this.state.indexElement) {
            return this.state.searchElement;
        }
    }

    // Создание заполнения заголовка столбца
    createColumnHeader  = (index, name) => {
        return(
            <div className="stick height">
                <div className="nowrap pe-2" onClick={()=> {this.props.sortData(index)}}>
                        {name}
                        {this.caret(index)}
                </div>
                <div className="d-flex justify-content-end mt-1">
                    {this.viewInput(index)}
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => this.createInput(index)}
                    >
                        <img src={funnel} alt="funnel"/>
                    </button>
                </div>
            </div>
        )
    }

    render() {
        const finishData = this.props.filteredData(this.state.indexFiltered, this.state.searchFiltered)

        var i = 1;
        return(
            <div className="table-responsive mt-3">
                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th>
                                <div className="stick height pe-2" onClick={()=> {this.props.sortData('#');}}>#</div>
                            </th>
                            <th>
                                {this.createColumnHeader('id', 'ID')}
                            </th>
                            <th>
                                {this.createColumnHeader('surname', 'Surname')}
                            </th>
                            <th>
                                {this.createColumnHeader('name', 'Name')}
                            </th>
                            <th>
                                {this.createColumnHeader('patronymic', 'Patronymic')}
                            </th>
                            <th>
                                {this.createColumnHeader('phone', 'Phone')}
                            </th>
                            <th>
                                {this.createColumnHeader('date', 'Date')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {finishData.map(item =>(
                            <tr key={item.id}>
                                <td className="fw-bold">{i++}</td>
                                <td>{item.id}</td>
                                <td>{item.surname}</td>
                                <td>{item.name}</td>
                                <td>{item.patronymic}</td>
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
