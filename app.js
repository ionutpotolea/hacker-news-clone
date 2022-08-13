import RouterHandler from './router.js'
import './store.js'

window.onhashchange = () => {
  setActiveLink(); 
}

function setActiveLink(){
  const links = document.querySelectorAll('.header-link')
  links.forEach(link => {
    const linkPath = link.getAttribute('href')
    const currentHash = window.location.hash
    if(linkPath === currentHash){
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })
}

class App {
  constructor() {
    new RouterHandler();  
  }  
}

new App();
