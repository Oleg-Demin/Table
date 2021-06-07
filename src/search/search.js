import React, { useState } from 'react';


const SearchElement = ({onSearchText,index, onIndexFiltered}) => {
    const [string, setString] = useState('');

    const setSearchValue = event => {
        setString(event.target.value);
    }

    const keyPress = (e) => {
        if (e.key === 'Enter') {
            onSearchText(string);
            onIndexFiltered(index);
        }
    }

    return(
        <input type="text"
            className="form-control"
            value={string}
            index={index}
            onChange={setSearchValue}
            onKeyPress={keyPress}
        />
    )
}

export default SearchElement;