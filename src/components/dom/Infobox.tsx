import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Instructions() {
  const { data: session } = useSession()

  return (
    <div>
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

      <div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    </div>
  )
}
