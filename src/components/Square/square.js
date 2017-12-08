import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import classNames from 'classnames';

import { getSquare } from '../../reducers/';
import './square.css';

export class Square extends React.Component {

    constructor() {
        super(...arguments);
        console.log(this.props)
    }

    render() {
        let { count } = this.props;
        let width = `${count}%`

        return (
            <div className="square">
                <div
                    className={classNames('square ', {'square--grey': count > 0 && count < 25, 'square--green': count >= 25 && count < 50 , 'square--orange': count >= 50 && count < 75,'square--red': count >= 75})}
                    style={{ width }}></div>
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    getSquare,
    square => square
);

export default connect(mapStateToProps)(Square)