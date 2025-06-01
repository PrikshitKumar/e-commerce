import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Button, Spinner } from 'reactstrap';

const WalletConnect = () => {
  const {
    account,
    chainId,
    isConnecting,
    isDisconnecting,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkName = (chainId) => {
    const networks = {
      1: 'Ethereum Mainnet',
      3: 'Ropsten Testnet',
      4: 'Rinkeby Testnet',
      5: 'Goerli Testnet',
      137: 'Polygon Mainnet',
      80001: 'Mumbai Testnet',
    };
    return networks[chainId] || `Chain ID: ${chainId}`;
  };

  if (isConnecting) {
    return (
      <Button color="primary" disabled>
        <Spinner size="sm" /> Connecting...
      </Button>
    );
  }

  if (isDisconnecting) {
    return (
      <Button color="danger" disabled>
        <Spinner size="sm" /> Disconnecting...
      </Button>
    );
  }

  if (account) {
    return (
      <div className="d-flex align-items-center gap-3">
        <div className="text-end">
          <div className="small text-muted">{getNetworkName(chainId)}</div>
          <div className="fw-bold">{formatAddress(account)}</div>
        </div>
        <Button color="danger" size="sm" onClick={disconnectWallet}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button color="primary" onClick={connectWallet}>
      Connect Wallet
    </Button>
  );
};

export default WalletConnect; 