import { useEffect } from 'react'

export default function usePageTitle(title: string, full = false) {
  useEffect(() => {
    document.title = full ? title : 'Photora - ' + title
  }, [])
}
