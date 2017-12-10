import React from 'react';
import { connect } from 'react-redux';
import { searchActions } from '../../reducers/search'

export class SearchBar extends React.Component {

    constructor() {
        super(...arguments);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let value = this.input.value.trim();
        this.props.query !== value && this.props.handleSearch(value)
    }

    componentWillMount() {
        this.props.query && this.props.searchSetQuery(this.props.query)
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

export default connect(
    state => ({query: new URLSearchParams(state.router.location.search).get('repository')}),
    {
        handleSearch: searchActions.navigateToSearch,
        searchSetQuery: searchActions.searchSetQuery,
    }
)(SearchBar)