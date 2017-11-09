const API_KEY = 'oMyHno2Mn152yopJ2mS9cC2rDDC1dENf';
const BASE_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}`;

const gifForm = document.querySelector('#gif-form');
const gifLimit = gifForm.querySelector('#gif-search-limit');
const gifInput = gifForm.querySelector('#gif-search-input');
gifInput.focus();

const gifList = document.querySelector('#gif-list');

const searchGiphy = (inputText = 'test', searchLimit = gifLimit.value) => {
  return fetch(`${BASE_URL}&limit=${searchLimit}&q=${inputText}`)
  .catch(e => {
    console.log('not found');
  })
  .then(res => res.json())
  .then(data => data.data)
}

const createFields = (data) => {
  gifList.innerHTML = '';
  console.log(data);

  if (data.length){
    data.map(gifItem => {
      const gifContainer = document.createElement('div');
      const gifText = document.createElement('p');
      const gifImage = document.createElement('img');

      gifContainer.className = 'gif-container';
      gifImage.addEventListener('load', (e) => {
        //set an attribute that css can hook into
        gifContainer.setAttribute('data-loaded', true);
      })
      gifImage.src = gifItem.images.fixed_width.url;
      gifText.innerText = gifItem.images.fixed_width.url;
      gifContainer.appendChild(gifImage);
      gifContainer.appendChild(gifText);
      gifList.appendChild(gifContainer);
    });
  } else {
    searchGiphy('nothing', 1)
    .then(data => {
      createFields(data);
    })
  }
}

gifForm.addEventListener('submit', (e)=> {
  e.preventDefault();
  gifInput.blur();

  const inputText = gifInput.value;
  searchGiphy(inputText)
  .then(data => {
    createFields(data);
  })
})