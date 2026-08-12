import { useAppStore } from 'app/storage/store'
import { HomeScreen } from 'app/features/home/screen'
import { LandingScreen } from 'app/features/landing/screen'

export default function Index() {
  const { isAuthenticated } = useAppStore();
  return isAuthenticated ? <HomeScreen /> : <LandingScreen />;
}
