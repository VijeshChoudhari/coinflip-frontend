import React, { useMemo } from "react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  UnsafeBurnerWalletAdapter,
  CoinbaseWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import HomePage from "./views/home";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

require("@solana/wallet-adapter-react-ui/styles.css");
function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const connection = new Connection(endpoint, "confirmed");
  console.log(endpoint);
  //wallet connection Error handling
  const walletConnectionErr = (error = WalletError) => {
    console.log("Wallet Connection Error:", error);
  };
  const wallet = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new TorusWalletAdapter(),
      new UnsafeBurnerWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ],
    [network]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallet} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          <HomePage connection={connection} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
export default App;
