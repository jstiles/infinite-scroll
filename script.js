// unsplash API
const count = 30;
const apiKey = 'HunFp489MkBc5c7c2BzRk2Upe0qr967v6gFVFQKM_6I';
const secretKey = 'vPDCTiJHEeiI1WQ00t8yImjfbJIDSZZ1jjFm9tf8Jeo'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//  check if all images were imageLoaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;  // hide after first time page loads
  }
}

// helper fucntion to set attributes on dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for lins and photos, add to document
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // run function for each object in photosArray
  photosArray.forEach((photo) => {
    // create <a> to link to Unsplash
    const item = document.createElement('a');

    // set item attributes
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // create image for photo
    const img = document.createElement('img');

    // set image attributes
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event listerer, check when ech is finished Loading
    img.addEventListener('load', imageLoaded);

    // put image inside anchor element <a>, the put both in imageContainer elements
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash apiKey
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error
  }
}

// check to see if scrolling near bottom of page, load more photosArray
// the window is the parent of the document and the grand parent of the body
// that is where our envent lister is attached.
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
