import React from 'react';

export class SearchBar extends React.Component {

    constructor() {
        super(...arguments);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let value = this.input.value.trim();
        this.props.handleSearch(value)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="Full repo name"
                        type="text"
                        ref={e => this.input = e}
                    />
                </form>
            </div>
        );
    }
}

export default SearchBar