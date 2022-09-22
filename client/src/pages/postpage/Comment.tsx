import IComment from '../../interface/IComment'
import getFormattedDate from '../../utils/getFormattedDate'

interface IProps {
  comment: IComment
}

const Comment = ({ comment }: IProps) => (
  <div className="my-5">
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

export default Comment
