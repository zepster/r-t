import React from 'react';

export const SearchField = ({handelSearch}) => {
    let searchInput = ''

    const _handelSearch = () => {
        searchInput.value && handelSearch(searchInput.value)
    }

    const onKeyPress = e => {
        if (e.key === 'Enter') {
            _handelSearch()
        }
    }

    return (
        <div>
            <label>
                Repo:<input type="text" onKeyPress={onKeyPress} ref={(input) => { searchInput = input }}/>
            </label>
            <button onClick={_handelSearch}>Find</button>
        </div>
    );
}