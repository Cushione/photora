import { useEffect } from 'react'
/**
 * Custom hook for setting the page title on component load
 * @param title Page title
 * @param full Use only provided title without appended "Photora"
 */
export default function usePageTitle(title: string, full = false): void {
  useEffect(() => {
    document.title = full ? title : 'Photora - ' + title
  }, [])
}
