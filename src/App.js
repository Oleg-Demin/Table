import React, {useState} from 'react';
import Table from './table/table.js';
// 6:36

function App() {
  
  const jsonData = require('./data/data.json');
  const [data, setData] = useState(jsonData);

  const [direction, setDirection] = useState(1); //asc
  const [nameField, setNameField] = useState('');

  const sortData = (field) => {

    if (field === '#'){
      setData(jsonData);
      setNameField(field)
      setDirection(1) //asc
      return;
    }

    const copyData = filteredData.concat();
    if (field === nameField){
      copyData.sort(
        (a, b) => {return a[field] > b[field] ? direction : -direction}
      )
      
      setDirection(-direction);
    } else {
      copyData.sort(
        (a, b) => {return a[field] > b[field] ? 1 : -1}
      )
      
      setDirection(-1);
    }

    setData(copyData);
    setNameField(field)

    // console.log(nameField === field)
    // console.table(copyData);
    // console.log(field);
    // console.log(direction)
  }

  const [searchText, setSearchText] = useState('')

  const onSearchSend = (text) => {
    setSearchText(text);
  }

  const getFilteredDate = (ind) => {
    if (!searchText) {
      return data;
    } else {
      return data.filter(
        el => el[ind].includes(searchText)
      )
    }
  }

  const filteredData = getFilteredDate('name');

  return (
    <div className="container-xxl">
        <Table
          data={filteredData}
          sortData={sortData}
          direction={direction}
          nameField={nameField}
          onSearchSend={onSearchSend}
        />
    </div>
  );
}

export default App;
