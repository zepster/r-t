import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({navigation, handlerNavClick}) => (
    <ul>
        <li><NavLink to={handlerNavClick(navigation.first)}>{navigation.first}</NavLink></li>
        <li><NavLink to={handlerNavClick(navigation.prev)}>{navigation.prev}</NavLink></li>
        <li><NavLink to={handlerNavClick(navigation.next)}>{navigation.next}</NavLink></li>
        <li><NavLink to={handlerNavClick(navigation.last)}>{navigation.last}</NavLink></li>
    </ul>
)
