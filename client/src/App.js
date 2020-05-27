import React from 'react';
import './App.css';
import { response } from 'express';

class App extends React.Component {
  state = {
    candidates: []
  }

  componentDidMount(){
    fetch('http://localhost:3001/api/candidate')
      .then(response => response.json())
      .then(response => {
        this.setState({
          candidates: response
        })
      })
  }


  render(){

    return (
      <div className="App">
        {this.state.candidates.map(candidate => (
          <li key={candidate.id}>{candidate.firstname}</li>
        ))}
      </div>
    );
    
  }
  
}

export default App;
