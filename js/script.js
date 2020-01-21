'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleTagsLinksSelector = '.post-tags .list a',
  optAuthorSelector = '.post-author';

const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links that have this class  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles that have this class */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const currentTitleId = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const currentArticle = document.querySelector(currentTitleId);

  /* [DONE] add class 'active' to the correct article */
  currentArticle.classList.add('active');
};

const generateTitleLinks = (customSelector = '') => {
  /* [DONE] clean up list of links with titles of articles */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article find its id and title
  and use them to dynamically create html links
  and insert them into html titles list */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = `<li><a href='#${articleId}'><span>${articleTitle}</span></a></li>`;
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
};
generateTitleLinks();

const generateTags = () => {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tags = article.getAttribute('data-tags').split(' ');
    const tagsList = article.querySelector(optArticleTagsSelector);
    let html = '';
    tags.forEach(tag => {
      const tagHTML = `<li><a href='#tag-${tag}'>${tag}</a></li> `;
      html = html + tagHTML;
    });
    tagsList.innerHTML = html;
  }
};
generateTags();

const tagClickHandler = (event) => {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = event.target;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant and extract tag from the "href" constant */
  const tag = href.split('-')[1];

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const currentTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let currentTagLink of currentTagLinks) {
  /* add class active */
    currentTagLink.classList.remove('active');
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

const addClickListenersToTags = () => {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(optArticleTagsLinksSelector);

  /* START LOOP: for each link */
  tagLinks.forEach(link => {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  });
};
addClickListenersToTags();


const generateAuthors = () => {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const author = article.getAttribute('data-author');
    const authorListing = article.querySelector(optAuthorSelector);
    const authorHTML = `<a href="#">by ${author}</a>`;
    authorListing.innerHTML = authorHTML;
  }
};
generateAuthors();
