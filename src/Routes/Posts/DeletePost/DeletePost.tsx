import axios from 'axios';
import { redirect } from 'react-router-dom'

export async function DeletePostAction({ request, params }) {
  if (request.method.toLowerCase() === 'delete') {
    await axios.delete(`posts/${params.id}`)
    return redirect('/profiles/user')
  }
  return redirect(`/posts/${params.id}`)
}

export async function DeletePostLoader({params}) {
    return redirect(`/posts/${params.id}`)
}
