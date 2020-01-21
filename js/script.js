'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

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

const generateTitleLinks = () => {
  /* [DONE] clean up list of links with titles of articles */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article find its id and title
  and use them to dynamically create html links
  and insert them into html titles list */
  const articles = document.querySelectorAll(optArticleSelector);
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
