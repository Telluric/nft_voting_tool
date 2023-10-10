import SiteHeader from '../src/components/siteHeader'
import ConnectWallet from '../src/features/wallet/ConnectWallet'
import ManualWallet from '../src/features/wallet/ManualWallet'
import { custom } from '@makerx/use-wallet'
import SiteFooter from '../src/components/siteFooter'
import ScrollToTop from '../src/shared/router/ScrollToTop'
import { PropsWithChildren } from 'react'
import { useAlgoWallet } from '../src/utils/useAlgoWalletProvider'

type LayoutProps = PropsWithChildren<unknown>
const SiteContent = ({ children }: LayoutProps) => {
  return <div className='container mx-auto'>{children}</div>
}
// TODO: Refactor Root.tsx to be reusable
export default function RootPreview({children}) {
  const walletProviders = useAlgoWallet({
    nodeToken: import.meta.env.VITE_ALGOD_NODE_CONFIG_TOKEN,
    nodeServer: import.meta.env.VITE_ALGOD_NODE_CONFIG_SERVER,
    nodePort: import.meta.env.VITE_ALGOD_NODE_CONFIG_PORT,
    network: import.meta.env.VITE_ALGOD_NETWORK,
    autoConnect: true,
  })
  return (
    <>
      <SiteHeader />
      <SiteContent>
      <div className='min-h-screen py-8 px-8'>
        {children}
      </div>
    </SiteContent>
      <ConnectWallet />
      <ManualWallet
      manualWalletClient={walletProviders.walletProviders && walletProviders.walletProviders.custom
        ? (walletProviders.walletProviders.custom as custom)
        : undefined} /><SiteFooter /><ScrollToTop /></>
  )
}
