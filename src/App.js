import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to the homepage</p>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
    <p>There is nothing to know about this page</p>
  </div>
)

class Repository extends React.Component {

  constructor(props) {
    super(props);
    this.state = { repo: {} };
  }

  componentWillMount() {
    let currentLocation = this.props.location.pathname.split('/');
    let repoName = currentLocation[2];
    if(repoName){
      const url = `https://api.github.com/repos/Cphdat3sem2017f/${repoName}`;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          this.setState({ repo: json });
        })
        .catch((res) => {
          alert('error');
        })
    }
  }

  render() {
    const repo = this.state.repo;
    return (<div>
      <h2>Repository</h2>
      <p>This control should show details for a SINGLE selected repository</p>
      <p>id: {repo.id}</p>
      <p>name: {repo.name}</p>
      <p>full_name: {repo.full_name}</p>
    </div>
    )
  }
}

class Repositories extends React.Component {

  constructor(props) {
    super(props);
    this.state = { repos: [] }
  }

  componentWillMount() {
    const url = 'https://api.github.com/orgs/Cphdat3sem2017f/repos';
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.setState({ repos: json });
      })
      .catch((res) => {
        alert('error');
      })
  }

  render() {
    const match = this.props.match;
    return (
      <div>
        <h2>Repositories</h2>
        <ul>
          {(this.state.repos.length > 0) ? this.state.repos.map((repo) => {
            return (<li key={repo.id}>
              <p>{repo.name} <Link to={`/repository/${repo.name}`}>Details</Link> </p>
            </li>
            )
          }) : <div />}
        </ul>
      </div>
    )
  }
}

const App = () => (
  <Router>
    <div>
      <div>
        <ul className="header">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/repositories">Reposistories</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/repositories" component={Repositories} />
        <Route path="/repository" component={Repository} />
        <Route path='/repository/:repo/'
          render={(props) => {
            return <Repository {...props} />
          }}
        />
      </Switch>
    </div>
  </Router>
)
export default App;