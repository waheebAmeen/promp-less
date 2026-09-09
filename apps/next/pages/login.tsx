import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { HomeScreen } from 'app/features/home/screen'

export default function LoginPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/')
  }, [router])
  return <HomeScreen />
}

