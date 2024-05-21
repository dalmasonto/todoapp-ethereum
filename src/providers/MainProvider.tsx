import { MantineProvider } from '@mantine/core'
import { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { config } from '../config/config'
import Web3ModalProvider from '../context'

interface IMainProvider {
    children: ReactNode
}

const MainProvider = (props: IMainProvider) => {

    const { children } = props

    return (
        <Web3ModalProvider>
            <WagmiProvider config={config}>
                <MantineProvider>
                    {children}
                </MantineProvider>
            </WagmiProvider>
        </Web3ModalProvider>
    )
}

export default MainProvider