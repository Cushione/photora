/**
 * Utility functions
 */
export default class Utils {
  /**
   *
   * @param url image url
   * @param name file name
   * @returns provided image as a file
   */
  public static urlToFile(url: string, name: string): Promise<File> {
    return fetch(url)
      .then((res) => res.blob())
      .then((blob) => new File([blob], name))
  }

  /**
   * Creates a temporary url of a provided file
   * @param image image file
   * @returns a temporary image url of the provided file
   */
  public static createImagePreview(image: File): string {
    return URL.createObjectURL(image)
  }

  /**
   * Transform image with Cloudinary url transformations
   * @param url url of the image
   * @param round round image
   * @param face center on face
   * @param width width to crop to
   * @param crop crop image
   * @param height height to crop to, defaults to provided width
   * @returns url with applied transformations
   */
  public static transformImage(
    url: string,
    round: boolean,
    face: boolean,
    width?: number,
    crop = true,
    height?: number | null,
  ): string {
    return url.replace(
      /upload\//,
      `upload/${crop ? 'c_fill' : 'c_scale'}${face ? ',g_face' : ''}${width ? `,w_${width}` : ''}${height ? `,h_${height}` : height !== null && width ? `,h_${width}` : ''}/${round ? 'r_max/': ''}`
    )
  }
}
