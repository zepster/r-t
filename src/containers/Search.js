import React, { Component } from 'react';
import SearchList from '../components/SearchList'
import Nav from '../components/Nav'
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { reposActions, getRepos } from '../reducers/repos';

export class Search extends Component {

    constructor() {
        super(...arguments);
        this.handlerNavClick = this.handlerNavClick.bind(this);
    }

    componentWillMount() {
        let { repository, page } = this.props;
        repository && this.props.searchRepo(this.props.repository, page); // page
    }

    componentWillUpdate(nextProps) {
        let { repository, page } = this.props;
        if (nextProps.repository !== repository) {
            return this.props.searchRepo(this.props.repository, 1);
        } else if (nextProps.page !== page) {
            return this.props.fetchPage(this.props.repository);
        }
    }

    handlerNavClick(value) {
        return {
            pathname: '/search',
            search: `?repository=${this.props.repository}&page=${value}`
        }
    }

    render () {
        let { repos, repository, navigation } = this.props;
        console.log("Search render!")
        return (
            <div>
                {repository} {repos.isLoading && "loading..."}
                {/*<Nav navigation={navigation} handlerNavClick={this.handlerNavClick}/>*/}
                <hr />
                <SearchList items={repos.data}/>
            </div>
        )
    }

}

const mapStateToProps = createSelector(
    (state, props) => new URLSearchParams(props.location.search).get('repository'), // ?
    (state, props) => new URLSearchParams(props.location.search).get('page'),   // ?
    getRepos,
    (repository, page, repos) => {
        return {
            repository,
            page,
            repos,
            // navigation: {
            //     first: repos.firstPageUrl,
            //     prev: repos.prevPageUrl,
            //     next: repos.nextPageUrl,
            //     last: repos.lastPageUrl,
            // }
        }
    }
);

const mapDispatchToProps = {
    searchRepo: reposActions.fetchRepos,
    fetchPage: reposActions.fetchPage,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)
