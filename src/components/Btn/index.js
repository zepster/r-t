import React from 'react';
import './btn.css';

export default ({title, onClick, link}) => (
    <button className={`btn ${link? `btn--green`: `btn--red`}`} onClick={() => onClick(link)}>{title}</button>
)
