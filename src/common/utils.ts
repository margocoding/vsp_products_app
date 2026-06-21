export function getImageUrl(path: string) {
  if(path?.startsWith('http') || path?.startsWith('https')) {
    return path;
  }
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`
}