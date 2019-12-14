import React from 'react';
import ReactDOM from 'react-dom';

import './../sass/style.scss'; // adres do głównego pliku SASS

//import img from '../images/catApp.jpg';

class App extends React.Component {

    showAlert = (e) => {
        alert(e.target.innerText);
    };

    render() {
        return <h2 ref={el => this.h2 = el} onClick={this.showAlert}>To tylko test!</h2>
    }

    componentDidMount() {
        console.log(this.h2);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <>
            <App />
        </>,
        document.getElementById('app')
    )
})

