import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import SearchBar from './components/SearchBar'
import Search from './containers/Search'

class App extends Component {

    render() {
        return (
            <div>
                <SearchBar />
                <hr/>
                <Switch>
                    <Route path="/search" component={Search} />
                </Switch>
            </div>
        );
  }
}

export default withRouter(App)
