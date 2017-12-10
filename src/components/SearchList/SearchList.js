import React, { Component } from 'react';
import RepoModal from '../RepoModal'

import './list.css'

export class SearchList extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            modalIsOpen: false,
            modalItem: null
        };
        this.onClickRepo = this.onClickRepo.bind(this)
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    onClickRepo(item) {
        this.showModal(item)
    }

    showModal(item) {
        this.setState({
            modalIsOpen: true,
            modalItem: item
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            modalItem: null
        })
    }

    render() {
        return (
            <div className="card-container">

                {this.state.modalItem &&
                <RepoModal isOpen={this.state.modalIsOpen} repoId={this.state.modalItem.id}>
                    <div>
                        repos: {this.state.modalItem.full_name}
                        <button onClick={() => this.closeModal()}>CLOSE</button>
                    </div>
                </RepoModal>
                }

                {this.props.items.map(v =>
                    <div className="card" key={v.id} onClick={() => this.onClickRepo(v)}>
                        <div>
                            <img src={v.owner.avatar_url} className="card___image" alt={v.full_name}/>
                        </div>
                        <div className="card__body">
                            <h2 className="card__fullname">
                                {v.full_name}
                            </h2>
                            <p className="card__subtitle">
                                owner: {v.owner.login}, stars: {v.stargazers_count}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default SearchList