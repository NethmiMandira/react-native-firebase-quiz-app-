import React from 'react';
import StatusState from './StatusState';

interface Props {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  fullScreen?: boolean;
}

const ErrorState: React.FC<Props> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try Again',
  fullScreen = false,
}) => (
  <StatusState
    tone="error"
    title={title}
    message={message}
    actionLabel={onRetry ? retryLabel : undefined}
    onAction={onRetry}
    fullScreen={fullScreen}
  />
);

export default ErrorState;
