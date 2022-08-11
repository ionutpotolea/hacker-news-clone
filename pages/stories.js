import view from "../utils/view.js"
import Story from "../components/Story.js"

export default async function Stories(path){
  const stories = await getStories(path)

  view.innerHTML = `
    <div>
      ${
        stories ?
          stories.map((story, i) => `${Story({...story, index: i+1})}<hr />`).join('') :
          "There are no stories."
        }
    </div>
  `
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

  const result = await fetch(`https://node-hnapi.herokuapp.com${urlPath}`)
  return result.ok ? await result.json() : null
}

// https://node-hnapi.herokuapp.com

// / (Top) -> /news
// /new (New) -> /newest 
// /ask (Ask) -> /ask 
// /show (Show) -> /show