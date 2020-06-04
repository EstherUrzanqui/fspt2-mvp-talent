import React from "react";
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       query: '',
       results: [],
       loading: false,
       message: ''
      }
    }

    fetchSearchResults = (query = '') => {
       fetch(`http://localhost:3001/api/companies/candidates?query=${query}`)
         .then(response => response.json())
         .then(response => {
             this.setState({
                 results: response.results,
                 loading: false
            })
        })
        .catch(error => {
            console.log('Error fetching')
        })
    }

    handleOnInputChange = (event) => {
        const query = event.target.value;
        this.setState( { query: query, loading: true, message: '' })
           this.fetchSearchResults(query)
    }

    render() {
        const { query } = this.state
        return (
            <div className="container">
                {/*Heading*/}
                <h2 className="heading">Covid Talent</h2>
                <label calssName="search-label" htmlFor="search-input">
                    <input
                       type="text"
                       name="query"
                       value={query}
                       id="search-input"
                       placeholder="search"
                       onChange={this.handleOnInputChange}
                    />   
                    <i class="fa fa-search search icon" aria-hidden="true"/>
                </label>
            </div>
        )
    }

  
}

export default SearchBar;