import useSpotify from '@/hooks/useSpotify'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect } from 'react'
import styled from 'styled-components'

const Box = styled.div`
  position: absolute;
  max-width: 32rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: rgb(27, 30, 40);
  font-size: 1rem;
  top: 2rem;
  left: 50%;
  transform: translate(-50%);
  color: rgb(249 250 251);
`

const UserBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  flex-direction: column;
  margin: 1rem 0;
`

export default function Instructions() {
  const { data: session } = useSession()
  console.log(session)

  const spotifyApi = useSpotify()

  useEffect(() => console.log(spotifyApi.getAccessToken()), [spotifyApi])

  return (
    <Box>
      <p>
        This game is built using Next.js + Three.js. To enter the game you need
        to be authorized.
      </p>

      <UserBox>
        {session && (
          <>
            {session.user?.image && (
              <div>
                <Image
                  src={session.user?.image}
                  alt={'test'}
                  width={100}
                  height={100}
                  layout='fixed'
                />
              </div>
            )}

            <span>{session?.user?.name}</span>
          </>
        )}
      </UserBox>
      <div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    </Box>
  )
}
