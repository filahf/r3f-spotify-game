import { Box, HStack, ListItem, Skeleton, Text } from '@chakra-ui/react'
import Image from 'next/image'

type SearchItemProps = {
  track: SpotifyApi.TrackObjectFull
  onSelect: (item: SpotifyApi.TrackObjectFull) => void
}

export const SearchItemSkeleton = () => {
  return (
    <Skeleton>
      <ListItem p={2} rounded={'sm'}>
        <HStack justifyContent={'space-between'}>
          <Text>Skeleton</Text>
          <Box height='40px' width='40px' />
        </HStack>
      </ListItem>
    </Skeleton>
  )
}

const SearchItem = ({ onSelect, track }: SearchItemProps) => {
  return (
    <ListItem
      tabIndex={0}
      bg={'blackAlpha.300'}
      _hover={{ bg: 'blackAlpha.500' }}
      cursor={'pointer'}
      p={2}
      rounded={'sm'}
      onClick={() => onSelect(track)}
    >
      <HStack justifyContent={'space-between'}>
        <Text>{track.name}</Text>
        <Image
          src={track.album.images[0].url}
          height='40'
          width='40'
          alt={track.album.name}
        />
      </HStack>
    </ListItem>
  )
}

export default SearchItem
