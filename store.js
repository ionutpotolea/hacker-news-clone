const initialState = {
  favorites: []
}

function favoritesReducer(state = initialState, action) {
  switch(action.type){
    case "ADD_FAVORITE":
      return {...state, favorites: [...state.favorites, action.payload.favorite]}
    case "REMOVE_FAVORITE":
      const newFavorites = state.favorites.filter(favorite => favorite.id !== action.payload.favorite.id)
      return {...state, favorites: newFavorites}
    default:
      return state
  }
}

const action1 = { type: "ADD_FAVORITE", payload: { favorite: { title: "story1", id: 1 } } };
const action2 = { type: "REMOVE_FAVORITE", payload: { favorite: { title: "story1", id: 1 } } };

function createStore(reducer) {
  let currentState = reducer(undefined, {})

  return {
    getState: () => currentState,
    dispatch: action => {
      currentState = reducer(currentState, action)
    }
  }
}

const store = createStore(favoritesReducer)
console.log(store.getState())
store.dispatch(action1)
console.log(store.getState())
store.dispatch(action2)
console.log(store.getState())

export default store
