'use client';

import React from 'react';

import { cn } from '~/lib/utils';

import { toast } from 'sonner';
import {
  type Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

const ConnectButton = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { connectors, connect, isPending } = useConnect();
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const [activeConnector, setActiveConnector] = React.useState<string | null>(
    null
  );

  const onConnect = (connector: Connector) => {
    try {
      setActiveConnector(connector.name);
      connect({ connector });
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    } finally {
      setActiveConnector(null);
    }
  };

  if (!address) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className='rounded-full'>Connect</Button>
        </DialogTrigger>
        <DialogContent className='max-w-sm !rounded-3xl'>
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col'>
            {connectors.map((connector) => {
              const { uid, name, icon } = connector;
              return (
                <Button
                  key={uid}
                  variant='ghost'
                  className='h-11 justify-start gap-3 rounded-lg px-5 text-base'
                  disabled={isPending}
                  onClick={() => onConnect(connector)}
                >
                  <img
                    src={icon}
                    alt={name}
                    className={cn(
                      'h-6 w-6',
                      activeConnector === name && 'opacity-60'
                    )}
                  />
                  {name}
                </Button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
};

export default ConnectButton;
