import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14
        }
    ]

    return (
        <div>
            <Otsikko teksti={kurssi} />
            <Sisalto osat={osat} />
            <Yhteensa osat={osat} />
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <h1>{props.teksti}</h1>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa nimi={props.osat[0].nimi} tehtavia={props.osat[0].tehtavia} />
            <Osa nimi={props.osat[1].nimi} tehtavia={props.osat[1].tehtavia} />
            <Osa nimi={props.osat[2].nimi} tehtavia={props.osat[2].tehtavia} />
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.nimi} {props.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    const tehtavia = props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia
    return (
        <p>yhteensa {tehtavia} tehtävää</p>   
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)