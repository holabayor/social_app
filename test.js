let page = 1;
let emptyPage = false;
let blockRequest = false;

window.addEventListener('scroll', function (e) {
  let margin = document.body.clientHeight - window.innerHeight - 200;
  if (window.pageYOffset > margin && !emptyPage && !blockRequest) {
    blockRequest = true;
    page += 1;
    fetch('?images_only=1&page=' + page)
      .then((response) => response.text())
      .then((html) => {
        if (html === '') {
          emptyPage = true;
        } else {
          let imageList = document.getElementById('images-list');
          imageList.insertAdjacentHTML('beforeend, html');
          blockRequest = false;
        }
      });
  }
});

// Launch scroll event
const scrollEvent = new Event('scroll');
window.dispatchEvent(scrollEvent);
