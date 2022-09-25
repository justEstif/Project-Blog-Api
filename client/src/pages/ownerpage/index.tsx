import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import useGetPosts from '../../hooks/useGetPosts'
import tw from 'tailwind-styled-components'
import { DeleteIcon, EditIcon } from './OwnerIcons'
import SHeader from '../../components/SHeader'

const STable = tw.table`
  table-auto
`

const STh = tw.th`
  text-sm
  font-medium
  text-gray-900
  px-6
  py-4
  text-left
`

const STr = tw.tr`
  bg-white
  border-b
  transition
  duration-300
  ease-in-out
  hover:bg-gray-100
`

const STd = tw.td`
  text-sm
  text-gray-900
  font-light
  px-6
  py-4
  whitespace-nowrap
`

const OwnerPage = () => {
  const posts = useGetPosts()
  return (
    <>
      <SHeader>
        <p className="text-5xl capitalize">Owner Page</p>
      </SHeader>

      {posts.length === 0 ? (
        // TODO :add React framer when loading posts
        <p>Loading posts ... </p>
      ) : (
        <STable>
          <thead>
            <tr>
              <STh>Title</STh>
              <STh>Published</STh>
              <STh>Publication Date</STh>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <STr key={nanoid()}>
                <STd>{post.title}</STd>
                <STd>{post.published ? 'true' : 'false'}</STd>
                <STd>
                  {post.publicationDate
                    ? post.publicationDate.toString()
                    : 'N/A'}
                </STd>
                <STd>
                  <Link to={`/owner/edit/${post._id}`}>
                    <EditIcon />
                  </Link>
                </STd>
                <STd>
                  <Link to={`/owner/delete/${post._id}`}>
                    <DeleteIcon />
                  </Link>
                </STd>
              </STr>
            ))}
          </tbody>
        </STable>
      )}
    </>
  )
}

export default OwnerPage
