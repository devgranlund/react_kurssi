import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showVotedNotification } from '../reducers/notificationReducer'
import { clearNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
    render() {
        const voted = async (anecdote) => {
            this.props.voteAnecdote(anecdote.id)
            anecdote.votes = anecdote.votes +1
            await anecdoteService.update(anecdote)
            this.props.showVotedNotification(anecdote.content)
            setTimeout(() => {
                this.props.clearNotification()
            }, 5000)
        }
        return (
            <div>
                <h2>Anecdotes</h2>
                <Filter />
                {this.props.visibleAnecdotes
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

const anecdotesToShow = (anecdotes, filter) => {
    return anecdotes
        .filter(anecdote => anecdote.content.includes(filter.filter))
        .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (store) => {
    return {
        visibleAnecdotes: anecdotesToShow(store.anecdotes, store.filter)
    }
}

const mapDispatchToProps = {
    clearNotification,
    showVotedNotification,
    voteAnecdote
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
