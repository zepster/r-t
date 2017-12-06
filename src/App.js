import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchField } from './components/SearchField'
import Search from './containers/Search'
import { Route, withRouter, Switch } from 'react-router-dom';
import { navigateToSearch } from './reducers/search'

class App extends Component {

    render() {
        return (
            <div>
                <SearchField
                    handelSearch={this.props.handelSearch}
                />
                <hr/>
                <Switch>
                    <Route path="/search" component={Search}/>
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
