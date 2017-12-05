import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchField } from './components/SearchField'
import Search from './containers/Search'
import { Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
import * as queryString from 'query-string';
import { searchRepo } from './reducers/search'

class App extends Component {

    constructor(props) {
        super(props)
        this.onHandleClick = this.onHandleClick.bind(this);
    }

    onHandleClick(value, page = 1) {
        if (!value) return;
        const { search } = this.props;
        search(`/search?repository=${value}&page=${page}`);
    }

    render() {
        return (
            <div>
                <SearchField onClick={this.onHandleClick} defaultValue={this.props.repo} />
                <hr/>
                <Switch>
                    <Route path="/search" component={Search} />
                </Switch>
            </div>
        );
  }
}


const mapStateToProps = state => ({
    // search: state.router.location.search,
    repo: queryString.parse(state.router.location.search).repository
})

const mapDispatchToProps  = (dispatch) => {
    return {
        search(path) {
            dispatch(push(path))
        },
        searchRepo(string) {
            dispatch(searchRepo(string))
        }
    }}

export default connect(mapStateToProps, mapDispatchToProps)(App)
