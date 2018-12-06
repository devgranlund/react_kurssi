import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdotes'
import { connect } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'

class App extends React.Component {
    componentDidMount = async () => {
        const anecdotes = await anecdoteService.getAll()
        this.props.initAnecdotes(anecdotes)
    }

    render() {
        return (
            <div>
                <h1>Programming anecdotes</h1>
                <Notification />
                <AnecdoteList />
                <AnecdoteForm />
            </div>
        )
    }
}

export default connect(
    null,
    { initAnecdotes }
)(App)