export function getDownloadUrl(fileUrl: string): string {
  return `${fileUrl}${fileUrl.includes("?") ? "&" : "?"}dl=`;
}
