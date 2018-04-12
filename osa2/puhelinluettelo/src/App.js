import React from 'react';
import personService from './services/persons'
import Filtering from './components/Filtering'
import Persons from "./components/Person";
import AddPersonForm from "./components/AddPersonForm";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    componentDidMount() {
        console.log('will mount')
        personService.getAll()
            .then(persons => {
                console.log('promise fulfilled')
                this.setState({ persons: persons })
            })
    }

    addContact = (event) => {
        event.preventDefault()
        if (this.personsContainsName(this.state.persons, this.state.newName)) {
            console.log('nameExistsInList')
            this.setState(() => ({
                newName: '',
                newNumber: ''

            }));
        } else {
            const newPerson = {name: this.state.newName, number: this.state.newNumber}
            personService.create(newPerson)
                .then(persons => {
                    const persons_copy = [...this.state.persons]
                    persons_copy.push(newPerson)
                    this.setState({
                        persons: persons_copy,
                        newName: '',
                        newNumber: ''
                    })
                })
        }
    }

    personsContainsName = (list, name) => {
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i].name === name) {
                return true
            }
        }
        return false
    }

    onNameChanged = (event) => {
        this.setState({
            newName: event.target.value
        })
    }

    onNumberChanged = (event) => {
        this.setState({
            newNumber: event.target.value
        })
    }

    onFilterChanged = (event) => {
        this.setState({
            filter: event.target.value
        })
    }

    onDeleteNameClicked = (id) => {
        if (window.confirm("poistetaanko " + this.getNameById(id))){
        personService.deleteItem(id)
            .then(response => {
                const persons_copy = this.state.persons.filter(person => person.id !== id)
                this.setState({
                    persons: persons_copy
                })
            })
        }
    }
    
    getNameById = (id) => {
        return this.state.persons.filter(person => person.id === id)[0].name
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filtering value={this.state.filter} onChange={this.onFilterChanged}/>
                <AddPersonForm 
                    addContact={this.addContact} 
                    newName={this.state.newName}
                    onNameChanged={this.onNameChanged}
                    newNumber={this.state.newNumber}
                    onNumberChanged={this.onNumberChanged}
                />
                <Persons persons={this.state.persons} filter={this.state.filter} onDeleteNameClicked={this.onDeleteNameClicked}/>
            </div>
        )
    }
}

export default App
