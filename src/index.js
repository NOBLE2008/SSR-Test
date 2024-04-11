const React = require("react")
const ReactDOM = require("react-dom")
const App = require("./App")

ReactDOM.hydrate(<App/>, document.getElementById('root'))