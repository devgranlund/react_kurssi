import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
    const osat = () => props.kurssi.osat.map(
        osa_item => <Osa osa={osa_item.nimi} tehtavia={osa_item.tehtavia} key={osa_item.id}/>)
    return(
        <div>
            {osat()}
        </div>
    )
}
const Yhteensa = (props) => {
    const reducer = (acc, cur) => acc + cur
    return(
        <p>yhteensä {(props.kurssi.osat.map(osa_item => osa_item.tehtavia)).reduce(reducer, 0)} tehtävää</p>
    )
}
const Kurssi = ({ kurssi }) => {
    return(
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi}  />
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            },
            {
                nimi: 'Redux',
                tehtavia: 7,
                id: 4
            }
        ]
    }
    return (
        <div>
            <Kurssi kurssi={kurssi}/>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
