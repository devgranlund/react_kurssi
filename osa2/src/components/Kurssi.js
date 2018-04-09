import React from 'react'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h2>{props.kurssi.nimi}</h2>
const Sisalto = (props) => {
    const osat = () => props.kurssi.osat.map(
        osa_item => <Osa osa={osa_item.nimi} tehtavia={osa_item.tehtavia} key={osa_item.id}/>)
    return (
        <div>
            {osat()}
        </div>
    )
}
const Yhteensa = (props) => {
    const reducer = (acc, cur) => acc + cur
    return (
        <p>yhteensä {(props.kurssi.osat.map(osa_item => osa_item.tehtavia)).reduce(reducer, 0)} tehtävää</p>
    )
}
const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto kurssi={kurssi}/>
            <Yhteensa kurssi={kurssi}/>
        </div>
    )
}

export default Kurssi