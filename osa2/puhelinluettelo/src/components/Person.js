import React from 'react'

const Persons = (props) => {
    
    const handleClick = (id) => {
        props.onDeleteNameClicked(id)
    }

    const getNamesAndNumbers = () => {
        return props.persons
            .filter(person => person.name.toUpperCase().startsWith(props.filter.toUpperCase()))
            .map(person => <p key={person.name}>{person.name}, numero: {person.number} <button onClick={() => handleClick(person.id)}>poista</button></p>)
    }

    return (
        <div>
            <h2>Numerot</h2>
            {getNamesAndNumbers()}
        </div>
    )
}

export default Persons