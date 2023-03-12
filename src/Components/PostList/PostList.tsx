import axios from 'axios'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import PostEntry from '../PostEntry/PostEntry'
import { PaginatedResult } from '../../shared/models/PaginatedResponse.model'
import { Post } from '../../shared/models/Post.model'

interface PostListProps extends PaginatedResult<Post> {
  emptyMessage?: JSX.Element
}

export default function PostList({ next, results, emptyMessage }: PostListProps) {
  const [currentNext, setCurrentNext] = useState<string>(next)
  const [posts, setPosts] = useState<Post[]>(results)
  const navigate = useNavigate()

  const loadMorePosts = async () => {
    const url = new URL(currentNext)
    const newPosts = (
      await axios.get<PaginatedResult<Post>>(
        url.pathname.toString() + url.search.toString()
      )
    ).data
    setPosts(posts.concat(newPosts.results))
    setCurrentNext(newPosts.next)
  }

  return (
    <Container id='post-list-container' className='mw-600'>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={!!currentNext}
        loader={<h1>Loading</h1>}
      >
        {posts.length ? (
          posts.map((post) => (
            <PostEntry
              openable
              key={post.id}
              post={post}
              onCommentClick={() => navigate(`/posts/${post.id}`)}
            ></PostEntry>
          ))
        ) : (
          <p>
            {emptyMessage ? emptyMessage : <i>No posts</i>}
          </p>
        )}
      </InfiniteScroll>
    </Container>
  )
}
