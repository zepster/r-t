import React from 'react';
import './list.css'

export const SearchList = ({items}) => {

    return (
        <div>
            <ul>
            {items.map(v =>
                <li key={v.id} >
                    Name: {v.full_name}, owner: {v.owner.login}, stars: {v.stargazers_count}
                </li>
            )}
            </ul>
        </div>
    );
}

export default SearchList