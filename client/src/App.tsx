import { useEffect, useState } from 'react'
import axios from 'axios'

interface IPost {
  title: string
  body: string
  _id: string
}

function App() {
  const [data, setData] = useState<IPost[]>([]) // TODO: add interface
  const urlwithProxy = '/api/posts'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlwithProxy)
        const data: IPost[] = response.data
        setData(() => data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <h1>Hello</h1>
      {data.length === 0 ? (
        <p>loading</p>
      ) : (
        data.map((post, i) => <p key={i}>{post.title}</p>)
      )}
    </div>
  )
}

export default App
