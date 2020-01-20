"use strict";

const titleClickHandler = function(event){

    event.preventDefault();
    const clickedElement = this;
  
    /* [DONE] remove class 'active' from all article links that have this class  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
  
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
  
    /* [DONE] remove class 'active' from all articles that have this class */
    const activeArticles = document.querySelectorAll('.posts .post.active');
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const currentTitleId = clickedElement.getAttribute("href");

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const currentArticle = document.querySelector(currentTitleId);
  
    /* [DONE] add class 'active' to the correct article */
    currentArticle.classList.add('active');
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }