import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Martti Tienari', number: '040-123456' },
                { name: 'Arto Järvinen', number: '040-123456' },
                { name: 'Lea Kutvonen', number: '040-123456' }
            ],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }
    
    addContact = (event) => {
        event.preventDefault()
        if (this.personsContainsName(this.state.persons, this.state.newName)){
           console.log('nameExistsInList')
            this.setState(() => ({
                newName: '',
                newNumber: ''
                
            }));
        } else {
            const persons_copy = [...this.state.persons]
            const newPerson = { name: this.state.newName, number: this.state.newNumber }
            persons_copy.push(newPerson)
            this.setState(() => ({
                persons: persons_copy,
                newName: '',
                newNumber: ''
            }));
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
    
    getNames = () => {
        return this.state.persons
            .filter(person => person.name.toUpperCase().startsWith(this.state.filter.toUpperCase()))
            .map(person => <p key={person.name}>{person.name}, numero: {person.number}</p>)
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <div>Rajaa näytettäviä: 
                <input
                    value={this.state.filter}
                    onChange={this.onFilterChanged}
                    />
                </div>
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addContact}>
                    <div>
                        nimi: 
                        <input 
                            value={this.state.newName}
                            onChange={this.onNameChanged}
                        />
                        <br/>
                        numero:
                        <input 
                            value={this.state.newNumber}
                            onChange={this.onNumberChanged}
                            />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                {this.getNames()}
            </div>
        )
    }
}

export default App
