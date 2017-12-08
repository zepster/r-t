import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { navigateToSearch, } from './reducers/search'
import SearchBar from './components/SearchBar'
import Search from './containers/Search'

class App extends Component {

    render() {
        return (
            <div>
                <SearchBar handleSearch={this.props.handelSearch} />
                <hr/>
                <Switch>
                    <Route path="/search" component={Search} />
                </Switch>
            </div>
        );
  }
}

const mapDispatchToProps = {
    handelSearch: navigateToSearch
}

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(App)
)
