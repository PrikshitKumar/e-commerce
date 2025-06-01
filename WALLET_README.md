# Wallet Connection System

This document explains how the wallet connection system works and how to use it in your application.

## Features

- Wallet connection/disconnection (MetaMask support)
- Network detection and switching
- Transaction state management
- UI feedback for all wallet interactions
- Support for multiple networks (Ethereum, Polygon, etc.)

## Setup

1. Wrap your application with the `WalletProvider`:

```jsx
import { WalletProvider } from './contexts/WalletContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <WalletProvider>
      <Toaster position="top-right" />
      {/* Your app components */}
    </WalletProvider>
  );
}
```

2. Use the `WalletConnect` component in your UI:

```jsx
import WalletConnect from './components/WalletConnect';

function Header() {
  return (
    <header>
      <WalletConnect />
    </header>
  );
}
```

## Network Detection

The system automatically detects network changes through MetaMask events. When a user switches networks:

1. The `chainChanged` event is captured
2. The UI updates to show the new network
3. The page reloads to ensure all components are using the correct network

Supported networks:
- Ethereum Mainnet (Chain ID: 1)
- Ropsten Testnet (Chain ID: 3)
- Rinkeby Testnet (Chain ID: 4)
- Goerli Testnet (Chain ID: 5)
- Polygon Mainnet (Chain ID: 137)
- Mumbai Testnet (Chain ID: 80001)

## Transaction Management

Use the `useTransaction` hook to handle blockchain transactions:

```jsx
import { useTransaction } from './hooks/useTransaction';

function MintButton() {
  const { executeTransaction, isPending } = useTransaction();

  const handleMint = async () => {
    try {
      await executeTransaction(
        () => contract.mint(), // Your contract interaction
        'NFT minted successfully!' // Success message
      );
    } catch (error) {
      // Error is already handled by the hook
      console.error(error);
    }
  };

  return (
    <button onClick={handleMint} disabled={isPending}>
      {isPending ? 'Minting...' : 'Mint NFT'}
    </button>
  );
}
```

## UI Feedback

The system provides automatic UI feedback for all wallet interactions:

1. Connection Status:
   - Loading spinner during connection/disconnection
   - Success/error toasts for connection events
   - Display of connected address and network

2. Transaction Status:
   - "Confirm in wallet" prompt
   - Loading state during transaction
   - Success/error messages
   - Transaction hash display

## Error Handling

The system handles common wallet-related errors:

- Missing MetaMask installation
- User rejection of connection/transaction
- Network switching errors
- Transaction failures

All errors are displayed to the user via toast notifications.

## Best Practices

1. Always check for wallet connection before initiating transactions
2. Handle network switching gracefully
3. Provide clear feedback for all user actions
4. Use the transaction hook for all blockchain interactions
5. Test on multiple networks during development 