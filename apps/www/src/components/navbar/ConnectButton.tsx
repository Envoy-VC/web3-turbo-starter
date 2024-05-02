'use client';

import React from 'react';

import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

import { Button } from '~/components/ui/button';
import { Dialog, DialogTrigger } from '~/components/ui/dialog';

import ConnectModal from './ConnectModal';

const ConnectButton = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  if (!address) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className='rounded-full'>Connect</Button>
        </DialogTrigger>
        <ConnectModal />
      </Dialog>
    );
  }
};

export default ConnectButton;
