import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchField } from './components/SearchField'
import Search from './containers/Search'
import { Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
import * as queryString from 'query-string';
import { searchRepo as searchRepoAction} from './reducers/search'

class App extends Component {

    constructor(props) {
        super(props)
        this.onHandleClick = this.onHandleClick.bind(this);
    }

    onHandleClick(value) {
        if (!value) return;
        const { searchRepo } = this.props;
        searchRepo(value);
    }

    render() {
        return (
            <div>
                <SearchField onClick={this.onHandleClick} defaultValue={this.props.searchParams.repository} />
                <hr/>
                <Switch>
                    <Route path="/search" render={props => <Search {...this.props.searchParams}/>}/>
                </Switch>
            </div>
        );
  }
}

const mapStateToProps = state => ({
    location: state.router.location,
    searchParams: queryString.parse(state.router.location.search)
})

const mapDispatchToProps  = (dispatch) => {
    return {
        searchRepo(string) {
            dispatch(searchRepoAction(string))
        }
    }}

export default connect(mapStateToProps, mapDispatchToProps)(App)
