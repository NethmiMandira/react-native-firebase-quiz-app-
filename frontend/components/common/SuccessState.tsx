import React from 'react';
import StatusState from './StatusState';

interface Props {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  fullScreen?: boolean;
}

const SuccessState: React.FC<Props> = ({ title = 'Success', ...props }) => (
  <StatusState tone="success" title={title} {...props} />
);

export default SuccessState;
