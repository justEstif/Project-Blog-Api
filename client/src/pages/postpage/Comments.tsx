import { nanoid } from 'nanoid'
import { useState } from 'react'
import IComment from '../../interface/IComment'
import Comment from './Comment'
import Form from "./Form"
// TODO: add useGetNewComment hook

interface IProps {
  postComments: IComment[] | undefined
}

const Comments = ({ postComments }: IProps) => {
  return (
    <div>
      <div className="text-2xl">Comments</div>
      {typeof postComments !== 'undefined' ? (
        postComments.map((postComment) => (
          <Comment key={nanoid()} comment={postComment} />
        ))
      ) : (
        <div>No Comments</div>
      )}
    </div>
  )
}

export default Comments
