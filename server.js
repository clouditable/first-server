const express = require("express")
const axios = require("axios")

const server = express()

const port = process.env.PORT || 8000;

const baseUrl = "http://api.giphy.com/v1/gifs/";
const requestQueries = "?api_key=surqCofgETenObiK2P63so7eERCCWgnH"

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get("/random", async (request, response, next) => {
  const endpoint = "random"
  const resultUrl = baseUrl + endpoint + requestQueries
  const randomResultGifs = await axios.get(resultUrl)
  response.send({random: randomResultGifs.data.data})
  response.end()
})

server.get("/trending", async (request, response, next) => {
  const endpoint = "trending"
  const resultUrl = baseUrl + endpoint + requestQueries
  const trendingResultGifs = await axios.get(resultUrl)
  response.send({trending: trendingResultGifs.data.data})
  response.end()
})

server.get("/search", async (request, response, next) => {
  const parameters = request.query || {searchKey: ""};
  if (!(parameters.searchKey || "").trim()) {
    //throw error
  } else {
    const endpoint = "search"
    const searchQuery = `&q=${parameters.searchKey}`;
    const resultUrl = baseUrl + endpoint + requestQueries + searchQuery;
    //result url output : http://api.giphy.com/v1/gifs/search?api_key=surqCofgETenObiK2P63so7eERCCWgnH&q=hello
    const searchResultGifs = await axios.get(resultUrl)
    response.send({search: searchResultGifs.data.data})
  }
  response.end()
})

server.listen(port, () => {
  console.log(`Express server running ${port}`)
})
