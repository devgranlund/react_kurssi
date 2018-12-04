import React from 'react';

class App extends React.Component {

    addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        this.props.store.dispatch({type: 'NEW_ANECDOTE', data: content})
        event.target.anecdote.value = ''
    }

    render() {
        const anecdotes = this.props.store.getState()
        return (
            <div>
                <h2>Anecdotes</h2>
                {anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => {
                                this.props.store.dispatch({type: 'VOTE', data: anecdote.id})
                            }}>vote
                            </button>
                        </div>
                    </div>
                )}
                <h2>create new</h2>
                <form onSubmit={this.addAnecdote}>
                    <div><input name="anecdote"/></div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

export default App