import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { HomeScreen } from 'app/features/home/screen'

export default function LandingPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/')
  }, [router])
  return <HomeScreen />
}

