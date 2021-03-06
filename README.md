# Dystopias/cyberpunk/science-fiction Website :robot:
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Status: In progress](https://img.shields.io/badge/status-in%20progress-blueViolet)

Dynamic webiste created as exercise for Web Developer Bootcamp in Kodilla (Module 6.2).

In Kodilla this exercise was prepared with different content, I decided to change it for something that is more interesting for me: books and films that somehow fall into the category of: dystopias/anti-utopias/science-fiction/cyberpunk.

## Teaser

![dystopias](https://user-images.githubusercontent.com/49140572/73445747-a9ea2200-435b-11ea-8e24-6c58da37a68a.PNG)

## Live demo and setup for development

**Live:** [https://natkalia.github.io/dystopias-kodilla-6.2](https://natkalia.github.io/dystopias-kodilla-6.2)

**Repository**: https://github.com/natkalia/dystopias-kodilla-6.2

If you want to run this app at your local machine you have to **clone this repository** or just **download zip file** and unzip it locally. This is up to you. If you decide to clone this repo, you should use the below command in your command line tool: 
```bash
git clone https://github.com/natkalia/dystopias-kodilla-6.2.git
```
After, move to the main folder of the app and use the following command which retrieves all dependencies necessary to build our application:
```bash
npm install
```
If the previous commands was executed successfully, it's time to start the app with the following command:
```bash
npm watch
```
As a result you should be taken to a browser with application running on localhost. Now you are ready to work!

## Technologies
Project is created with:
* HTML
* Sass for CSS
* vanilla Javascript
* Handlebars.js (templating engine)
* custom npm task runner

## Clean code

1. General editing is linted with [editorconfig](https://editorconfig.org/) which helps with basic editing such as tabs vs spaces. You can see the rules in `.editorconfig` file [here](https://github.com/natkalia/dystopias-kodilla-6.2/blob/master/.editorconfig).
2. **HTML**: HTML validation is done with [html-validate](https://www.npmjs.com/package/html-validate/).
3. **Styles**: Sass (and CSS) is linted with [stylelint](https://stylelint.io/). You can see the rules in `.styleintrc.json` file [here](https://github.com/natkalia/dystopias-kodilla-6.2/blob/master/.stylelintrc.json).
4. **JS**: Javascript is linted with [ESLint](http://eslint.org/). You can see the rules in `.eslintrc.json` file [here](https://github.com/natkalia/dystopias-kodilla-6.2/blob/master/.eslintrc.json).

## Todo
- [ ] add more styling
- [ ] add RWD
- [ ] verify/implement browser compatibility
- [ ] add more content
- [ ] add feature that sth should happen in middle column content after clicking tags/authors in the right column
- [ ] verify and add info about launch/installation in readme.md
- [x] add hosting and info about github pages hosting
- [ ] double check linters description/implementation and add info about installation (as plugin/npm package etc.).

## Credits
All books/films descriptions come from Wikipedia.
