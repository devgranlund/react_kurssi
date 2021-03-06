import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Alert, ListGroup, ListGroupItem, Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const menuStyle = {
    backgroundColor: '#4EDBFE',
    padding: '10px',
    fontSize: '20px',
    fontWeight: 'bold'
}

const Menu = ({ state, addNew, anecdoteById, addNotification }) => (
    <div>
        <Router>
            <div>
                <div style={menuStyle}>
                    <Link to='/'>anecdotes</Link>&nbsp;
                    <Link to='/create'>create new</Link>&nbsp;
                    <Link to='/about'>about</Link>&nbsp;
                </div>
                <Route exact path='/' render={() => <AnecdoteList
                    anecdotes={ state.anecdotes }
                    notification={ state.notification }/>} />
                <Route exact path='/create' render={({ history }) => <CreateNew
                    addNew={addNew}
                    addNotification={addNotification}
                    history={history}
                />} />
                <Route exact path='/about' render={() => <About />} />
                <Route exact path='/anecdotes/:id' render={({ match }) =>
                    <Anecdote anecdote={anecdoteById(match.params.id)} />}
                />
            </div>
        </Router>
    </div>
)

const AnecdoteList = ({ anecdotes, notification }) => (
    <div>
        <div>
            {(notification &&
                <Alert color='success'>{notification}</Alert>
            )}
        </div>
        <h2>Anecdotes</h2>
        <ListGroup>
            {anecdotes.map(anecdote =>
                <ListGroupItem key={anecdote.id} >
                    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </ListGroupItem>)}
        </ListGroup>
    </div>
)

const Anecdote = ({ anecdote }) => (
    <div>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
)

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <Grid>
            <Row className='show-grid'>
                <Col md={6}>
                    <p>According to Wikipedia:</p>

                    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

                    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
                </Col>
                <Col md={4}>
                    <img src={ require('./images/180px-Webysther_20150414193208_-_Martin_Fowler.jpg') } alt='Martin Fowler '/>
                </Col>
            </Row>
        </Grid>
    </div>
)

const Footer = () => (
    <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
    </div>
)

class CreateNew extends React.Component {
    constructor() {
        super()
        this.state = {
            content: '',
            author: '',
            info: ''
        }
    }

  handleChange = (e) => {
      console.log(e.target.name, e.target.value)
      this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
      e.preventDefault()
      this.props.addNew({
          content: this.state.content,
          author: this.state.author,
          info: this.state.info,
          votes: 0
      })
      this.props.addNotification('a new anecdote ' + this.state.content + ' created')
      this.props.history.push('/')
      setTimeout(() => {
          this.props.addNotification('')
      },  10000)
  }

  render() {
      return(
          <div>
              <h2>create a new anecdote</h2>
              <form onSubmit={this.handleSubmit}>
                  <FormGroup>
                      <div>
                          <ControlLabel>Content:</ControlLabel>
                          <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
                      </div>
                      <div>
                          <ControlLabel>Author:</ControlLabel>
                          <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
                      </div>
                      <div>
                          <ControlLabel>Url for more info:</ControlLabel>
                          <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
                      </div>
                      <Button bsStyle='success' type='submit'>create</Button>
                  </FormGroup>
              </form>
          </div>
      )

  }
}

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            anecdotes: [
                {
                    content: 'If it hurts, do it more often',
                    author: 'Jez Humble',
                    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
                    votes: 0,
                    id: '1'
                },
                {
                    content: 'Premature optimization is the root of all evil',
                    author: 'Donald Knuth',
                    info: 'http://wiki.c2.com/?PrematureOptimization',
                    votes: 0,
                    id: '2'
                }
            ],
            notification: ''
        }
    }

  addNew = (anecdote) => {
      anecdote.id = (Math.random() * 10000).toFixed(0)
      this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
      this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
      const anecdote = this.anecdoteById(id)

      const voted = {
          ...anecdote,
          votes: anecdote.votes + 1
      }

      const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

      this.setState({ anecdotes })
  }

  addNotification = (notification) => {
      this.setState( { notification: notification })
  }

  render() {
      return (
          <div className='container'>
              <h1>Software anecdotes</h1>
              <Menu state={this.state}
                  addNew={this.addNew}
                  anecdoteById={this.anecdoteById}
                  addNotification={this.addNotification}
              />
              <Footer />
          </div>
      )
  }
}

export default App
