class ScrollableElement {
  constructor(selector, options = {}) {
    this.element = document.querySelector(selector);
    this.scrollSpeed = options.scrollSpeed || 50;
    this.scrollDirection = options.scrollDirection || 1;
    this.attachScrollListener();
  }

  attachScrollListener() {
    this.element.addEventListener('wheel', (event) => {
      const scrollDirection = event.deltaY > 0 ? this.scrollDirection : -this.scrollDirection;
      this.element.scrollLeft += this.scrollSpeed * scrollDirection;
      event.preventDefault();
    });
  }
}


const tagIconsScrollable = new ScrollableElement('.study-tags-search-section .tag-icons ul');
const featureScrollable = new ScrollableElement('.feature-slideshow', {
  scrollSpeed: 150});
