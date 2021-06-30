import React, {Component} from 'react';
import Table from './table/table.js';
import dataJson from './data/data.json'


class App extends Component {
  
  render() {

    // Необходимо чтобы индексы были уникальными (поэтому нет необходимости в id)
    const tableColumns1 = [
      { index: "id", name: "Id"},
      { index: "surname", name: "Фамилия"},
      { index: "name", name: "Имя"},
      { index: "patronymic", name: "Отчество"},
      { index: "phone", name: "Телефон"},
      { index: "date", name: "Дата"},
    ]

    const tableColumns2 = [
      // { index: "id", name: "Id"},
      { index: "name", name: "Имя"},
      { index: "surname", name: "Фамилия"},
      // { index: "patronymic", name: "Отчество"},
      // { index: "phone", name: "Телефон"},
      // { index: "date", name: "Дата"},
    ]

    const tableColumns3 = [
      // { index: "id", name: "Id"},
      // { index: "surname", name: "Фамилия"},
      // { index: "name", name: "Имя"},
      // { index: "patronymic", name: "Отчество"},
      { index: "phone", name: "Телефон"},
      { index: "date", name: "Дата"},
    ]

    return (
      <div className="container-xxl">

        <div className="row">
          <div className="col">
            <Table
              data = {dataJson}
              columns = {tableColumns1}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <Table
              data = {dataJson}
              columns = {tableColumns2}
            />
          </div>
          <div className="col-8">
            <Table
              data = {dataJson}
              columns = {tableColumns3}
            />
          </div>
        </div>

      </div>
    );
  }
}


export default App;
