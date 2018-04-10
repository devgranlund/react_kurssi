import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas' }
            ],
            newName: ''
        }
    }
    
    addContact = (event) => {
        event.preventDefault()
        if (this.personsContainsName(this.state.persons, this.state.newName)){
           console.log('nameExistsInList')
            this.setState(() => ({
                newName: ''
            }));
        } else {
            const persons_copy = [...this.state.persons]
            const newPerson = { name: this.state.newName }
            persons_copy.push(newPerson)
            this.setState(() => ({
                persons: persons_copy,
                newName: ''
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
    
    getNames = () => {
        return this.state.persons.map(person => <p key={person.name}>{person.name}</p>)
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addContact}>
                    <div>
                        nimi: 
                        <input 
                            value={this.state.newName}
                            onChange={this.onNameChanged}
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
