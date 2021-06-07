import React, {useState} from 'react';
import Table from './table/table.js';


function App() {
  
  const jsonData = require('./data/data.json');
  const [data, setData] = useState(jsonData);

  const [direction, setDirection] = useState(1); //asc
  const [nameField, setNameField] = useState('');

  // Сортировка данных
  const sortData = (field) => {

    if (field === '#'){
      setData(jsonData);
      setNameField(field)
      setDirection(1) //asc
      return;
    }

    const copyData = data.concat();
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
  }


  return (
    <div className="container-xxl">
        <Table
          data={data}
          sortData={sortData}
          direction={direction}
          nameField={nameField}
        />
    </div>
  );
}

export default App;
