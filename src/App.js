import React, {Component} from 'react';
import Table from './table/table.js';
import dataJson from './data/data.json'


class App extends Component {
  
  state = {
    data: dataJson,
    direction: 1,
    nameField: ''
  }

  sortData = (field) => {
    const copyData = this.state.data.concat();
    const copyDirection = this.state.direction;
    const nameField = this.state.nameField;

    if (field === '#'){
      this.setState({
        data: dataJson,
        direction: 1,
        nameField: field
      })
      return;
    }

    if (field === nameField){
      copyData.sort(
        (a, b) => {return a[field] > b[field] ? copyDirection : -copyDirection}
      )
      this.setState({
        data: copyData,
        direction: -copyDirection,
        nameField: field
      })
    } else {
      copyData.sort(
        (a, b) => {return a[field] > b[field] ? 1 : -1}
      )
      this.setState({
        data: copyData,
        direction: -1,
        nameField: field
      })
    }
  } 
  
  render() {
    return (
      <div className="container-xxl">
          <Table
            data={this.state.data}
            sortData={this.sortData}
            direction={this.state.direction}
            nameField={this.state.nameField}
          />
      </div>
    );
  }
}


export default App;
