import React from 'react'

import Image          from './feedbacks/Image'
import ImageTimer     from './feedbacks/ImageTimer'
import Video          from './feedbacks/Video'
import Dummy          from './feedbacks/Dummy'
import Reaction       from './feedbacks/Reaction'
import Visual         from './feedbacks/Visual'
import Question       from './feedbacks/Question'
import Answer         from './feedbacks/Answer'
import Likert         from './feedbacks/Likert'
import VoteUpDown     from './feedbacks/VoteUpDown'
import MultipleChoice from './feedbacks/MultipleChoice'


const FeedbackFactory = (props) => {
  // info: don't change state here - this is used to render feedback
  const { feedback, artwork, artworkAspectRatio, updateNavCenterMsg, send } = props
  if (!feedback || !feedback.type || !artwork) {
    return null
  }
  const artworkID = artwork.id
  console.log('FeedbackFactory:', feedback.type);
  switch (feedback.type) {
    case 'dummy':
      return <Dummy
              artworkID={artworkID} feedback={feedback} send={send}
             />
      break
    case 'imagetimer':
      return <ImageTimer
              artworkID={artworkID} feedback={feedback} send={send}
              updateNavCenterMsg={this.updateNavCenterMsg}
             />
      break
    case 'image':
      return <Image
              artworkID={artworkID} feedback={feedback} send={send}
             />
      break
    case 'video':
      return <Video
              artworkID={artworkID} feedback={feedback} send={send}
             />
      break
    case 'reaction':
      return <Reaction
              artworkID={artworkID} feedback={feedback} send={send}
             />
      break
    case 'visual':
      return <Visual
              artworkID={artworkID} feedback={feedback} send={send}
              artwork={artwork}
              aspectRatio={artworkAspectRatio}
            />
      break
    case 'question':
      return <Question
              artworkID={artworkID} feedback={feedback} send={send}
             />
      break
    case 'answer':
      return <Answer
              artworkID={artworkID} feedback={feedback} send={send}
             />
      break
    case 'likert':
      return <Likert
              artworkID={artworkID} feedback={feedback} send={send}
             />
      break
    case 'multiplechoice':
      return <MultipleChoice
              artworkID={artworkID} feedback={feedback} send={send}
             />
      break
    case 'vote':
      return <VoteUpDown
              artworkID={artworkID} feedback={feedback} send={send}
             />
      break
  }
  console.error('unknown feedback.type', feedback.type)
  return null

}

export default FeedbackFactory;
