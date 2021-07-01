import React, { Component } from 'react';
import caretDown from '../assets/caret-down-fill.svg';
import caretLeft from '../assets/caret-left.svg';
import caretUp from '../assets/caret-up-fill.svg';
import funnel from '../assets/funnel-fill.svg';
import './table.css';


class Table extends Component {

    state = {
        sortDirection: 1,
        indexSort: '',

        data: this.props.data.concat(),
        dataKeys: Object.keys(this.props.data[0]),

        inputObjects: new Map(),
        inputContent: new Map(),
    }


    //Сортировка данных
    sortData = (index) => {

        const copyData = this.state.data.concat();

        if (index === '#') {
            this.setState({
                data: this.state.data,
                sortDirection: 1,
                indexSort: index
            })
            return;
        }

        if (index === this.state.indexSort) {
            copyData.sort(
                (a, b) => { return a[index] > b[index] ? this.state.sortDirection : -this.state.sortDirection }
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
    filteredData = (linesContent) => {
        let copyData = this.props.data.concat()
        for (let key of linesContent.keys()) {
            copyData = copyData.filter(
                item => String(item[key]).toLowerCase().includes(linesContent.get(key).toLowerCase())
            )
        }
        this.setState({ data: copyData })
    }

    // вывод шапки таблицы
    getHead = (keys) => {

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

            const input = <input
                type="text"
                className="form-control"
                onChange={(event) => {
                    this.state.inputContent.set(index, event.target.value) //
                }}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        this.filteredData(this.state.inputContent)
                    }
                }}
            />

            if (this.state.inputObjects.has(index)) {
                this.setState({/* Код работает корректно только при наличии пустого setState (магия) */ });
                this.state.inputObjects.delete(index);
                this.state.inputContent.delete(index);
                this.filteredData(this.state.inputContent)
            } else {
                this.setState({/* Код работает корректно только при наличии пустого setState (магия) */ });
                this.state.inputObjects.set(index, input);
            }
        }

        // Показ поля ввода в таблице
        const showInput = (index) => {
            return this.state.inputObjects.get(index)
        }

        // Возвращение шапки таблицы
        return (
            <tr>

                <th>
                    <div className="stick height pe-2" onClick={() => { this.sortData('#'); }}>#</div>
                </th>

                {keys.map(item => (
                    <th key={item}>
                        <div className="stick height">
                            <div className="nowrap pe-2" onClick={() => { this.sortData(item) }}>
                                {item[0].toUpperCase() + item.substr(1).toLowerCase()}
                                {showSortArrows(item)}
                            </div>
                            <div className="d-flex justify-content-end mt-1">
                                {showInput(item)}
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => createInput(item)}
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

    // Вывод контента таблицы
    getContent = (data, keys) => {
        let content = [];
        let number = 1;

        for (let i = 0; i < data.length; i++) {
            let line = [<td className="fw-bold" key={"#" + i.toString()}>{number++}</td>];
            const tableRow = data[i];
            for (let j = 0; j < keys.length; j++) {
                const elementIndex = keys[j];
                line.push(<td key={elementIndex.toString() + i.toString()}>{tableRow[elementIndex]}</td>)
            }
            content.push(<tr key={"line" + i.toString()}>{line}</tr>)
        }

        return content;
    };

    render() {
        return (
            <div className="table-responsive mt-3">
                <table className="table">
                    <thead className="table-light">
                        {this.getHead(this.state.dataKeys)}
                    </thead>
                    <tbody>
                        {this.getContent(this.state.data, this.state.dataKeys)}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default Table;
