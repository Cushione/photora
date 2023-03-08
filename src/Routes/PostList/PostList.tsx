import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link, useLoaderData } from 'react-router-dom'
import { PaginatedResult } from '../../shared/models/PaginatedResponse.model'
import { Post } from '../../shared/models/Post.model'
import './PostList.scss'

export async function PostListLoader({ request }: { request: any }) {
  const currentUrl = new URL(request.url)
  const results = (
    await axios.get<PaginatedResult<Post>>(
      import.meta.env.VITE_API_URL +
        'posts/?' +
        currentUrl.searchParams.toString()
    )
  ).data
  return results
}

export default function PostList() {
  const { results, next }: PaginatedResult<Post> =
    useLoaderData() as Awaited<ReturnType<typeof PostListLoader>>
  const [currentNext, setCurrentNext] = useState<string>(next)
  const [posts, setPosts] = useState<Post[]>(results)

  const loadMorePosts = async () => {
    const url = new URL(import.meta.env.VITE_API_URL + 'posts/')
    const urlParams = new URLSearchParams(currentNext.split('?').pop())
    url.search = urlParams.toString()
    const newPosts = (await axios.get<PaginatedResult<Post>>(url.toString()))
      .data
    setPosts(posts.concat(newPosts.results))
    setCurrentNext(newPosts.next)
  }

  return (
    <Container id='post-list-container'>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={!!currentNext}
        loader={<h1>Loading</h1>}
      >
        {posts.length ? (
          posts.map((post) => (
            <Card key={post.id} className='m-4'>
              <Card.Body>
                <Card.Text className='d-flex justify-content-between'>
                  <Link
                    to={`/profiles/${post.profile_id}`}
                    className='post-list-profile-link'
                  >
                    <Image
                      className='post-list-avatar'
                      src={post.profile_image}
                    />
                    <span className='ml-2'>{post.profile_name}</span>
                  </Link>
                  <span>{moment(post.created_at).fromNow()}</span>
                </Card.Text>
              </Card.Body>
              <Card.Img src={post.image} />
              <Card.Body>
                <Card.Text className='d-flex'>
                  <Button variant='light'>
                    <i className='fa-regular fa-heart'></i>
                  </Button>
                  <Link
                    to={`/posts/${post.id}#comment`}
                    className='btn btn-light ml-2'
                  >
                    <i className='fa-regular fa-message'></i>
                  </Link>
                  {post.number_of_likes > 0 && (
                    <Button variant='link' className='ml-2'>
                      {post.number_of_likes} Like
                      {post.number_of_likes !== 1 ? 's' : ''}
                    </Button>
                  )}
                </Card.Text>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>
            <i>No posts</i>
          </p>
        )}
      </InfiniteScroll>
    </Container>
  )
}
