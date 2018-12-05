import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showVotedNotification } from '../reducers/notificationReducer'
import { clearNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

class AnecdoteList extends React.Component {
    render() {
        const anecdotes = this.props.store.getState().anecdotes
        const voted = (anecdote) => {
            this.props.store.dispatch(voteAnecdote(anecdote.id))
            this.props.store.dispatch(showVotedNotification(anecdote.content))
            setTimeout(() => {
                this.props.store.dispatch(clearNotification())
            }, 5000)
        }
        return (
            <div>
                <h2>Anecdotes</h2>
                <Filter store={this.props.store}/>
                {anecdotes.sort((a, b) => b.votes - a.votes)
                    .filter(anecdote => anecdote.content.includes(this.props.store.getState().filter.filter))
                    .map(anecdote =>
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
              has {anecdote.votes}
                                <button onClick={() =>
                                    voted(anecdote)
                                }>
                vote
                                </button>
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}

export default AnecdoteList
