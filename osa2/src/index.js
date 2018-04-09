import React from 'react'
import ReactDOM from 'react-dom'
import Kurssi from './components/Kurssi'

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
