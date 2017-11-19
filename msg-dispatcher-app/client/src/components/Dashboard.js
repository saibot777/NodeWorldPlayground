import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        return (
            <div className="row">
                <Link 
                    style={{ float: 'right', marginTop: '40%' }}
                    to="/surveys/new" 
                    class="btn-floating btn-large waves-effect waves-light red">
                    <i class="material-icons">add</i>
                </Link>
            </div> 
        );
    }
    
}

export default Dashboard;