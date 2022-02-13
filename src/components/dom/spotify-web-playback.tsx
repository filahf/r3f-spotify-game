import useSpotifyPlayer from '@/hooks/useSpotifyPlayer'
import Image from 'next/image'

function WebPlayback({ token }: { token: string }) {
  const { current_track, is_active, is_paused, player } =
    useSpotifyPlayer(token)
  if (!is_active) {
    return (
      <>
        <div>
          <div>
            <b>
              {' '}
              Instance not active. Transfer your playback using your Spotify app{' '}
            </b>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          <div className='main-wrapper'>
            <Image src={current_track.album.images[0].url} alt='' />

            <div>
              <div>{current_track.name}</div>
              <div>{current_track.artists[0].name}</div>

              {player && (
                <>
                  <button
                    onClick={() => {
                      player.previousTrack()
                    }}
                  >
                    &lt;&lt;
                  </button>
                  <button
                    onClick={() => {
                      player.togglePlay()
                    }}
                  >
                    {is_paused ? 'PLAY' : 'PAUSE'}
                  </button>
                  <button
                    onClick={() => {
                      player.nextTrack()
                    }}
                  >
                    &gt;&gt;
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default WebPlayback
