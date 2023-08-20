export const getURLWithParams = (
  urlString: string,
  params: Record<string, unknown>
) => {
  const url = new URL(urlString)

  Object.entries(params)
    .filter(([, value]) => value != null)
    .forEach(([key, value]) => url.searchParams.set(key, String(value)))

  return String(url)
}
