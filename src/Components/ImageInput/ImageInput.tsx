import React, { useState } from 'react'
import Utils from '../../shared/utils'
import { Image } from 'react-bootstrap'
import './ImageInput.scss'

interface ImageInputProps {
  defaultImage?: string
  rounded?: boolean
}

export default function ImageInput({ defaultImage, rounded }: ImageInputProps) {
  const [imagePreview, setImagePreview] = useState<string>(defaultImage || '')

  const handleImageChange = (event) => {
    const files = event.target.files
    if (!files && !files.length && !files[0].type.startsWith('image')) {
      return
    }
    setImagePreview(Utils.createImagePreview(files[0]))
  }

  return (
    <>
      <input
        id='image-input'
        type='file'
        name='imageName'
        onChange={handleImageChange}
        accept='image/*'
      />
      <label htmlFor='image-input' className='image-input-label'>
        <Image
          fluid
          id='image-input-preview'
          src={imagePreview}
          alt='image preview'
          roundedCircle={rounded}
        />
        <i className='fa-regular fa-pen-to-square fa-2xl'></i>
      </label>
      <input type='hidden' name='imagePreview' value={imagePreview} />
    </>
  )
}
