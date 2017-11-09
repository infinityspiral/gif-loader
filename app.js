const API_KEY = 'oMyHno2Mn152yopJ2mS9cC2rDDC1dENf';
const BASE_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=5`;

const gifForm = document.querySelector('#gif-form');
const gifInput = gifForm.querySelector('#gif-search-input');
gifInput.focus();

const gifList = document.querySelector('#gif-list');

const searchGiphy = (inputText = 'test') => {
  return fetch(`${BASE_URL}&q=${inputText}`)
  .catch(e => {
    console.log('not found');
  })
  .then(res => res.json())
  .then(data => data.data, (e) => {
    console.log(e);
  })
}

const createFields = (data) => {
  gifList.innerHTML = '';

  if (data.length){
    data.map(gifItem => {
      const gifContainer = document.createElement('div');
      const gifImage = document.createElement('img');
      const gifText = document.createElement('p');

      gifContainer.className = 'gif-container';
      gifImage.src = gifItem.images.fixed_width.url;
      gifText.innerText = gifItem.images.fixed_width.url;

      gifContainer.appendChild(gifImage);
      gifContainer.appendChild(gifText);

      gifList.appendChild(gifContainer);
    });
  } else {
    searchGiphy('nothing')
    .then(data => {
      createFields(data);
    })
  }
}

gifForm.addEventListener('submit', (e)=> {
  e.preventDefault();

  const inputText = gifInput.value;
  searchGiphy(inputText)
  .then(data => {
    createFields(data);
  })
})