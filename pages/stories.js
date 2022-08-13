import view from "../utils/view.js"
import baseUrl from "../utils/baseUrl.js"
import checkFavorite from "../utils/checkFavorite.js"
import replaceApostrophe from "../utils/replaceApostrophe.js"
import Story from "../components/Story.js"
import store from "../store.js"

export default async function Stories(path){
  const stories = await getStories(path)
  const {favorites} = store.getState()
  console.log(favorites)

  view.innerHTML = `
    <div>
      ${
        stories ?
          stories.map((story, i) => `${Story({ ...story, title: replaceApostrophe(story.title), index: i+1, isFavorite: checkFavorite(favorites, story) })}<hr />`).join('') :
          "There are no stories."
        }
    </div>
  `

  document.querySelectorAll('.favorite').forEach(favoriteButton => {
    favoriteButton.addEventListener("click", async function(){
      const story = JSON.parse(this.dataset.story)
      // console.log(story)
      const isFavorited = checkFavorite(favorites, story)
      console.log({isFavorited})
      store.dispatch({ type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: { favorite: {...story, isFavorite: !isFavorited} } })
      await Stories(path)
    })
  })

  // function updateIsFavorite(array){
  //   stories
  // }
}

async function getStories(path){
  let urlPath
  switch(path){
    case '/':
      urlPath = '/news'
      break
    case '/new':
      urlPath = '/newest'
      break
    default:
      urlPath = path
  }

  const result = await fetch(`${baseUrl}${urlPath}`)
  return result.ok ? await result.json() : null
}

// https://node-hnapi.herokuapp.com

// / (Top) -> /news
// /new (New) -> /newest 
// /ask (Ask) -> /ask 
// /show (Show) -> /show