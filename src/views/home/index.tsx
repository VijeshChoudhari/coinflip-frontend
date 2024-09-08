import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

interface Props {
  connection: Connection;
}
const HomePage: React.FC<Props> = ({ connection }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const wallet = useWallet();

  const fetchBalance = async () => {
    if (wallet.publicKey) {
      try {
        const walletBalance = await connection.getBalance(wallet.publicKey);
        console.log("walletBalance ==> ", walletBalance);

        setBalance(walletBalance / 1e9);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    } else {
      setBalance(null);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [wallet.connected]);

  return (
    <div>
      <h1>Balance:</h1>
      <p>{balance !== null ? balance : 0} SOL</p>
    </div>
  );
};

export default HomePage;
