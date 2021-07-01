import React, { Component } from 'react';
import Table from './table/table.js';
import dataJson from './data/data.json';


class App extends Component {

  render() {

    const splitDate = dataJson.map(item => {
      const dateAndTime = item.date.split(' ')
      return {
        phone: item.phone,
        date: dateAndTime[0],
        time: dateAndTime[1]
      };
    });

    const joinFullName = dataJson.map(item => {
      return {
        fullName: [item.surname, item.name, item.patronymic].join(" "),
        phone: item.phone,
        date: item.date
      };
    });

    return (
      <div className="container-xxl">

        <div className="row">
          <div className="col">
            <Table
              data={dataJson}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <Table
              data={splitDate}
            />
          </div>
          <div className="col-8">
            <Table
              data={joinFullName}
            />
          </div>
        </div>

      </div>
    );
  }
}


export default App;
