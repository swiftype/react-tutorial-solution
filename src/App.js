import React, { Component } from "react";
import { debounce } from "lodash"; // Imported debounce
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
import "./App.css";

const client = SwiftypeAppSearch.createClient({
  accountHostKey: process.env.REACT_APP_HOST_KEY,
  apiKey: process.env.REACT_APP_SEARCH_KEY,
  engineName: "node-modules"
});

class App extends Component {
  state = {
    queryString: "",
    response: null
  };

  componentDidMount() {
    this.performQuery(this.state.queryString);
  }

  updateQuery = e => {
    const queryString = e.target.value;
    this.setState(
      {
        queryString
      },
      () => {
        this.performQuery(queryString);
      }
    );
  };

  // Wrapped performQuery in debounce
  performQuery = debounce(queryString => {
    client.search(queryString, {}).then(
      response => {
        this.setState({
          response
        });
      },
      error => {
        console.log(`error: ${error}`);
      }
    );
  }, 200);

  render() {
    const { response, queryString } = this.state;
    if (!response) return null;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node Module Search</h1>
        </header>
        <input
          className="App-search-box"
          type="text"
          placeholder="Enter a search term here"
          value={queryString}
          onChange={this.updateQuery}
        />
        <h2>{response.info.meta.page.total_results} Results</h2>
        {response.results.map(result => (
          <div key={result.getRaw("id")}>
            <p>Name: {result.getRaw("name")}</p>
            <p>Description: {result.getRaw("description")}</p>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
