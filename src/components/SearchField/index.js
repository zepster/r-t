import React from 'react';

export const SearchField = ({onClick}) => {

    let searchInput = ''

    return (
        <div>
            { console.log('render SearchField') }
            <label>
                Repo:<input type="text" ref={(input) => { searchInput = input }}/>
            </label>
            <button onClick={() => onClick(searchInput.value)}>Find</button>
        </div>
    );
}