'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagArticleLink: Handlebars.compile(document.querySelector('#template-tag-article-link').innerHTML),
  authorArticleLink: Handlebars.compile(document.querySelector('#template-author-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const select = {
  all: {
    articles: '.post',
    titles: '.post-title',
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  },
  article: {
    tags: '.post-tags .list',
    author: '.post-author',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    authors: '.authors.list',
  },
};

const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
};

/* Helper functions */
const calculateTagParams = (tags) => {
  const params = {
    min: 9999,
    max: 0
  };
  params.min = Math.min(...Object.values(tags));
  params.max = Math.max(...Object.values(tags));
  return params;
};

const calculateTagClass = (count, params) => {
  const diffCountMin = count - params.min;
  const diffMaxMin = params.max - params.min;
  const proportion = diffCountMin / diffMaxMin;
  const classNumber = Math.floor(proportion * (opts.tagSizes.count - 1) + 1);
  return opts.tagSizes.classPrefix + classNumber;
};

/* Click handler: titles */
const titleClickHandler = (event) => {
  event.preventDefault();
  const clickedElement = event.target;

  /* remove class 'active' from all article links that have this class  */
  const activeLinks = document.querySelectorAll(select.listOf.titles + ' a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles that have this class */
  const activeArticles = document.querySelectorAll(select.all.articles + '.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /*  find current article */
  const currentTitleId = clickedElement.getAttribute('href');
  const currentArticle = document.querySelector(currentTitleId);

  /* add class 'active' to current article */
  currentArticle.classList.add('active');
};

/* Click handler and listener: authors */
const authorClickHandler = (event) => {
  event.preventDefault();
  const clickedElement = event.target;

  /* get author from href attribute of clicked author */
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '').replace(/-/g, ' ');

  /* find author links with class active and remove class active*/
  const activeAuthorLinks = document.querySelectorAll(select.all.linksTo.authors + '.active');
  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" of clicked author  and add class active*/
  const currentAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let currentAuthorLink of currentAuthorLinks) {
    currentAuthorLink.classList.add('active');
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-author="${author}"]`);
};

const addClickListenersToAuthors = () => {
  const authorLinks = document.querySelectorAll(select.all.linksTo.authors);
  authorLinks.forEach(link => {
    link.addEventListener('click', authorClickHandler);
  });
};
addClickListenersToAuthors();

/* Click handler and listener: tags */

const tagClickHandler = (event) => {
  event.preventDefault();
  const clickedElement = event.target;

  /* get tag from the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active and lopp them to remove class active */
  const activeTagLinks = document.querySelectorAll(select.all.linksTo.tags + '.active');
  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant and loop them to add class active*/
  const currentTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let currentTagLink of currentTagLinks) {
    currentTagLink.classList.add('active');
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

const addClickListenersToTags = () => {
  const tagLinks = document.querySelectorAll(select.all.linksTo.tags);
  tagLinks.forEach(link => {
    link.addEventListener('click', tagClickHandler);
  });
};
addClickListenersToTags();

/* Generate titles list with links to articles */
const generateTitleLinks = (customSelector = '') => {
  /* clean up list of links with titles of articles */
  const titleList = document.querySelector(select.listOf.titles);
  titleList.innerHTML = '';

  /* loop articled to find id and title
  and use them to dynamically create html links to articles
  and insert them into html titles list */
  const articles = document.querySelectorAll(select.all.articles + customSelector);
  let titleListHTML = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(select.all.titles).innerHTML;
    const articleLinkHTMLData = {
      id: articleId,
      title: articleTitle
    };
    const articleLinkHTML = templates.articleLink(articleLinkHTMLData);
    titleListHTML = titleListHTML + articleLinkHTML;
  }
  titleList.innerHTML = titleListHTML;

  /* listen for click on title and execute handler */
  const links = document.querySelectorAll(select.listOf.titles + ' a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
};
generateTitleLinks();

/* Generate author link in article and all authors list */
const generateAuthors = () => {
  const articles = document.querySelectorAll(select.all.articles);
  const allAuthors = {};

  /* generate html link with author name to be inserted under article title
  and add to allAuthors object all author names and counts */
  for (let article of articles) {
    const author = article.getAttribute('data-author');
    const authorArticle = article.querySelector(select.article.author);
    const authorArticleHTMLData = {
      author: author,
      sanitizedAuthor: author.replace(/\s+/g, '-')
    };
    const authorArticleHTML = templates.authorArticleLink(authorArticleHTMLData);
    authorArticle.innerHTML = authorArticleHTML;
    /* add author with number of occurences into object allAuthors */
    if (!allAuthors.hasOwnProperty(author)) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }

  /* generate html links with authors names and counts to be inserted in authors list */
  const allAuthorsHTMLData = {
    authors: []
  };
  for (let author in allAuthors) {
    allAuthorsHTMLData.authors.push({
      author: author,
      sanitizedAuthor: author.replace(/\s+/g, '-'),
      count: allAuthors[author]
    });
  }

  /* insert html template with all authors anmes and counts to authors list */
  const authorList = document.querySelector(select.listOf.authors);
  authorList.innerHTML = templates.authorCloudLink(allAuthorsHTMLData);
};
generateAuthors();

/* Generate tags under article and all tag list */
const generateTags = () => {
  const articles = document.querySelectorAll(select.all.articles);
  let allTags = {};

  /* generate html link with tag to be inserted under article
  and add to allTags object all author names and counts */
  for (let article of articles) {
    const tagsList = article.querySelector(select.article.tags);
    let html = '';
    const tags = article.getAttribute('data-tags').split(' ');
    tags.forEach(tag => {
      const tagArticleHTMLData = {
        tag: tag
      };
      const tagHTML = templates.tagArticleLink(tagArticleHTMLData);
      html = html + tagHTML;
      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    });
    /* insert HTML of all article tag links under article */
    tagsList.innerHTML = html;
  }

  /* generate html links with tags to be inserted in tags list */
  const tagsParams = calculateTagParams(allTags);
  const allTagsHTMLData = {
    tags: []
  };
  for (let tag in allTags) {
    allTagsHTMLData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  /* insert html template with all authors anmes and counts to authors list */
  const tagList = document.querySelector(select.listOf.tags);
  tagList.innerHTML = templates.tagCloudLink(allTagsHTMLData);
};
generateTags();
