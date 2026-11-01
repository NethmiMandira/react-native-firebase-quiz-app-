import React from 'react';
import StatusState from './StatusState';

interface Props {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  fullScreen?: boolean;
}

const WarningState: React.FC<Props> = ({ title = 'Please note', ...props }) => (
  <StatusState tone="warning" title={title} {...props} />
);

export default WarningState;
