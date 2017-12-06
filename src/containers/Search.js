import React, { Component } from 'react';
import SearchList from '../components/SearchList'
import Btn from '../components/Btn'
import { connect } from 'react-redux';
import { searchRepo, fetchPage, toggleFavorite } from '../reducers/repolist';
import ReactModal from 'react-modal';

ReactModal.setAppElement('body');

export class Search extends Component {

    constructor () {
        super();
        this.state = {
            showModal: false,
            modalItem: {}
        };

        this.onCloseModal = this.onCloseModal.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onPageChange = this.onPageChange.bind(this)
        this.onFavorite = this.onFavorite.bind(this)
    }

    componentWillMount() {
        this.props.searchText && this.props.searchRepo(this.props.searchText);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.searchRepo(nextProps.searchText);
        }
    }

    onPageChange(to) {
        to && this.props.fetchPage(to)
    }

    onCloseModal () {
        this.setState({ showModal: false, modalItem: {} });
    }

    onOpenModal (item) {
        this.setState({ showModal: true, modalItem: item });
    }

    onFavorite () {
        this.props.toggleFavorite(this.state.modalItem.id)
    }

    render () {
        let { isLoading, searchText } = this.props;

        return (
            <div>
                {searchText} {isLoading && "loading..."}
                <hr />
                <Btn title="First"
                     link={this.props.firstPageUrl}
                     onClick={this.onPageChange.bind(this)}
                />
                <Btn title="Prev" link={this.props.prevPageUrl}  onClick={this.onPageChange} />
                <Btn title="Next" link={this.props.nextPageUrl}  onClick={this.onPageChange} />
                <Btn title="Last" link={this.props.lastPageUrl}  onClick={this.onPageChange} />

                <SearchList onSelect={this.onOpenModal}/>

                <ReactModal isOpen={this.state.showModal} >
                    <button onClick={this.onFavorite}>
                        favorite
                    </button>
                    <button onClick={this.onCloseModal}>Close Modal</button>
                    <pre>
                        {JSON.stringify(this.state.modalItem, null, ' ')}
                    </pre>

                </ReactModal>

            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        searchText: new URLSearchParams(props.location.search).get('repository'),
        isLoading: state.repoList.isLoading,
        nextPageUrl: state.repoList.nextPageUrl,
        prevPageUrl: state.repoList.prevPageUrl,
        firstPageUrl: state.repoList.firstPageUrl,
        lastPageUrl: state.repoList.lastPageUrl,
    }
}

const mapDispatchToProps = {
    searchRepo,
    fetchPage,
    toggleFavorite
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)
