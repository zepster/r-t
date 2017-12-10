import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { getFavoriteStatus, favoriteActions } from '../../reducers/favorite'

export class RepoModal extends React.Component {

    componentWillMount() {
        Modal.setAppElement('body');
    }

    render() {
        console.log("RENDER 11")
        return (
            <div>
                <Modal isOpen={this.props.isOpen}>
                    {!this.props.isFavorite && <button onClick={() => this.props.add(this.props.repoId)}>ADD to favorite</button>}
                    {this.props.isFavorite && <button onClick={() => this.props.remove(this.props.favoriteKey)}>Remove from favorite</button>}
                    {this.props.children}
                </Modal>
            </div>
        );
    }
}

export default connect(
    getFavoriteStatus,
    {
        add: favoriteActions.addFavorite,
        remove: favoriteActions.removeFavorite
    }
)(RepoModal)
