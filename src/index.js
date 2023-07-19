import { getPhotoSomething } from "./api"

const form = document.querySelector(".search-form")
const input = document.querySelector('.search-input')
const gallery = document.querySelector(".gallery")
export const btnLoadMore = document.querySelector(".load-more")

let page = 1;
let per_page = 40;


form.addEventListener('submit', function(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    let searchQuery = input.value;
    getPhotoSomething(searchQuery, page, per_page);;
})


export function RenderGallery(amount) {
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
    getPhotoSomething(searchQuery, page, per_page);
})
