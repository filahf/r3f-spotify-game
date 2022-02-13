import useDebounce from '@/hooks/useDebounce'
import useSpotify from '@/hooks/useSpotify'
import { useEffect, useState } from 'react'

const Search = () => {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<
    SpotifyApi.TrackObjectFull[] | undefined
  >()

  const spotifyApi = useSpotify()
  const debouncedQuery = useDebounce<string>(query, 500)

  useEffect(() => {
    if (debouncedQuery && spotifyApi.getAccessToken()) {
      setIsSearching(true)
      spotifyApi
        .search(debouncedQuery, ['track', 'artist'], { limit: 10 })
        .then((results) => {
          setIsSearching(false)
          setResults(results.body.tracks?.items)
        })
    } else {
      setResults(undefined)
    }
  }, [debouncedQuery, spotifyApi])

  return (
    <>
      <input
        placeholder='Search Spotify Tracks'
        onChange={(e) => setQuery(e.target.value)}
      />
      {isSearching && <div>Searching....</div>}
      {results &&
        results.map((result) => (
          <div key={result.id}>
            <h4>{result.name}</h4>
          </div>
        ))}
    </>
  )
}

export default Search
