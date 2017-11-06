const API_KEY = 'oMyHno2Mn152yopJ2mS9cC2rDDC1dENf';
const BASE_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}`;

const gifForm = document.querySelector('#gif-form');
const gifInput = gifForm.querySelector('#gif-search-input');
gifInput.focus();

const gifContainer = document.querySelector('#gif-container');
const gifImg = gifContainer.querySelector('img');
const gifImgText = gifContainer.querySelector('p');

const searchGiphy = (inputText = 'test') => {
  return fetch(`${BASE_URL}&q=${inputText}`)
  .then(res => res.json())
  .then(data => data.data)
}

const updateFields = (data) => {
  gifImg.src = data[0].images.original.url;
  gifImgText.innerText = data[0].images.original.url;
}

gifForm.addEventListener('submit', (e)=> {
  e.preventDefault();

  const inputText = gifInput.value;
  searchGiphy(inputText)
  .then(data => {
    updateFields(data);
  })
})