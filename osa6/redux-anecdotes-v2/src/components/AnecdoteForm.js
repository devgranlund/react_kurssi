import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, showCreatedNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      this.props.createAnecdote(content)
      this.props.showCreatedNotification(content)
      setTimeout(() => {
          this.props.clearNotification()
      }, 5000)

      e.target.anecdote.value = ''
  }
  render() {
      return (
          <div>
              <h2>create new</h2>
              <form onSubmit={this.handleSubmit}>
                  <div><input name='anecdote'/></div>
                  <button>create</button>
              </form>
          </div>
      )
  }
}

const mapDispatchToProps = {
    clearNotification,
    showCreatedNotification,
    createAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
