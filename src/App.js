import React, {useState} from 'react';
import Table from './table/table.js';

function App() {
  
  const jsonData = require('./data/data.json');
  const [data, setData] = useState(jsonData);
  // console.table(jsonData);
  // console.table(data);

  const [direction, setDirection] = useState(1); //asc
  const [nameField, setNameField] = useState("");

  const sortData = (field) => {

    if (field === '#'){
      setData(jsonData);
      setNameField(field)
      setDirection(1) //asc
      return;
    }

    const copyData = jsonData.concat();
    copyData.sort(
      (a, b) => {return a[field] > b[field] ? direction : -direction}
    )

    setData(copyData);
    setNameField(field)

    setDirection(-direction); //один и в самом конце
    // console.log(nameField === field)
    // console.table(copyData);
    // console.log(field);
    // console.log(direction)
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
