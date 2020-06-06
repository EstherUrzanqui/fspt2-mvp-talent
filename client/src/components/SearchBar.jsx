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


    handleOnInputChange = (event) => {
        const query = event.target.value;
        this.setState( { query: query })
           
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onSearch(this.state.query)
        this.setState( { loading: true, message: '' })
    }
    
    render() {
        const { query } = this.state
        return (
            <div className="container">
                {/*Heading*/}
                
                <form onSubmit={this.handleSubmit}>
                    <label className="search-label" htmlFor="search-input">
                    <input
                       type="text"
                       name="query"
                       value={query}
                       id="search-input"
                       placeholder="Search"
                       onChange={this.handleOnInputChange}
                    />   
                    <i className="fa fa-search search-icon" aria-hidden="true"/>
                    </label>

                </form>
            </div>
        )
    }

  
}

export default SearchBar;