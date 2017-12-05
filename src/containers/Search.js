import React, { Component } from 'react';
import { SearchList } from '../components/SearchList'
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import { searchRepo, fetchPageNext, fetchPagePrev } from '../reducers/search'
import { push } from 'react-router-redux'

export class Search extends Component {

    constructor(props) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this)
        this.state = {
            repo: props.searchParams,
        };
    }

    componentWillReceiveProps(nextProps) {
        let { searchParams, searchRepo } = nextProps;
        if (this.state.repo !== searchParams) {
            this.setState({
                repo: searchParams
            });
            searchRepo(searchParams)
        }
    }

    onPageChange({page}, instance) {
        let { searchParams, searchRepo } = this.props;
        if (this.props.repoList.items.length ===0 && page === this.props.repoList.page) {
            searchParams && searchRepo(searchParams)
        } else {
            this.props.searchPath(`/search?repository=${searchParams}&page=${++page}`)
            if (page > this.props.repoList.page)
                this.props.fetchPageNext(this.props.repoList.nextPageUrl)
            else if (page < this.props.repoList.page)
                this.props.fetchPagePrev(this.props.repoList.prevPageUrl)
        }
    }

    render () {
        const {
            repoList,
        } = this.props;
        return (
            <SearchList
                repo={repoList.items}
                loading={repoList.isLoading}
                total={repoList.totalCount}
                next={this.onPageChange}
            />
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        repoList: state.repoList,
        searchParams: queryString.parse(props.location.search).repository
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchRepo(string) {
            dispatch(searchRepo(string))
        },
        fetchPageNext(string) {
            dispatch(fetchPageNext(string))
        },
        fetchPagePrev(string) {
            dispatch(fetchPagePrev(string))
        },
        searchPath(path) {
            dispatch(push(path))
        },
    }}

export default connect(mapStateToProps, mapDispatchToProps)(Search)