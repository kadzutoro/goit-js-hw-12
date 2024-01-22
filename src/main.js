import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

function showMessage(message) {
    iziToast.show({
      close: false,
      closeOnClick: true,
      message,
      messageColor: 'white',
      timeout: 3000,
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      position: 'topRight',
      backgroundColor: 'red',
      progressBar: false,
    });
  }

const loader = document.querySelector('.loader')
const input = document.querySelector(".search-input")
const form = document.querySelector(".form")
const loadImagesBtn = document.querySelector('#loadBtn')
const gallery = document.querySelector('#gallery')
let lightbox = new SimpleLightbox('.gallery a', { showCounter: false });
const API_KEY = '41936359-935dea1b7e7e76694a23c8d00';
const API_BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = API_BASE_URL;

let scrollOffset = innerHeight;
let page = 1;
const per_page = 40;
let userSearchRequest;

window.scrollBy(0, scrollOffset);

form.addEventListener('submit', handleFormSubmit);
loadImagesBtn.addEventListener('click', loadMoreImages);

async function handleFormSubmit(e) {
  e.preventDefault();
  resetGallery();
  userSearchRequest = input.value;
  await fetchNRender();
}

async function fetchNRender() {
    try {
      const response = await axios.get(API_BASE_URL, {params: getAPIParams(),});
      const images = response.data;
      if (images.hits.length === 0) {
        return showMessage('Sorry, no images match your search query. Please try again!');
      }
      renderImages(images.hits);
      handleLoadMoreButton(images.totalHits);
    } catch (error) {
        console.error("API request error:", error);
        handleAPIError();
    } finally {
      loader.classList.add('is-hidden');
    }
}

function renderImages(images) {
    page += 1;
    const htmlString = images.reduce (
          (html, {largeImageURL,webformatURL,tags,likes,views,comments,downloads}) => html + `<li class="gallery-item">
              <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" />
              </a>
              <div class="image-desc">
              <div class="image-desc-item">
              <div class="image-desc-label">Likes</div>
              <div>${likes}</div>
              </div>
              <div class="image-desc-item">
              <div class="image-desc-label">Views</div>
              <div>${views}</div>
              </div>
              <div class="image-desc-item">
              <div class="image-desc-label">Comments</div>
              <div>${comments}</div>
              </div>
              <div class="image-desc-item">
              <div class="image-desc-label">Downloads</div>
              <div>${downloads}</div>
              </div>
              </div>
              </li>`, ""
              ); 

    gallery.insertAdjacentHTML('beforeend', htmlString);
    scrollOffset = document
    .querySelector('.gallery-item:last-child')
    .getBoundingClientRect().height;

 lightbox.refresh();
}

async function loadMoreImages() {
    loadImagesBtn.classList.add('is-hidden');
    loader.classList.remove('is-hidden');
    await fetchNRender();
}

function resetGallery() {
    loadImagesBtn.classList.add('is-hidden');
    loader.classList.remove('is-hidden');
    page = 1;
    gallery.innerHTML = '';
}

function getAPIParams() {
    return {
      key: API_KEY,
      q: userSearchRequest,
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: true,
      page,
      per_page,
    };
}

function handleLoadMoreButton(totalHits) {
    const totalPages = Math.ceil(totalHits / per_page);
    if (page > totalPages) {
      showMessage("We're sorry, but you've reached the end of search results.");
    } else {
      loadImagesBtn.classList.remove('is-hidden');
    }
}
  
function handleAPIError(error) {
    console.error("API request error:", error);
    showMessage('Oops... Something went wrong. Please try again later.');  
}