import React from 'react';
import personService from './services/persons'
import Filtering from './components/Filtering'
import Persons from "./components/Person";
import AddPersonForm from "./components/AddPersonForm";
import Notification from "./components/Notification";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            notificationText: null,
            notificationCssClass: ''
        }
    }

    // React -framework callback-method
    componentDidMount() {
        console.log('will mount')
        personService.getAll()
            .then(persons => {
                console.log('promise fulfilled')
                this.setState({persons: persons})
            })
    }

    addOrUpdatePerson = (event) => {
        event.preventDefault()
        if (this.personsContainsName(this.state.persons, this.state.newName)) {
            this.updatePerson()
        } else {
            this.addNewPerson()
        }
    }

    addNewPerson = () => {
        const newPerson = {name: this.state.newName, number: this.state.newNumber}
        personService.create(newPerson)
            .then(person => {
                newPerson.id = person.id
                const persons_copy = [...this.state.persons]
                persons_copy.push(newPerson)
                this.setState({
                    persons: persons_copy,
                    newName: '',
                    newNumber: '',
                    notificationText: `lisättiin '${newPerson.name}'`,
                    notificationCssClass: 'success'
                })
            })
            this.removeNotificationAfterTimeout()
    }

    updatePerson = () => {
        if (window.confirm(this.state.newName + " on jo luettelossa, korvataanko vanha numero uudella?")) {
            const personToUpdate = this.getPersonByName(this.state.newName)
            personToUpdate.number = this.state.newNumber
            personService.update(personToUpdate.id, personToUpdate)
                .then(person => {
                    const persons_copy = [...this.state.persons]
                    persons_copy.filter(perzon => perzon.id === personToUpdate.id)[0].number = this.state.newNumber
                    this.setState({
                        persons: persons_copy,
                        newName: '',
                        newNumber: '',
                        notificationText: `päivitettiin '${personToUpdate.name}'`,
                        notificationCssClass: 'success'
                    })
                })
                this.removeNotificationAfterTimeout()
            
        } else {
            this.setState({
                newName: '',
                newNumber: ''
            })
        }
    }

    onDeleteNameClicked = (id) => {
        if (window.confirm("poistetaanko " + this.getNameById(id))) {
            personService.deleteItem(id)
                .then(response => {
                    const persons_copy = this.state.persons.filter(person => person.id !== id)
                    this.setState({
                        persons: persons_copy,
                        notificationText: `poistettiin '${this.getNameById(id)}'`,
                        notificationCssClass: 'success'
                    })
                })
                this.removeNotificationAfterTimeout()
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

    getNameById = (id) => {
        return this.state.persons.filter(person => person.id === id)[0].name
    }

    getPersonByName = (name) => {
        return this.state.persons.filter(person => person.name === name)[0]
    }
    
    removeNotificationAfterTimeout = () => {
        setTimeout(() => {
            this.setState({notificationText: null})
        }, 5000)
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification 
                    message={this.state.notificationText} 
                    cssClass={this.state.notificationCssClass} />
                <Filtering value={this.state.filter} onChange={this.onFilterChanged}/>
                <AddPersonForm
                    addOrUpdatePerson={this.addOrUpdatePerson}
                    newName={this.state.newName}
                    onNameChanged={this.onNameChanged}
                    newNumber={this.state.newNumber}
                    onNumberChanged={this.onNumberChanged}
                />
                <Persons persons={this.state.persons} filter={this.state.filter}
                         onDeleteNameClicked={this.onDeleteNameClicked}/>
            </div>
        )
    }
}

export default App
