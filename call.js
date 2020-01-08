const axios = require("axios")

const baseUrl = "http://api.giphy.com/v1/gifs/";
const endpoint = "random"
const requestParameters = "?api_key=surqCofgETenObiK2P63so7eERCCWgnH"
const resultUrl = baseUrl + endpoint + requestParameters


//1. yöntem
const loadGifsWithAsyncAwait = async () => {
  const gifs = await axios.get(resultUrl)
  console.log(gifs, "data")
}

//loadGifsWithAsyncAwait()

//2. yöntem

const loadGifsWithThenCatch = () => {
  axios.get(resultUrl)
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error, "hata")
    })

}

//loadGifsWithThenCatch()


const loadGifsWithPromise = () => {
  const gifs1 = new Promise((resolve) => axios.get(resultUrl).then(data => resolve(data)))
  const gifs2 = new Promise((resolve) => axios.get(resultUrl).then(data => resolve(data)))
  const gifs3 = new Promise((resolve) => axios.get(resultUrl).then(data => resolve(data)))

  Promise.all([gifs1, gifs2, gifs3]).then(values => {
    const firstData = values[0]
    const secondData = values[1]
    const thirdData = values[2]
    console.log(firstData, secondData, thirdData)
  })
}

//loadGifsWithPromise()
