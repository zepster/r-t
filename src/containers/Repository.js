import React, { Component } from 'react';
import { SearchList } from '../components/SearchList'
import { connect } from 'react-redux';

export class Repository extends Component {


    render () {
        const {
            searchList,
            repository,
            page = "1"
        } = this.props;

        if (searchList.isLoading) {
            return <div>Loading... {repository} (page {page})</div>
        } else {
            return (
                <div>
                    {searchList.data.map(v =>
                        <SearchList key={v.id} repo={v}/>
                    )}
                </div>
            )
        }
    }
}

const mapStateToProps = (state, props) => {
    console.log({props})
    return {
        searchList: state.searchList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        search(string) {
            dispatch(string)
        }
    }}

export default connect(mapStateToProps, mapDispatchToProps)(Repository)