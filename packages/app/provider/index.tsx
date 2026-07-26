import { SafeArea } from './safe-area'
import { I18nextProvider } from 'react-i18next'
import i18n from '../locales'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeArea>{children}</SafeArea>
    </I18nextProvider>
  )
}
