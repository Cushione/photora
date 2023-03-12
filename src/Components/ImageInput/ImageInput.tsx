import React, { ChangeEvent, useEffect, useState } from 'react'
import Utils from '../../shared/utils'
import { Image } from 'react-bootstrap'
import './ImageInput.scss'

/**
 * Props for Image Input Component
 */
interface ImageInputProps {
  defaultImage?: string
  round?: boolean
  onChange?: (url: string) => unknown
}

/**
 * Image file input with preview
 * @param props Image Input Props
 * @returns Image file input with preview
 */
export default function ImageInput({
  defaultImage,
  round,
  onChange,
}: ImageInputProps) {
  const [imagePreview, setImagePreview] = useState<string>(defaultImage || '')

  // Notify the parent if the image changes
  useEffect(() => onChange?.(imagePreview), [imagePreview])

  // Update preview is new default image comes from the parent
  useEffect(() => {
    setImagePreview((prev) => defaultImage || prev)
  }, [defaultImage])

  /**
   * When selected file changes, update preview with the new file
   * @param event File input change event
   */
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files
    if (!files || !files.length || !files[0].type.startsWith('image')) {
      return
    }
    setImagePreview(Utils.createImagePreview(files[0]))
  }

  return (
    <>
      {/** Image file input hidden by css */}
      <input
        id='image-input'
        type='file'
        name='imageName'
        onChange={handleImageChange}
        accept='image/*'
      />
      {/* Preview of the selected file 
      User can open file select dialog by clicking on the image */}
      <label htmlFor='image-input' className='image-input-label'>
        <Image
          fluid
          id='image-input-preview'
          src={imagePreview}
          alt='image preview'
          roundedCircle={round}
          rounded={!round}
        />
        <i className='fa-regular fa-pen-to-square fa-2xl'></i>
      </label>
       {/* Hidden input field containing url of the selected image */}
      <input type='hidden' name='imagePreview' value={imagePreview} />
    </>
  )
}
