import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva_arvo: 0,
            neutraali_arvo: 0,
            huono_arvo: 0
        }
    }

    render(){
    return (
        <div>
            <h3>anna palautetta</h3>
            <div>
                <button onClick={() => 
                    this.setState({ hyva_arvo: this.state.hyva_arvo + 1 })}>hyvä</button>
                <button onClick={() =>
                    this.setState({ neutraali_arvo: this.state.neutraali_arvo + 1 })}>neutraali</button>
                <button onClick={() =>
                    this.setState({ huono_arvo: this.state.huono_arvo + 1 })}>huono</button>
            </div>
            <h3>statistiikkaa</h3>
            <div>
               <Palaute laatu='hyvä' arvo={this.state.hyva_arvo}/>
               <Palaute laatu='neutraali' arvo={this.state.neutraali_arvo}/>
               <Palaute laatu='huono' arvo={this.state.huono_arvo}/>
            </div>
        </div>
        ) 
    }
}

const Palaute = (props) => {
    return (
        <p>{props.laatu} {props.arvo}</p>
    )
}

const renderoi = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    )
}

renderoi()

