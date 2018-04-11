import React from 'react'

const Persons = (props) => {

    const getNamesAndNumbers = () => {
        return props.persons
            .filter(person => person.name.toUpperCase().startsWith(props.filter.toUpperCase()))
            .map(person => <p key={person.name}>{person.name}, numero: {person.number}</p>)
    }

    return (
        <div>
            <h2>Numerot</h2>
            {getNamesAndNumbers()}
        </div>
    )
}

export default Persons