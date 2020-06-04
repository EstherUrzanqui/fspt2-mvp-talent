import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     searchText: '',
     searchResult: [],
     former: []
    };
  }

  componentDidMount(){
    fetch('http://localhost:3001/api/candidates/skills/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          former: data
        })
      })
  }
  

  render(){
    return(
      <div className="Candidates">
        <div>
          <SearchBar onSearch={this.handleSearch} />
        </div>
        <div>
          {this.state.former.map(candidate => (
            <ul className="ul">
              <li className="list" key={candidate.id}>
                <h4>Language</h4> {candidate.mother_tongue}
                <h4>Department</h4> {candidate.department}
                <h4>Experience</h4> {candidate.experience}
                <h4>Skills</h4>{candidate.title}
                <button className="contact"> Contact </button>
              </li>
            </ul>
          ))}
        </div>
        
      </div>
    )
  }
}

export default App;
