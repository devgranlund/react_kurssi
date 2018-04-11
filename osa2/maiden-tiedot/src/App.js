import React, {Component} from 'react';
import axios from 'axios';
import Countries from "./components/Countries";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: ''
        }
    }

    componentDidMount() {
        console.log('will mount')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                this.setState({countries: response.data})
            })
    }
    
    onFilterChange = (event) => {
        this.setState({
            filter: event.target.value
        })       
    }
    
    onCountrySelected = (event) => {
        this.setState({
            filter: event.target.textContent
        })
    }

    render() {
        return (
            <div className="App">
                find countries:
                <input value={this.state.filter} onChange={this.onFilterChange}/>
                <Countries countries={this.state.countries} filter={this.state.filter} onCountrySelected={this.onCountrySelected}/>
            </div>
        );
    }
}

export default App;
