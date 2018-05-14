import React, { Component } from "react";
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
import "./App.css";

const client = SwiftypeAppSearch.createClient({
  accountHostKey: process.env.REACT_APP_HOST_KEY,
  apiKey: process.env.REACT_APP_SEARCH_KEY,
  engineName: "node-modules"
});

class App extends Component {
  state = {
    // A new state property, which holds the most recent query response
    response: null
  };

  componentDidMount() {
    /* Calling this in componentDidMount ensures that results are
     displayed on the screen when the app first loads */
    this.performQuery("node");
  }

  // Method to perform a query and store the response
  performQuery = queryString => {
    client.search(queryString, {}).then(
      response => {
        // Add this for now so you can inspect the full response
        console.log(response);
        this.setState({
          response
        });
      },
      error => {
        console.log(`error: ${error}`);
      }
    );
  };

  render() {
    const { response } = this.state;
    if (!response) return null;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node Module Search</h1>
        </header>
        {/* Query details, like totals and paging data can be found
         in `response.info`. Here, we are simply showing the total
         number of results matched by this query. */}
        <h2>{response.info.meta.page.total_results} Results</h2>
        {/* `response.results` contains our list of search results.
         Each result is wrapped in a `ResultItem` object which has
         a `getRaw` getter which can be used to access raw field
         values from the response. */}
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
