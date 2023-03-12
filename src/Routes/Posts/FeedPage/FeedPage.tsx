import axios from 'axios'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import PostList from '../../../Components/PostList/PostList'
import usePageTitle from '../../../shared/hooks/usePageTitle'
import { PaginatedResult } from '../../../shared/models/PaginatedResponse.model'
import { Post } from '../../../shared/models/Post.model'

export async function FeedPageLoader() {
  const results = (await axios.get<PaginatedResult<Post>>('posts/feed')).data
  return results
}

export default function FeedPage() {
  const result: PaginatedResult<Post> = useLoaderData() as Awaited<
    ReturnType<typeof FeedPageLoader>
  >

  usePageTitle('Home')

  const noFollowingMessage = (
    <div className='text-center'>
      <h2>Welcome to Photora!</h2>
      <p>It's a bit empty here 🙃</p>
      <p>Try to follow somebody to get your own personalised feed</p>
    </div>
  )

  return <PostList {...result} emptyMessage={noFollowingMessage} title="Feed"/>
}
