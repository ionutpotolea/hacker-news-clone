import view from "../utils/view.js"
import store from "../store.js"
import Story from "../components/Story.js"
import checkFavorite from "../utils/checkFavorite.js"


export default function Favorites(){
  const {favorites} = store.getState()
  const hasFavorites = favorites.length > 0
  console.log(favorites)

  if (hasFavorites){
    view.innerHTML = favorites.map(favorite => `${Story(favorite)}`).join('')
  } else {
    view.innerHTML = `No favorites yet.`
  }

  document.querySelectorAll('.favorite').forEach(favoriteButton => {
    favoriteButton.addEventListener("click", async function(){
      const story = JSON.parse(this.dataset.story)
      const isFavorited = checkFavorite(favorites, story)
      store.dispatch({ type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: { favorite: {...story, isFavorite: !isFavorited} } })
      Favorites()
    })
  })
}