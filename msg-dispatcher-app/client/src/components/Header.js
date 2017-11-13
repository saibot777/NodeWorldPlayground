import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">DispatherMSG</a>
                    <ul className="right">
                        <li><a><strong>Login With Google</strong></a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}