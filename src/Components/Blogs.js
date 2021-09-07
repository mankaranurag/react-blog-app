import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { selectUserInput, setBlogData } from '../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import '../styling/blogs.css'

const Blogs = () => {
  const searchInput = useSelector(selectUserInput)
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=17d9f502f8783b4a03d6ca0cdf70a337&lang=en`

  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(blog_url)
      .then(response => {
        dispatch(setBlogData(response.data))
        setBlogs(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [searchInput, blog_url, dispatch])
  let counter = 0
  return (
    <div className='blog__page'>
      <h1 className='blog__page__header'>Blogs</h1>

      {loading ? <h1 className='loading'>Loading...</h1> : ''}
      <h4>Total Number of results: {blogs?.totalArticles}</h4>
      <div className='blogs'>
        {blogs?.articles?.map(blog => (
          <a
            className='blog'
            key={counter++}
            rel='noreferrer'
            target='_blank'
            href={blog.url}
          >
            <img src={blog.image} alt={blog.title} />
            <div>
              <h3 className='sourceName'>
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}

        {blogs?.totalArticles === 0 && (
          <h1 className='no__blogs'>
            No blogs Available. Search something on the greatest platform
            available."
          </h1>
        )}
      </div>
    </div>
  )
}

export default Blogs
