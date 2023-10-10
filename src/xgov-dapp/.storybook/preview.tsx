import 'tailwindcss/tailwind.css'
import '../src/main.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { lightTheme, darkTheme } from '../src/themes'
import { withRouter, reactRouterParameters } from 'storybook-addon-react-router-v6'
import type { Preview } from '@storybook/react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { WalletProvider } from '@makerx/use-wallet'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { useAlgoWallet } from '../src/utils/useAlgoWalletProvider'
import { RecoilRoot } from 'recoil'
import { MemoryRouter } from "react-router";
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  }
}

export const decorators = [
  (Story) => {
    const walletProviders = useAlgoWallet({
      nodeToken: '',
      nodeServer: 'https://testnet-api.algonode.cloud',
      nodePort: '443',
      network: 'testnet',
      autoConnect: true,
    })
    return (
      <MemoryRouter>
        <RecoilRoot>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <WalletProvider value={walletProviders.walletProviders}>
              <Story />
            </WalletProvider>
          </LocalizationProvider>
        </RecoilRoot>
      </MemoryRouter>
    )
  },
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme(),
      dark: darkTheme(),
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  })
]
export default preview
