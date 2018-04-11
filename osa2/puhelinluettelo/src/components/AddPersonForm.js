import React from 'react'

const AddPersonForm = (props) => {

    return (
        <div>
            <h2>Lisää uusi</h2>
            <form onSubmit={props.addContact}>
                <div>
                    nimi:
                    <input
                        value={props.newName}
                        onChange={props.onNameChanged}
                    />
                    <br/>
                    numero:
                    <input
                        value={props.newNumber}
                        onChange={props.onNumberChanged}
                    />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>

    )
}

export default AddPersonForm