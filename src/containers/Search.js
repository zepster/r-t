import React, { Component } from 'react';
import SearchList from '../components/SearchList'
import Nav from '../components/Nav'
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { reposActions, getRepos } from '../reducers/repos';
import { getSearch } from '../reducers/search';
import { favoriteActions } from '../reducers/favorite';

export class Search extends Component {

    constructor() {
        super(...arguments);
        this.handlerNavClick = this.handlerNavClick.bind(this);
    }

    componentWillMount() {
        let { repository } = this.props;
        this.props.firebaseLoad()
        repository && this.props.searchRepo(this.props.repository, this.getPage());
    }

    componentWillUpdate(nextProps) {
        let { repository } = this.props;
        if (nextProps.repository !== repository) {
            return this.props.searchRepo(nextProps.repository, 1);
        }
    }

    handlerNavClick(page) {
        this.props.searchRepo(this.props.repository, page);
    }

    getPage() {
        return new URLSearchParams(this.props.location.search).get('page') || 1
    }

    render () {
        let { repos, repository } = this.props;
        let baseUrl = `?repository=${this.props.repository}`
        return (
            <div>
                <b onClick={this.showModal}>{repository}</b> {repos.isLoading
                ? "loading..."
                : <div>
                    { repos.failMsg && <p>{repos.failMsg}</p> }
                    <Nav
                        navigations={{
                            first: repos.firstUrl,
                            prev: repos.prevUrl,
                            next: repos.nextUrl,
                            last: repos.lastUrl,
                        }}
                        baseUrl={baseUrl}
                        handlerClick={this.handlerNavClick}
                    />
                    <hr />
                    <SearchList items={repos.data}/>
                </div>
                }

            </div>
        )
    }

}

const mapStateToProps = createSelector(
    getSearch,
    getRepos,
    (search, repos) => {
        return {
            repository: search.query,
            repos,
        }
    }
);

const mapDispatchToProps = {
    searchRepo: reposActions.fetchRepos,
    firebaseLoad: favoriteActions.loadFavorite
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)
