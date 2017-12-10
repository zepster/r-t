import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({baseUrl, handlerClick, navigations}) => {

    const getTo = nav => ({
        pathname: '/search',
        search: `${baseUrl}&page=${nav.page}`
    })

    return (
        <div>
            {console.log('NAV')}
            <ul>
                { navigations.first && <li><NavLink onClick={() => handlerClick(navigations.first.url)} to={getTo(navigations.first)}>{navigations.first.page}</NavLink></li> }
                { navigations.prev && navigations.first.page !== navigations.prev.page && <li><NavLink onClick={() => handlerClick(navigations.prev.url)} to={getTo(navigations.prev)}>{navigations.prev.page}</NavLink></li> }
                { navigations.next && <li><NavLink onClick={() => handlerClick(navigations.next.url)} to={getTo(navigations.next)}>{navigations.next.page}</NavLink></li> }
                { navigations.last && navigations.next.page !== navigations.last.page && <li><NavLink onClick={() => handlerClick(navigations.last.url)} to={getTo(navigations.last)}>{navigations.last.page}</NavLink></li> }
            </ul>
        </div>
    )
}
