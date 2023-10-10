import ConnectWalletModal from './ConnectWallet'
import { useSetShowConnectWalletModal, useShowConnectWalletModal } from './state'
import { useEffect, useRef } from 'react'

export default {
  title: 'Components',
  render: () => {
    const ref = useRef(false)
    const showConnectedWalletModal = useShowConnectWalletModal()
    const setShowConnectedWalletModal =  useSetShowConnectWalletModal()
    setShowConnectedWalletModal(true)
    useEffect(() => {
      console.log({ref, showConnectedWalletModal})
      if(!ref.current && showConnectedWalletModal) {
        ref.current = true
      }

      if(!showConnectedWalletModal && ref.current){
          alert('Wallet Connect Closed')
      }

    }, [showConnectedWalletModal])
    return <ConnectWalletModal />
  },
}

export const ConnectWallet = {}
