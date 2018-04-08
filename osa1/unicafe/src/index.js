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
        return (this.state.hyva_arvo + huonot) / this.arvioidenMaara()
    }
    
    arvioidenMaara = () => {
        return this.state.hyva_arvo + this.state.neutraali_arvo + this.state.huono_arvo
    }
    
    laskePositiiviset = () => {
        if (this.arvioidenMaara() <= 0){
            return 0
        }
        return (this.state.hyva_arvo / this.arvioidenMaara()) * 100
    }

    render(){
    return (
        <div>
            <h3>anna palautetta</h3>
            <div>
                <button onClick={this.annaHyvaArvio}>hyvä</button>
                <button onClick={this.annaNeutraaliArvio}>neutraali</button>
                <button onClick={this.annaHuonoArvio}>huono</button>
            </div>
            <h3>statistiikkaa</h3>
            <div>
               <Palaute laatu='hyvä' arvo={this.state.hyva_arvo} yksikko=''/>
               <Palaute laatu='neutraali' arvo={this.state.neutraali_arvo} yksikko=''/>
               <Palaute laatu='huono' arvo={this.state.huono_arvo} yksikko=''/>
               <Palaute laatu='keskiarvo' arvo={this.laskeKeskiarvo()} yksikko=''/>
               <Palaute laatu='positiiviset' arvo={this.laskePositiiviset()} yksikko='%'/>
            </div>
        </div>
        ) 
    }
}

const Palaute = (props) => {
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

