import React, { Component } from 'react';
import caretDown from '../assets/caret-down-fill.svg';
import caretLeft from '../assets/caret-left.svg';
import caretUp from '../assets/caret-up-fill.svg';
import funnel from '../assets/funnel-fill.svg';
import './table.css';


class Table extends Component {
    
    state = {
        inputField: null,
        inputFieldIndex: '',

        filterString: '',

        sortDirection: 1,
        indexSort: '',

        data: this.props.data
    }

    //Сортировка данных
    sortData = (index) => {

        const copyData = this.props.data.concat();

        if (index === '#') {
            this.setState({
                data: this.props.data,
                sortDirection: 1,
                indexSort: index
            })
            return;
        }

        if (index === this.state.indexSort) {
            copyData.sort(
                (a, b) => { return a[index] > b[index] ? this.state.sortDirection : -this.state.sortDirection}
            )
            this.setState({
                data: copyData,
                sortDirection: -this.state.sortDirection,
                indexSort: index
            })
        } else {
            copyData.sort(
                (a, b) => { return a[index] > b[index] ? 1 : -1 }
            )
            this.setState({
                data: copyData,
                sortDirection: -1,
                indexSort: index
            })
        }

    }

    // Фильтрация данных    
    filteredData = (inputFieldIndex, filterString) => {
        return this.state.data.filter(
            item => String(item[inputFieldIndex]).toLowerCase().includes(filterString.toLowerCase())
        )
    }

    // вывод шапки таблицы
    getHead = (columns) => {

        // Создание стрелки "направления фильтрации"
        const showSortArrows = (index) => {
            if (this.state.indexSort === index) {
                if (this.state.sortDirection === -1) {
                    return (<img src={caretUp} alt="Up" />);
                } else {
                    return (<img src={caretDown} alt="Down" />);
                }
            } else {
                return (<img src={caretLeft} alt="Left" />);
            }
        }

        // Создание поля ввода
        const createInput = (index) => {
            let contentInput = ""

            if (index === this.state.inputFieldIndex) {
                this.setState({
                    inputField: null,
                    inputFieldIndex: '',
                    filterString: ''
                })
            } else {
                this.setState({
                    inputField:
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) => {
                                contentInput = event.target.value;
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    this.setState({ filterString: contentInput });
                                }
                            }}
                        />,
                    inputFieldIndex: index,
                    filterString: ''
                })
            }
        }

        // Показ поля ввода в таблице
        const showInput = (index) => {
            if (index === this.state.inputFieldIndex) {
                return this.state.inputField;
            }
        }

        // Возвращение шапки таблицы
        return (
            <tr>

                <th>
                    <div className="stick height pe-2" onClick={() => { this.sortData('#'); }}>#</div>
                </th>

                {columns.map(item => (
                    <th key={item.index}>
                        <div className="stick height">
                            <div className="nowrap pe-2" onClick={() => { this.sortData(item.index) }}>
                                {item.name}
                                {showSortArrows(item.index)}
                            </div>
                            <div className="d-flex justify-content-end mt-1">
                                {showInput(item.index)}
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => createInput(item.index)}
                                >
                                    <img src={funnel} alt="funnel" />
                                </button>
                            </div>
                        </div>
                    </th>
                ))}

            </tr>
        )
    }

    // Вывод контента таблицы (НАДО ЗАМЕНИТЬ ВСЕ НАИМЕНОВАНИЯ)
    getContent = (data, columnIndices) => {
        let content = [];
        let a = 1;
        // let key = 0;

        for (let i = 0; i < data.length; i++) {
            let line = [<td className="fw-bold" key={"#" + i.toString()}>{++a}</td>];
            // console.log("#" + i.toString())
            const tableRow = data[i];
            for (let j = 0; j < columnIndices.length; j++) {
                const elementIndex = columnIndices[j];
                line.push(<td key={elementIndex.toString() + i.toString()}>{tableRow[elementIndex]}</td>)
                // console.log(elementIndex.toString() + i.toString())
            }
            content.push(<tr key={"line" + i.toString()}>{line}</tr>)
            // console.log("line" + i.toString())
        }

        return content;
    };

    render() {

        const finishData = this.filteredData(this.state.inputFieldIndex, this.state.filterString)

        const columnIndices = [];
        this.props.columns.map(item => (columnIndices.push(item.index)))

        return (
            <div className="table-responsive mt-3">
                <table className="table">
                    <thead className="table-light">
                        {this.getHead(this.props.columns)}
                    </thead>
                    <tbody>
                        {this.getContent(finishData, columnIndices)}
                    </tbody>
                </table>
            </div>
        )
        
    }
}


export default Table;
