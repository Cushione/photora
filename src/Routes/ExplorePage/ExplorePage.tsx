import axios from 'axios'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import PostList from '../../Components/PostList/PostList'
import { PaginatedResult } from '../../shared/models/PaginatedResponse.model'
import { Post } from '../../shared/models/Post.model'

export async function ExplorePageLoader() {
  const results = (await axios.get<PaginatedResult<Post>>('posts')).data
  return results
}

export default function ExplorePage() {
  const result: PaginatedResult<Post> = useLoaderData() as Awaited<
    ReturnType<typeof ExplorePageLoader>
  >

  return <PostList {...result}/>
}
