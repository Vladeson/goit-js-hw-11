import axios from "axios";
import Notiflix from 'notiflix';

const API_KEY = '38273886-256bb67c3bff0eefc068cd029';
const BASE_URL = 'https://pixabay.com/api/'

const form = document.querySelector(".search-form")
const input = document.querySelector('.search-input')
const gallery = document.querySelector(".gallery")
const btnLoadMore = document.querySelector(".load-more")

let page = 1;
let per_page = 40;


form.addEventListener('submit', function(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    let searchQuery = input.value;
    getPhotoSomething(searchQuery);
})

async function getPhotoSomething(inputData) {
  try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${inputData}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`);
    const hits = response.data.hits;
      if (hits.length === 0) {
        btnLoadMore.classList.add("hidden")
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    } else {
        RenderGallery(hits)
         if (page * per_page > response.data.totalHits) {
             btnLoadMore.classList.add("hidden")
             Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        } else {
            btnLoadMore.classList.remove("hidden")
        }
    }
  } catch (error) {
      console.log(error)
      Notiflix.Notify.failure('An error occurred while fetching the images. Please try again later.');
  }
}

function RenderGallery(amount) {
    amount.forEach(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            gallery.insertAdjacentHTML("beforeend", 
            `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${comments}
                    </p>
                     <p class="info-item">
                        <b>Downloads</b>
                        ${downloads}
                    </p>
                </div>
            </div>`)
        })
}


btnLoadMore.addEventListener("click", (event) => {
    event.preventDefault(); 
    page++;
    let searchQuery = input.value;
    getPhotoSomething(searchQuery);
})
