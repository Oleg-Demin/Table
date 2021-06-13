import React, { Component } from 'react';


class SearchElement extends Component {
    state = {searchText: ''}

    setSearchValue = event => {
        this.setState({searchText: event.target.value});
    }

    keyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.setSearchText(this.state.searchText);
            this.props.setIndexFiltered(this.props.indexFiltered);
        }
    }

    render() {
        return(
            <input type="text"
            className="form-control"
            onChange={this.setSearchValue}
            onKeyPress={this.keyPress}
            />
        )
    }
}


export default SearchElement;
