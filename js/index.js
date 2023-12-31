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

const featureSlideshowElement = document.querySelector('.feature-slideshow');
if (featureSlideshowElement) {
  const featureScrollable = new ScrollableElement('.feature-slideshow', {
    scrollSpeed: 150
  });
}
const tagIconsScrollable = new ScrollableElement('.study-tags-search-section .tag-icons ul');
const startswithScrollable = new ScrollableElement('.start-with-section ul');

// search box scroll effect
const searchBox = document.querySelector('.search-box');
const headerHeight = document.querySelector('header').clientHeight; // Get header height

window.addEventListener('scroll', () => {
  if (window.scrollY >= headerHeight) {
    searchBox.classList.add('show-search-box');
  } else {
    searchBox.classList.remove('show-search-box');
  }
});



// start with list class 
class StartWithGenerator {
  constructor(navSelector, startWithSelector) {
    this.navLinks = document.querySelectorAll(navSelector + ' a');
    this.startWithList = document.querySelector(startWithSelector + ' ul');
    this.addClickListeners();
  }

  addClickListeners() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (event) => this.generateListItems(event));
    });
  }

  generateListItems(event) {
    event.preventDefault();
    this.startWithList.innerHTML = '';

    const link = event.currentTarget;
    const sectionName = link.querySelector('.section-name');

    if (sectionName) {
      const sectionText = sectionName.textContent;
      const topics = this.getTopicsForSection(sectionText);

      topics.forEach(topic => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${topic[3]}"><i class="fas fa-${topic[1]}"></i> ${topic[0]}</a>`;
        this.startWithList.appendChild(listItem);
      });
    }
  }

  getTopicsForSection(sectionName) {
    const topicsMap = {
      'For You': [['Quadratic Equations', 'superscript', 'Solving quadratic equations and finding their solutions', '/mathopedia/html/algebra.html?topic=quadratic-equations'], ['Quadratic Equations', 'superscript', 'Solving quadratic equations and finding their solutions', '/mathopedia/html/algebra.html?topic=quadratic-equations'], ['Quadratic Equations', 'superscript', 'Solving quadratic equations and finding their solutions', '/mathopedia/html/algebra.html?topic=quadratic-equations']],
      'Arithmetic': [['Addition', 'plus', 'Combining two or more numbers to find their sum'],
      ['Subtraction', 'minus', 'Finding the difference between two numbers'],
      ['Multiplication', 'times', 'Repeated addition of a number or finding the product of two numbers'],
      ['Division', 'divide', 'Sharing a quantity equally or finding the quotient of two numbers'],
      ['Whole Numbers', 'sort-numeric-up', 'Basic counting numbers (0, 1, 2, 3, ...)'],
      ['Integers', 'sort-numeric-down', 'Positive and negative whole numbers, including zero'],
      ['Fractions', 'chart-pie', 'Numbers expressed as a ratio of two integers (a/b)'],
      ['Decimals', 'percent', 'Numbers with a fractional part represented by a decimal point'],
      ['Percentages', 'percentage', 'Expressing a portion of a quantity out of 100'],
      ['Order of Operations', 'sort-amount-up', 'Rules for performing operations in a specific order (PEMDAS/BODMAS)'],
      ['Estimation', 'chart-line', 'Approximating values to make calculations easier'],
      ['Prime Numbers', 'praying-hands', 'Numbers divisible only by 1 and themselves'],
      ['Factors and Multiples', 'sitemap', 'Divisors and numbers divisible by a given number'],
      ['LCM & GCD', 'infinity', ''],
      ['Ratios and Proportions', 'balance-scale', 'Comparing quantities and maintaining proportional relationships'],
      ['Place Value', 'sort-numeric-down-alt', 'Understanding the value of digits in a number based on their position'],
      ['Rounding', 'round', 'Approximating numbers to a specified place value'],
      ['Exponents', 'superscript', 'Raising a number to a certain power'],
      ['Square Roots and Cube Roots', 'square-root-alt', 'Finding the roots of numbers'],
      ['Word Problems', 'question', 'Applying arithmetic concepts to real-life situations']
      ],
      'Algebra':
        [
          ['Variables and Constants', 'sort-alpha-down', 'Understanding variables and constants in equations', '/mathopedia/html/algebra.html?topic=variables-and-constants'],
          ['Expressions and Equations', 'equals', 'Working with mathematical expressions and equations', '/mathopedia/html/algebra.html?topic=expressions-and-equations'],
          ['Solving Equations', 'equals', 'Solving equations to find the value of variables', '/mathopedia/html/algebra.html?topic=solving-equations'],
          ['Inequalities', 'not-equal', 'Working with inequality statements', '/mathopedia/html/algebra.html?topic=inequalities'],
          ['Linear Equations', 'chart-line', 'Solving linear equations and graphing lines', '/mathopedia/html/algebra.html?topic=linear-equations'],
          ['Quadratic Equations', 'superscript', 'Solving quadratic equations and finding their solutions', '/mathopedia/html/algebra.html?topic=quadratic-equations'],
          ['Polynomials', 'times', 'Understanding and working with polynomial expressions', '/mathopedia/html/algebra.html?topic=polynomials'],
          ['Factoring', 'sitemap', 'Factoring polynomials into their component terms', '/mathopedia/html/algebra.html?topic=factoring'],
          ['Functions', 'function', 'Defining and understanding mathematical functions', '/mathopedia/html/algebra.html?topic=functions'],
          ['Graphing Functions', 'chart-area', 'Graphing functions on coordinate planes', '/mathopedia/html/algebra.html?topic=graphing-functions'],
          ['Exponents and Radicals', 'square-root-alt', 'Working with exponents and finding roots of numbers', '/mathopedia/html/algebra.html?topic=exponents-and-radicals'],
          ['Rational Expressions', 'divide', 'Working with fractions involving polynomials', '/mathopedia/html/algebra.html?topic=rational-expressions'],
          ['Complex Numbers', 'infinity', 'Understanding and performing operations with complex numbers', '/mathopedia/html/algebra.html?topic=complex-numbers'],
          ['Quadratic Functions', 'chart-line', 'Analyzing and graphing quadratic functions', '/mathopedia/html/algebra.html?topic=quadratic-functions'],
          ['Polynomial Functions', 'chart-bar', 'Analyzing and graphing polynomial functions', '/mathopedia/html/algebra.html?topic=polynomial-functions'],
          ['Exponential Functions', 'chart-line', 'Analyzing and graphing exponential functions', '/mathopedia/html/algebra.html?topic=exponential-functions'],
          ['Logarithmic Functions', 'chart-line', 'Analyzing and graphing logarithmic functions', '/mathopedia/html/algebra.html?topic=logarithmic-functions'],
          ['Systems of Equations', 'equals', 'Solving and graphing systems of linear equations', '/mathopedia/html/algebra.html?topic=systems-of-equations'],
          ['Matrices and Determinants', 'table', 'Working with matrices and finding determinants', '/mathopedia/html/algebra.html?topic=matrices-and-determinants'],
          ['Sequences and Series', 'list-ol', 'Analyzing arithmetic and geometric sequences and series', '/mathopedia/html/algebra.html?topic=sequences-and-series']
        ]


    };

    return topicsMap[sectionName] || [];
  }
}

