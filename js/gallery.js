import gallery from './gallery-items.js';

const bodyRef = document.querySelector('body');
const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImgRef = document.querySelector('.lightbox__image');
const overlayRef = document.querySelector('.lightbox__overlay');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');

// Рендерим разметку и вешаем слушателя событий
const galleryMarkup = createGalleryCardsMarkup(gallery);
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);


galleryRef.addEventListener('click', openModal);

// Разметка
function createGalleryCardsMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
          `;
    })
    .join('');
}

// Открываем модалку
function openModal(evt) {
  evt.preventDefault();

  const onGalleryImgRef = evt.target.classList.contains('gallery__image');
  if (!onGalleryImgRef) {
    return;
  }
  bodyRef.classList.add('scroll-hidden'); 
  lightboxRef.classList.add('is-open');

  lightboxImgRef.src = evt.target.getAttribute('data-source');
  lightboxImgRef.alt = evt.target.alt;

  window.addEventListener('keydown', onArrowLeft);
  window.addEventListener('keydown', onArrowRight);
  window.addEventListener('keydown', onPressEsc);
  overlayRef.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
}