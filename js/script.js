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

const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links that have this class  */
  const activeLinks = document.querySelectorAll(select.listOf.titles + ' a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles that have this class */
  const activeArticles = document.querySelectorAll(select.all.articles + '.active');
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
  const titleList = document.querySelector(select.listOf.titles);
  titleList.innerHTML = '';

  /* [DONE] for each article find its id and title
  and use them to dynamically create html links
  and insert them into html titles list */
  const articles = document.querySelectorAll(select.all.articles + customSelector);
  let titleListHTML = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML;
    const articleLinkHTMLData = {
      id: articleId,
      title: articleTitle
    };
    const articleLinkHTML = templates.articleLink(articleLinkHTMLData);
    titleListHTML = titleListHTML + articleLinkHTML;
  }
  titleList.innerHTML = titleListHTML;

  const links = document.querySelectorAll(select.listOf.titles + ' a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
};
generateTitleLinks();

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

const generateTags = () => {
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(select.all.articles);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper under article */
    const tagsList = article.querySelector(select.article.tags);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute and split tags into array */
    const tags = article.getAttribute('data-tags').split(' ');

    /* [DONE] START LOOP: for each tag */
    tags.forEach(tag => {
      /* [DONE] generate HTML of the link */
      const tagArticleHTMLData = {
        tag: tag
      };
      const tagHTML = templates.tagArticleLink(tagArticleHTMLData);

      /* [DONE] add generated code to html variable */
      html = html + tagHTML;

      /* [DONE] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [DONE] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    });
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
  /* END LOOP: for every article: */
  }

  /* [DONE] find list of tags in right column */
  const tagList = document.querySelector(select.listOf.tags);

  /* [DONE] get each tag number of occurences */
  const tagsParams = calculateTagParams(allTags);

  /* [DONE] create variable for all links HTML code */
  const allTagsHTMLData = {
    tags: []
  };

  /* [DONE] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    allTagsHTMLData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  /* [DONE] add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsHTMLData);
};
generateTags();

const tagClickHandler = (event) => {
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = event.target;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll(select.all.linksTo.tags + '.active');
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
  const tagLinks = document.querySelectorAll(select.all.linksTo.tags);

  /* START LOOP: for each link */
  tagLinks.forEach(link => {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  });
};
addClickListenersToTags();

const generateAuthors = () => {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(select.all.articles);

  /* [DONE] create a new variable allAuthors with an empty object */
  const allAuthors = {};

  /* [DONE] create variable for all author links HTML code */
  let allAuthorsHTML = '';

  /* [DONE] for each article generate html to be inserted under article title */
  for (let article of articles) {
    /* [DONE] get author name and insert under title name */
    const author = article.getAttribute('data-author');
    const authorArticle = article.querySelector(select.article.author);
    const authorArticleHTMLData = {
      author: author,
      sanitizedAuthor: author.replace(/\s+/g, '-')
    };
    const authorArticleHTML = templates.authorArticleLink(authorArticleHTMLData);
    authorArticle.innerHTML = authorArticleHTML;

    /* [DONE] put author with number of occurences into object allAuthors */
    if (!allAuthors.hasOwnProperty(author)) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }

  /* [DONE] create html links for all authors and number of occurences */
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

  /* [DONE] find list of authors in right column */
  const authorList = document.querySelector(select.listOf.authors);

  /* [DONE] add html from allAuthorsHTML to authorList */
  authorList.innerHTML = templates.authorCloudLink(allAuthorsHTMLData);

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
  const activeAuthorLinks = document.querySelectorAll(select.all.linksTo.authors + '.active');

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
  const authorLinks = document.querySelectorAll(select.all.linksTo.authors);
  authorLinks.forEach(link => {
    link.addEventListener('click', authorClickHandler);
  });
};
addClickListenersToAuthors();
