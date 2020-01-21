'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleTagsLinksSelector = '.post-tags .list a',
  optArticleAuthorSelector = '.post-author',
  optArticleAuthorLinksSelector = '.post-author a',
  optTagsListSelector = '.tags.list';

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
  /* [DONE] create a new variable allTags with an empty array */
  let allTags = [];

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute and split tags into array */
    const tags = article.getAttribute('data-tags').split(' ');

    /* [DONE] START LOOP: for each tag */
    tags.forEach(tag => {
      /* [DONE] generate HTML of the link */
      const tagHTML = `<li><a href='#tag-${tag}'>${tag}</a></li> `;
      /* [DONE] add generated code to html variable */
      html = html + tagHTML;

      /* [DONE] check if this link is NOT already in allTags */
      if(!allTags.includes(tagHTML)) {
        /* [DONE] add generated code to allTags array */
        allTags.push(tagHTML);
      }

    /* END LOOP: for each tag */
    });
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
  /* END LOOP: for every article: */
  }

  /* [DONE] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [DONE] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');

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
  const tag = href.replace('#tag-', '');

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
    currentTagLink.classList.add('active');
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
    const authorListing = article.querySelector(optArticleAuthorSelector);
    const authorHTML = `<a href="#author-${author.replace(/\s+/g, '-')}">by ${author}</a>`;
    authorListing.innerHTML = authorHTML;
  }
};
generateAuthors();

const authorClickHandler = (event) => {
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = event.target;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant and extract tag from the "href" constant */
  const author = href.replace('#author-', '').replace(/-/g, ' ');

  /* find author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const currentAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for (let currentAuthorLink of currentAuthorLinks) {
  /* add class active */
    currentAuthorLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-author="${author}"]`);
};

const addClickListenersToAuthors = () => {
  const authorLinks = document.querySelectorAll(optArticleAuthorLinksSelector);
  authorLinks.forEach(link => {
    link.addEventListener('click', authorClickHandler);
  });
};
addClickListenersToAuthors();
