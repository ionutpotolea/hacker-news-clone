import view from "../utils/view.js"
import baseUrl from "../utils/baseUrl.js"
import Story from "../components/Story.js"
import Comment from "../components/Comment.js"

export default async function Item() {
  let story = null;
  let hasComments = false;  
  let hasError = false;

  try {
    story = await getStory()
    hasComments = story.comments.length > 0
  } catch (error) {
    hasError = true
    console.error(error)
  }
  
  if (!hasError){
    view.innerHTML = `
      <div>
        ${Story(story)}
      </div>
      <hr />
      ${
        story.comments.length > 0 ?
          story.comments.map(comment => Comment(comment)).join('') :
          "No comments"
      }
    `
  } else {
    view.innerHTML =  `<div class="error">Error fetching story</div>`
  }
}

async function getStory(){
  const storyId = window.location.hash.split('?id=')[1]
  const result = await fetch(`${baseUrl}/item/${storyId}`)
  return result.ok ? await result.json() : null
}