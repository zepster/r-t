import React from 'react';

export const SearchField = ({onClick, defaultValue = ''}) => {

    let searchInput = ''

    return (
        <div>
            <label>
                Repo:<input type="text" defaultValue={defaultValue} ref={(input) => { searchInput = input }}/>
            </label>
            <button onClick={() => onClick(searchInput.value)}>Find</button>
        </div>
    );
}