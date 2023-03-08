import axios from 'axios'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLoaderData } from 'react-router-dom'
import PostEntry from '../../Components/PostEntry/PostEntry';
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
            <PostEntry post={post}></PostEntry>
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
