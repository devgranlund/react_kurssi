import React from 'react'

const Filtering = (props) => {
    return (
        <div>Rajaa näytettäviä:
                <input
                    value={props.filter}
                    onChange={props.onChange}
                />
            
        </div>
    )
}

export default Filtering