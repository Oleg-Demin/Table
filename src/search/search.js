import React, { Component } from 'react';


class SearchElement extends Component {
    state = {string: ''}

    setSearchValue = event => {
        this.setState({string: event.target.value});
    }

    keyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.setSearchText(this.state.string);
            this.props.setIndexFiltered(this.props.index);
        }
    }

    render() {
        return(
            <input type="text"
            className="form-control"
            value={this.state.string}
            index={this.props.index}
            onChange={this.setSearchValue}
            onKeyPress={this.keyPress}
            />
        )
    }
}


export default SearchElement;
