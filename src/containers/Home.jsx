import React, { Component } from 'react';

import AuthProvider from '../lib/AuthProvider';

class Home extends Component {
    render() {
        return (
            <div> 
                Logado <button onClick={AuthProvider.logout} >Sair</button>
            </div>
        );
    }
}

export default Home;