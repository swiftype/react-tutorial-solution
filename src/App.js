import React, { Component } from "react";
// Import the API client
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
import "./App.css";

// Instantiate a new instance of the Swiftype App Search Javascript Client
const client = SwiftypeAppSearch.createClient({
  accountHostKey: process.env.REACT_APP_HOST_KEY, // Configured in .env
  apiKey: process.env.REACT_APP_SEARCH_KEY, // Configured in .env
  engineName: "node-modules"
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* Remove boilerplate code and add a new title to the page */}
          <h1 className="App-title">Node Module Search</h1>
        </header>
      </div>
    );
  }
}

export default App;
