import express from "express"
import React from "react"
import ReactDOMServer from "react-dom/server"
import ReactDOM from "react-dom"
import {StaticRouter} from "react-router-dom"
import fs from "fs"
import path from "path"
import Hello from "../src/App"


const app = express();
const PORT = process.env.PORT || 3001;



const html = ReactDOMServer.renderToString(<Hello />);

console.log(html);

exports.handler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if(method === "GET" && url === "/"){
    handleGetData(req, res)
  }else{
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.send(JSON.stringify({
      message: 'Route not found'
    }))
  }
}

function handleGetData(req, res){
    fs.readFile(path.resolve("./build/index.html"), 'utf-8', (err, data) => {
      if(err){
        console.log(err);
        return res.status(500).send("Some error happened")
      }
      return res.send(
        data.replace(
          `<div id="root"></div>`,
          `<div id="root">${ReactDOMServer.renderToString(<Hello message="Toby Benjamin Noble" occupation="Web Developer" status="success"/>)}</div><script src="/public/index.js"></script>`
        )
      )
    })
  }
app.use(express.static(path.resolve(__dirname, '..', 'build')))
app.use ('/public', express.static(path.resolve(__dirname, '..', 'public')))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
