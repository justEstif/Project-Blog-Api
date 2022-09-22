import IComment from '../../interface/IComment'
import { nanoid } from 'nanoid'
import getFormattedDate from '../../utils/getFormattedDate'

interface IProps {
  postComments: IComment[] | undefined
}

const Comments = ({ postComments }: IProps) => {
  const comment = (comment: IComment) => (
    <div key={nanoid()} className="my-5">
      <div className="flex gap-2 justify-start">
        <p className="text-emerald-700">
          {comment.user ? comment.user.username : 'username '}
        </p>
        <p className="italic">
          {getFormattedDate(new Date(comment.commentDate))}
        </p>
      </div>
      <p>{comment.body}</p>
    </div>
  )
  return (
    <div>
      <div className="text-2xl">Comments</div>
      {typeof postComments !== 'undefined' ? (
        postComments.map((postComment) => comment(postComment))
      ) : (
        <div>No Comments</div>
      )}
    </div>
  )
}

export default Comments
