import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            pisteet: [0, 0, 0, 0, 0, 0]
        }
    }
    
    drawAnecdote = () => {
        this.setState(() => ({
            selected: this.drawRandomNumber()
        }));
    }
    
    drawRandomNumber = () => {
        return Math.floor(Math.random() * 6)
    }
    
    registerVote = () => {
        const kopio = [...this.state.pisteet]
        kopio[this.state.selected] += 1
        this.setState((prevState) => ({
            pisteet: kopio
        }));
    }
    
    getAnecdoteInfo = () => {
        let highestValue = 0
        let highestIndex = 0
        for (let i = 0; i < this.state.pisteet.length; i++) {
            if (this.state.pisteet[i] > highestValue){
                highestValue = this.state.pisteet[i]
                highestIndex = i
            }
        }
        const info = [anecdotes[highestIndex], highestValue]
        return info
    }

    render() {
        return (
            <div>
                {this.props.anecdotes[this.state.selected]} <br/>
                <button onClick={this.registerVote}>vote</button>
                <button onClick={this.drawAnecdote}>next anecdote</button>
                <HighestVote pisteet={this.getAnecdoteInfo()}/>
            </div>
        )
    }
}

const HighestVote = ({ pisteet }) => {
    const votes = pisteet[1]
    if (votes <= 0){
        return (<h3>No votes</h3>)
    }
    
    return(
        <div>
            <h3>anecdote with most votes:</h3>
            <p>{pisteet[0]} <br/>
            has {pisteet[1]} votes
            </p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
