import React from 'react';
import axios from 'axios';
import JokeCLS from './JokeCLS';
import './JokeList.css';
import {v4 as uuid} from 'uuid';
import CircularProgress from '@material-ui/core/CircularProgress';

class JokeListCLS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      loading: false
    }
    this.numJokesToGet = 10;
    this.getJokes = this.getJokes.bind(this);
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }
  
  async getJokes() {
    let j = [];
    let seenJokes = new Set();
    try {
      this.setState({loading: true});
      while (j.length < this.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...jokeObj } = res.data;
        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      this.setState((state, props) => ({
        loading: false,
        jokes: [...state.jokes, j]
      }));
    } catch (e) {
      console.log(e);
    }
    return false;
  }
  /* empty joke list and then call getJokes */

  async generateNewJokes() {
    this.setState({jokes: []});
    const newLoading = await this.getJokes();
    this.setState({loading: newLoading});
  }

  /* change vote for this id by delta (+1 or -1) */

  vote(id, delta) {
    let {jokes} = this.state;
    this.setState({jokes: [jokes[0].map(j => (j.id === id ? { ...j, votes: j.votes + delta} : j) )] });
  }

  /* render: either loading spinner or list of sorted jokes. */
  render() {
    if (!this.state.loading && this.state.jokes.length) {
      let sortedJokes = [...this.state.jokes[0]].sort((a, b) => b.votes - a.votes);
    
      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>
          {sortedJokes.map(j => (            
            <JokeCLS text={j.joke} key={uuid()} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );
    } else {
      return <CircularProgress />;
    }
    
  }

}

export default JokeListCLS;
