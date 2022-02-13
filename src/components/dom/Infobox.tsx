import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Instructions() {
  const { data: session } = useSession()

  return (
    <div className='absolute max-w-lg px-4 py-2 text-sm shadow-xl md:text-base top-8 left-1/2 text-gray-50 transform -translate-x-1/2'>
      <p>
        This game is built using Next.js + Three.js. To enter the game you need
        to be authorized.
      </p>

      <div className='container flex mx-auto px-4'>
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
      </div>
      <div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    </div>
  )
}
