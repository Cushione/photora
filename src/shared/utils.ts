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
}
