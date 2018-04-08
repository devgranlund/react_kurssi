import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva_arvo: 0,
            neutraali_arvo: 0,
            huono_arvo: 0,
            positiivisia: 0
        }
    }

    annaHyvaArvio = () => {
        this.setState((prevState) => ({
            hyva_arvo: prevState.hyva_arvo + 1
        }));
    }
    
    annaNeutraaliArvio = () => {
        this.setState((prevState) => ({
            neutraali_arvo: prevState.neutraali_arvo + 1
        }));
    }
    
    annaHuonoArvio = () => {
        this.setState((prevState) => ({
            huono_arvo: prevState.huono_arvo + 1
        }));
    }
    
    laskeKeskiarvo = () => {
        if (this.arvioidenMaara() <= 0){
            return 0
        }
        const huonot = this.state.huono_arvo * -1
        return Number(((this.state.hyva_arvo + huonot) / this.arvioidenMaara()).toFixed(1))
    }
    
    arvioidenMaara = () => {
        return this.state.hyva_arvo + this.state.neutraali_arvo + this.state.huono_arvo
    }
    
    laskePositiiviset = () => {
        if (this.arvioidenMaara() <= 0){
            return 0
        }
        return Number(((this.state.hyva_arvo / this.arvioidenMaara()) * 100).toFixed(1))
    }

    render(){
    return (
        <div>
            <h3>anna palautetta</h3>
            <div>
                <Button onClickFunktio={this.annaHyvaArvio} teksti="hyvä" />
                <Button onClickFunktio={this.annaNeutraaliArvio} teksti="neutraali" />
                <Button onClickFunktio={this.annaHuonoArvio} teksti="huono" />
            </div>
            <h3>statistiikkaa</h3>
            <Statistics 
                hyvat={this.state.hyva_arvo} 
                neutraalit={this.state.neutraali_arvo} 
                huonot={this.state.huono_arvo}
                keskiarvo={this.laskeKeskiarvo()}
                positiiviset={this.laskePositiiviset()}
                arvioidenMaara={this.arvioidenMaara()}
            />
        </div>
        ) 
    }
}

const Button = ({ onClickFunktio, teksti }) => {
    return (
        <button onClick={onClickFunktio}>{teksti}</button>
    )
}

const Statistics = ({ hyvat, neutraalit, huonot, keskiarvo, positiiviset, arvioidenMaara }) => {
    
    if (arvioidenMaara <= 0){
        return ( <div>ei yhtään palautetta annettu</div> )
    }
    
    return (
        <div>
            <Statistic laatu='hyvä' arvo={hyvat} yksikko=''/>
            <Statistic laatu='neutraali' arvo={neutraalit} yksikko=''/>
            <Statistic laatu='huono' arvo={huonot} yksikko=''/>
            <Statistic laatu='keskiarvo' arvo={keskiarvo} yksikko=''/>
            <Statistic laatu='positiiviset' arvo={positiiviset} yksikko='%'/>
        </div>
    )
}

const Statistic = (props) => {
    return (
        <p>{props.laatu} {props.arvo} {props.yksikko}</p>
    )
}

const renderoi = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    )
}

renderoi()

