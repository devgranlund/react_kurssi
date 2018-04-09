import React from 'react'
import ReactDOM from 'react-dom'

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
    //console.log('Kurssi',kurssi)
    return (
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto kurssi={kurssi}/>
            <Yhteensa kurssi={kurssi}/>
        </div>
    )
}

const App = () => {
    const kurssit = [
        {
            nimi: 'Half Stack -sovelluskehitys',
            id: 1,
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
        },
        {
            nimi: 'Node.js',
            id: 2,
            osat: [
                {
                    nimi: 'Routing',
                    tehtavia: 3,
                    id: 1
                },
                {
                    nimi: 'Middlewaret',
                    tehtavia: 7,
                    id: 2
                }
            ]
        }
    ]
    const annaKurssit = kurssit.map(kurssi_item => <Kurssi key={kurssi_item.id} kurssi={kurssi_item}/>)
    return (
        <div>
            <h1>Opetusohjelma</h1>
            {annaKurssit}
        </div>
    )

}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
