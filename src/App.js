import React, {Component} from 'react';
import Table from './table/table.js';
import dataJson from './data/data.json'


class App extends Component {
  
  state = {
    data: dataJson,
    direction: 1,
    indexSort: ''
  }

  sortData = (index) => {
    const copyData = this.state.data.concat();
    // const copyDirection = this.state.direction;
    // const nameField = this.state.nameField;

    if (index === '#'){
      this.setState({
        data: dataJson,
        direction: 1,
        indexSort: index
      })
      return;
    }

    if (index === this.state.indexSort){
      copyData.sort(
        (a, b) => {
          if (a[index] > b[index]){
            return this.state.direction;
          } else {
            return -this.state.direction;
          }
        }
      )
      this.setState({
        data: copyData,
        direction: -this.state.direction,
        indexSort: index
      })
    } else {
      copyData.sort(
        (a, b) => {return a[index] > b[index] ? 1 : -1}
      )
      this.setState({
        data: copyData,
        direction: -1,
        indexSort: index
      })
    }
  }

  // Фильтрация значений на основании того, что было записано в input    
  filteredData = (indexFiltered, searchFiltered) => {
    return this.state.data.filter(
        item => String(item[indexFiltered]).toLowerCase().includes(searchFiltered.toLowerCase())
    )
  }
  
  render() {
    return (
      <div className="container-xxl">
          <Table
            // data={this.state.data}
            sortData={this.sortData}
            filteredData={this.filteredData}
            direction={this.state.direction}
            indexSort={this.state.indexSort}
          />
      </div>
    );
  }
}


export default App;
