import React from 'react';

import { cn } from '~/lib/utils';

import { Connector, useConnect, useConnectors } from 'wagmi';

import { Button } from '~/components/ui/button';
import { DialogContent } from '~/components/ui/dialog';

const ConnectModal = () => {
  const { connectAsync, isPending, status, failureReason } = useConnect();
  const [activeConnector, setActiveConnector] =
    React.useState<Connector | null>(null);

  const connectors = useConnectors();

  const onConnect = async (connector: Connector) => {
    try {
      setActiveConnector(connector);
      await connectAsync({ connector });
    } catch (error) {
      console.error(error);
    } finally {
      setActiveConnector(null);
    }
  };
  return (
    <DialogContent className='max-w-sm !rounded-3xl pt-0'>
      {(status === 'idle' || status === 'error') && (
        <div className='flex flex-col gap-2 pt-4'>
          <div className='pb-3 text-lg font-semibold'>Connect Wallet</div>
          {failureReason && (
            <div className='rounded-xl bg-[#ffe3e3] px-3 py-1 font-medium text-destructive'>
              {
                // @ts-expect-error err
                failureReason?.shortMessage ??
                  // @ts-expect-error err
                  failureReason.details ??
                  failureReason.message.split('\n')[0]
              }
            </div>
          )}
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
                    activeConnector?.name === name && 'opacity-60'
                  )}
                />
                {name}
              </Button>
            );
          })}
        </div>
      )}
      {status === 'pending' && (
        <div className='flex flex-col items-center justify-center gap-4 p-4 pt-10'>
          <img
            src={activeConnector?.icon}
            className='h-16 w-16'
            alt='Connecting...'
          />
          <div className='mt-4 text-base font-bold'>
            Connecting to {activeConnector?.name}...
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default ConnectModal;
