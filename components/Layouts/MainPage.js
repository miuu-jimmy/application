import Header from '../Header'
import Footer from '../Footer'
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { ConnectionProvider, useLocalStorage, WalletProvider } from '@solana/wallet-adapter-react';
import React, {FC, useState, useMemo} from 'react';
import { Keypair } from '@solana/web3.js';


import { CoinbaseWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter, } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
const MainPageLayout = ({ children }) => {
  const [network, setNetwork] = useState("https://api.testnet.solana.com");
 
  const wallets = useMemo(
    () => [
      new CoinbaseWalletAdapter(),
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    []
  );
  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} >
        <WalletDialogProvider>
    <div className="h-screen flex">
      <div className="w-full relative overflow-auto">
       
        <main className="app-content" >
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
    </WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MainPageLayout