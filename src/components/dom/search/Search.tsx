import useDebounce from '@/hooks/useDebounce'
import useSpotify from '@/hooks/useSpotify'
import useStore from '@/shared/store'
import { AudioData } from '@/types'
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

import SearchItem, { SearchItemSkeleton } from './SearchItem'

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
    spotifyApi.getAudioAnalysisForTrack(selection.id).then((results) => {
      useStore.setState({ audioAnalysis: results.body as AudioData })
    })
  }

  const handleOnChange = useCallback((e) => {
    e.stopPropagation()
    setQuery(e.target.value)
  }, [])

  const skeletonArray = new Array(resultLimit).fill(null)

  return (
    <Box>
      <Button onClick={onOpen}>Select Track</Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <InputGroup my={4}>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
              </InputLeftElement>
              <Input
                as='input'
                ref={initialRef}
                placeholder='Search Spotify Tracks'
                onChange={handleOnChange}
              />
            </InputGroup>
            <List spacing={2} mb={3}>
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
