import React, { Component } from 'react';
import { Search } from './containers'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { SearchField } from './components/SearchField'


class App extends Component {

    constructor(props) {
        super(props)
        this.onHandleClick = this.onHandleClick.bind(this)
    }

    onHandleClick(value) {
        console.log(value)
    }

    render() {
    return (
        <div>
            <SearchField onClick={this.onHandleClick}/>
            <Route path="/search" component={Search} />
        </div>
    );
  }
}

export default withRouter(connect()(App));
