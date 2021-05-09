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

// Открывает модальное окно
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

// Закрывает модальное окно

function closeModal(evt) {
  bodyRef.classList.remove('scroll-hidden'); 

  lightboxRef.classList.remove('is-open');
  lightboxImgRef.src = '';
  lightboxImgRef.alt = '';

  overlayRef.removeEventListener('click', closeModal);
  closeBtn.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', onArrowLeft);
  window.removeEventListener('keydown', onArrowRight);
  window.removeEventListener('keydown', onPressEsc);
}
// Пролистывание галереи

let indexCurrentElem;
function findCurrentIndex() {
  gallery.forEach((elem, index) => {
    if (elem.description === lightboxImgRef.getAttribute('alt')) {
      return (indexCurrentElem = index);
    }
  });
}

//Влево
function toThePrevious() {
  findCurrentIndex();
  if (indexCurrentElem === 0) {
    indexCurrentElem = gallery.length;
  }
  lightboxImgRef.src = gallery[indexCurrentElem - 1].original;
  lightboxImgRef.alt = gallery[indexCurrentElem - 1].description;
  return lightboxImgRef;
}

//Вправо
function toTheNext() {
  findCurrentIndex();
  if (indexCurrentElem === gallery.length - 1) {
    indexCurrentElem = -1;
  }
  lightboxImgRef.src = gallery[indexCurrentElem + 1].original;
  lightboxImgRef.alt = gallery[indexCurrentElem + 1].description;
  return lightboxImgRef;
}

function onArrowLeft(evt) {
  if (evt.code === 'ArrowLeft') {
    toThePrevious();
  }
}

function onArrowRight(evt) {
  if (evt.code === 'ArrowRight') {
    toTheNext();
  }
}

function onPressEsc(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}
