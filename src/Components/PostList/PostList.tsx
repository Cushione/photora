import axios from 'axios'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import PostEntry from '../PostEntry/PostEntry'
import { PaginatedResult } from '../../shared/models/PaginatedResponse.model'
import { Post } from '../../shared/models/Post.model'

/**
 * Props for Post List
 */
interface PostListProps extends PaginatedResult<Post> {
  emptyMessage?: JSX.Element
  title?: string
}

/**
 * Component for displaying a paginated result of posts with infinite scroll feature
 * @param props Post List Props
 * @returns Post List
 */
export default function PostList({
  next,
  results,
  emptyMessage,
  title,
}: PostListProps) {
  const [currentNext, setCurrentNext] = useState<string>(next)
  const [posts, setPosts] = useState<Post[]>(results)
  const navigate = useNavigate()

  /**
   * Function for loading the next page of the result
   */
  const loadMorePosts = async (): Promise<void> => {
    const url = new URL(currentNext)
    /*
     Replace hostname in the url with the axios base url so the 
     function works locally and in production
     */
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
      {title && <h2 className='text-center'>{title}</h2>}
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={!!currentNext}
        loader={<h1>Loading</h1>}
      >
        {/* Display posts as Post Entries */}
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
          <p>{emptyMessage ? emptyMessage : <i>No posts</i>}</p>
        )}
      </InfiniteScroll>
    </Container>
  )
}
