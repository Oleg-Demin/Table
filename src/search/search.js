import React, { useState } from 'react';
// 6:36

// const 

const SearchElement = ({onSearchSend}) => {
    const [string, setString] = useState('');

    const setSearchValue = event => {
        setString(event.target.value);
    }

    const keyPress = (e) => {
        if (e.key === 'Enter') {
            onSearchSend(string)
        }
    }

    return(
        <div>
            <div className="input-group mt-3">
                <input type="text"
                    className="form-control"
                    value={string}
                    onChange={setSearchValue}
                    onKeyPress={keyPress}
                />
            </div>
        </div>
    )
}

export default SearchElement;