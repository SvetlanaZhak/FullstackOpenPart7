import React, { useState } from 'react'
import {
  BrowserRouter as Router,
   Route, Link,   Redirect,  useHistory, useRouteMatch
} from "react-router-dom"


const Menu = (props) => {

  const padding = {
    paddingRight: 5
  }
 
  const {anecdotes, anecdoteById, createNew, setNewAnecdote, setNotification, newAnecdote } = props
  return (
    <Router>
    <>
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
      {/* <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        } */}
    </div>
    <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes}/>}>
   
    </Route>
    <Route exact path="/anecdotes/:id" render={({match})=>  <Anecdote anecdote={anecdoteById(match.params.id)} />}>
    
    </Route>
    <Route path="/create" render={() => 
        newAnecdote ? <Redirect to="/" /> : 
        <CreateNew createNew={createNew} newAnecdote={newAnecdote} setNewAnecdote={setNewAnecdote} setNotification={setNotification} />} ></Route>
    <Route path="/about" render={() => <About />} ></Route>
    
    {/* <Route path="/users">
      {user ? <Users /> : <Redirect to="/login" />}
    </Route>
    <Route path="/login">
      <Login onLogin={login} />
    </Route>
    <Route path="/">
      <About />
    </Route> */}

</>
</Router>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)
const Anecdote = (props) => {
  const {content, author, info, votes} = props.anecdote;
  return(
  <div>
    <h2>{content} by {author}</h2>
    <div>has {votes} votes</div>
    <div>for more info see <a href={info}>the link</a></div>
  </div>
)}
const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [info, setInfo] = useState('')
  const [author, setAuthor] = useState('')
  const {setNewAnecdote, setNotification} = props
  console.log(setNewAnecdote, "PROPS")


  const handleSubmit = (e) => {
    e.preventDefault()
    props.createNew({
      content,
      author,
      info,
      votes: 0
    })
    // props.history.push('/')
    setNewAnecdote(true);
    setNotification(`A new anecdote '${content}' has been created`);
    setTimeout(() => {setNotification("") }, 10000)
  }

  // const Users = () => (
  //   <div>
  //     <h2>Routed anecdotes app</h2>
  //     <ul>
  //       <li>Svetlana Zhak</li>
  //       <li>Lana Zhak</li>    
  //     </ul>
  //   </div>
  // )
  
  // const Login = (props) => {
  //   const history = useHistory()
  
  //   const onSubmit = (event) => {
  //     event.preventDefault()
  //     props.onLogin('szhak')
  //     history.push('/')
  //   }
  // }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
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
  ])

  // const [user, setUser] = useState(null) 

  // const login = (user) => {
  //   setUser(user)
  // }

  const padding = {
    padding: 5
  }
  const [newAnecdote, setNewAnecdote] = useState(false)
 
  const [notification, setNotification] = useState('')

  const createNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
      <div>{notification ? notification : null}</div>
      <Menu
        anecdotes={anecdotes}
        anecdoteById={anecdoteById}
          setAnecdotes={setAnecdotes}
          newAnecdote={newAnecdote}
          setNewAnecdote={setNewAnecdote}
          vote={vote}
          createNew={createNew}
          notification={notification}
          setNotification={setNotification} />

    
     
     
       
      </Router>
      <Footer />
    </div>
  )
}

export default App;
