import view from "../utils/view.js"

export default async function Stories(path){
  const stories = await getStories(path)
  const hasStories = stories.length > 0

  view.innerHTML = `
    <div>
      ${
        hasStories ?
          stories.map(story => `${JSON.stringify(story)}<hr />`) :
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
  return result.ok ? await result.json() : []
}

// https://node-hnapi.herokuapp.com

// / (Top) -> /news
// /new (New) -> /newest 
// /ask (Ask) -> /ask 
// /show (Show) -> /show