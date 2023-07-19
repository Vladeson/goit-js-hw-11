import axios from "axios";
import Notiflix from 'notiflix';
import { RenderGallery, btnLoadMore } from ".";

const API_KEY = '38273886-256bb67c3bff0eefc068cd029';
const BASE_URL = 'https://pixabay.com/api/';

async function getPhotoSomething(inputData, page, per_page) {
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

export { getPhotoSomething };