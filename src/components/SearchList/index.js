import React from 'react';
import { connect } from 'react-redux';
import './list.css'

export const SearchList = ({items, onSelect}) => {

    return (
        <div>
            <ul>
            {items.map(v =>
                <li onClick={() => onSelect(v)} key={v.id} className={`list ${v.$_favorite? `list--green`: ``}`}>
                    Name: {v.full_name}, owner: {v.owner.login}, stars: {v.stargazers_count}
                </li>
            )}
            </ul>
        </div>
    );
}

const mapStateToProps = (state, props) => ({
    items: state.repoList.data,
})

export default connect(
    mapStateToProps
)(SearchList)