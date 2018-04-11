import React from 'react'

const Countries = (props) => {
    
    const getCountries = () => {
        const countries = props.countries
            .filter(country => country.name.toUpperCase().startsWith(props.filter.toUpperCase()))
        if (countries.length > 10) {
            return <p>too many matches, specify another filter</p>
        } else if (countries.length <= 10 && countries.length > 1){
            return countries.map(country => <p key={country.name} onClick={props.onCountrySelected}>{country.name}</p>) 
        } else if (countries.length === 1) {
            const country = countries[0]
            return ( 
                <div>
                    <h2>{country.name}</h2>
                    capital: {country.capital} <br/>
                    population: {country.population} <br/>
                    <img src={country.flag} alt="Flag" style={{ maxWidth: 250 }}/>
                </div>
            )
        } else {
            return <p>No matches</p>
        }
    }
    
    return (
        <div>
            {getCountries()}
        </div>
    )
}

export default Countries