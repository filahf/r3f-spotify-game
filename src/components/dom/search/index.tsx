import useStore from '@/helpers/store'
import useDebounce from '@/hooks/useDebounce'
import useSpotify from '@/hooks/useSpotify'
import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import SearchItem, { SearchItemSkeleton } from './search-item'

const Search = () => {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<
    SpotifyApi.TrackObjectFull[] | undefined
  >()

  const spotifyApi = useSpotify()
  const debouncedQuery = useDebounce<string>(query, 500)

  const resultLimit = 10

  useEffect(() => {
    if (debouncedQuery && spotifyApi.getAccessToken()) {
      setIsSearching(true)
      spotifyApi
        .search(debouncedQuery, ['track', 'artist'], { limit: resultLimit })
        .then((results) => {
          setIsSearching(false)
          setResults(results.body.tracks?.items)
        })
    } else {
      setResults(undefined)
    }
  }, [debouncedQuery, spotifyApi])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef<HTMLInputElement>(null)

  const handleClose = useCallback(() => {
    setQuery('')
    setResults(undefined)
    onClose()
  }, [onClose])

  const handleSelection = (selection: SpotifyApi.TrackObjectFull) => {
    useStore.setState({ selectedTrack: selection })
    handleClose()
  }

  const skeletonArray = new Array(resultLimit).fill(null)

  return (
    <Box>
      <Button onClick={onOpen}>Select Track</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
              </InputLeftElement>
              <Input
                as='input'
                ref={initialRef}
                placeholder='Search Spotify Tracks'
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
            <List spacing={2}>
              {results &&
                !isSearching &&
                results.map((result) => (
                  <SearchItem
                    key={result.id}
                    track={result}
                    onSelect={handleSelection}
                  />
                ))}
              {isSearching &&
                skeletonArray.map((_, id) => <SearchItemSkeleton key={id} />)}
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Search
