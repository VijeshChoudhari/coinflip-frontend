// ConnectionContext.tsx
import React, { createContext, useContext } from "react";
import { Connection } from "@solana/web3.js";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const Network = WalletAdapterNetwork.Devnet; // Adjust as needed
const endpoint = clusterApiUrl(Network);

const connection = new Connection(endpoint, 'confirmed');

const ConnectionContext = createContext<Connection | undefined>(undefined);

export const ConnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ConnectionContext.Provider value={connection}>
    {children}
  </ConnectionContext.Provider>
);

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};
