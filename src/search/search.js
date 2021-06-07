import React, { useState } from 'react';


const SearchElement = ({onSearchSend,index, onIndex}) => {
    const [string, setString] = useState('');

    const setSearchValue = event => {
        setString(event.target.value);
    }

    const keyPress = (e) => {
        if (e.key === 'Enter') {
            onSearchSend(string);
            onIndex(index);
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