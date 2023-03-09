export default class Utils {
  public static urlToFile(url: string, name: string): Promise<File> {
    return fetch(url)
      .then((res) => res.blob())
      .then((blob) => new File([blob], name))
  }

  public static createImagePreview(image: File): string {
    return URL.createObjectURL(image)
  }
}