const startWithGenerator = new StartWithGenerator('.nav', '.start-with-section');

// 
const toggleButton = document.querySelector(".content-table-header i");
const tableOfContents = document.querySelector(".table-of-contents");

let isToggled = false;
if (toggleButton) {

  toggleButton.addEventListener("click", () => {
    if (!isToggled) {

      tableOfContents.style.display = 'block';
    } else {
      tableOfContents.style.display = 'none';

    }

    isToggled = !isToggled;
  });
}


// printing the section
const printBtn = document.getElementById('print-button')
if (printBtn) {

  printBtn.addEventListener('click', function toPDF() {
    html2pdf()
      .set({
        margin: 1,
        filename: "convertrix.pdf",
        image: { type: "jpeg", quality: 1 },
        enableLinks: true,
        jsPDF: { format: "A4", orientation: "portrait" }
      })
      .from(document.querySelector(".topic-content"))
      .save();
  })
}




const search_appearance = document.querySelector('.search-appearance');
const search_bar = document.querySelector('.search-bar');
const input_search_loader = document.querySelector('.input-search-loader');
search_bar.style.borderRadius = '5px';

search_bar.addEventListener('click', function (event) {
  event.stopPropagation();
  input_search_loader.style.display = 'block';
  input_search_loader.style.position = 'absolute';
  input_search_loader.style.zIndex = '2';
  input_search_loader.style.width = search_bar.offsetWidth + 'px';
  input_search_loader.style.left = '50%';
  input_search_loader.style.transform = 'translateX(-50%)';
  search_bar.style.borderRadius = '5px 5px 0px 0px';
});

window.addEventListener('resize', function () {
  if (input_search_loader.style.display === 'block') {
    input_search_loader.style.width = search_bar.offsetWidth + 'px';
  }
});


document.body.addEventListener('click', function (event) {
  const searchBarWidth = search_bar.offsetWidth;
  const searchBarLeft = search_bar.getBoundingClientRect().left;
  const clickedX = event.clientX;

  if (
    clickedX < searchBarLeft ||
    clickedX > (searchBarLeft + searchBarWidth) ||
    !search_appearance.contains(event.target) &&
    event.target !== input_search_loader
  ) {
    search_bar.style.borderRadius = '5px';
    input_search_loader.style.display = 'none';
  }
});

