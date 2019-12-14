import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../sass/main.scss';
import catPhoto from './../images/cat.jpg'

const kitties = [
    {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
    {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
    {category: "male", age: "2", likesKids: false, name: "Grumpy"},
    {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
    {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
    {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
];

class SearchBar extends Component {

    handlerCheckBox = () => {
        if (typeof this.props.changeBox === 'function') {
            this.props.changeBox();
        }
    };

    handlerSearch  = (event) => {
        if (typeof this.props.filterText === 'function') {
            this.props.filterText(event.target.value);
        }
    };

    render() {
        return <form>
            <input type = 'text' placeholder = "Search..." onChange = {this.handlerSearch}/>
            <p>
                <input type = 'checkbox' checked = {this.props.likesKids} onChange = {this.handlerCheckBox}/>
                <span>Only show kitties that likes kids</span>
            </p>
        </form>
    }
}

class CatTable extends Component {

    render() {
        let rows = [];
        let lastCategory = null;
        let filters = this.props.filter;
        let checkBox = this.props.likesKids;

        this.props.kitties.forEach(function(kitty) {
            if(kitty.category !== lastCategory) {
                rows.push(<CatCategoryRow category = {kitty.category} key = {kitty.category} />);
            }

            if(((kitty.name.includes(filters) && filters.length > 2) || filters.length < 3) && (kitty.likesKids === true || checkBox === false)) {
                rows.push(<CatRow kitty = {kitty} key = {kitty.name} />);
            }

            lastCategory = kitty.category;
        });

        return <table className='mainTable'>
            <thead>
            <tr>
                <th> Name  </th>
                <th> Age </th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    }
}

class CatCategoryRow extends React.Component {
    render() {
        return <tr>
            <th colSpan="2" className="tableHeader"> {this.props.category}</th>
        </tr>
    }
}

class CatRow extends React.Component {
    render() {
        let name = this.props.kitty.likesKids ?
            this.props.kitty.name : <span style = {{color: 'red'}}>
                {this.props.kitty.name} </span>;
        return <tr>
            <td>
                {name}
            </td>
            <td>
                {this.props.kitty.age} years
            </td>
        </tr>
    }
}

class App extends Component {
    state = {
        filterText: '',
        likesKids: false
    };

    changeBox = () => {
        this.setState({
            likesKids: (!this.state.likesKids)
        });
    };

    changeFilterText = (text) => {
        this.setState({
            filterText: text
        });
    };

    render() {
        return <div className="appBox">
            <img src={catPhoto} alt="kot"/>
            <SearchBar filter = {this.state.filterText} likesKids = {this.state.likesKids}
                       changeBox = {this.changeBox} filterText = {this.changeFilterText}/>
            <CatTable kitties = {this.props.kitties} filter = {this.state.filterText}
                      likesKids = {this.state.likesKids} />
        </div>
    }
}

ReactDOM.render(
    <App kitties={kitties} />,
    document.getElementById('app')
);