import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import toast from 'react-hot-toast';

export const useTransaction = () => {
  const { provider } = useWallet();
  const [isPending, setIsPending] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);

  const executeTransaction = async (transactionFunction, successMessage = 'Transaction successful!') => {
    if (!provider) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setIsPending(true);
      setIsConfirmed(false);
      setTransactionHash(null);

      // Show confirmation toast
      toast.loading('Please confirm the transaction in your wallet...', {
        id: 'transaction-confirmation',
      });

      // Execute the transaction
      const tx = await transactionFunction();
      setTransactionHash(tx.hash);

      // Update toast for pending transaction
      toast.loading('Transaction pending...', {
        id: 'transaction-pending',
      });

      // Wait for transaction confirmation
      const receipt = await tx.wait();

      // Update states
      setIsPending(false);
      setIsConfirmed(true);

      // Show success message
      toast.success(successMessage, {
        id: 'transaction-success',
      });

      return receipt;
    } catch (error) {
      console.error('Transaction error:', error);
      
      // Handle user rejection
      if (error.code === 4001) {
        toast.error('Transaction rejected by user');
      } else {
        toast.error(error.message || 'Transaction failed');
      }

      setIsPending(false);
      setIsConfirmed(false);
      throw error;
    }
  };

  return {
    isPending,
    isConfirmed,
    transactionHash,
    executeTransaction,
  };
}; 