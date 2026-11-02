import React, { useEffect, useState } from 'react';
import MessageModal from './MessageModal';

export type StatusTone = 'error' | 'warning' | 'success';

interface Props {
  tone: StatusTone;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  fullScreen?: boolean;
}

const StatusState: React.FC<Props> = ({
  tone,
  title,
  message,
  actionLabel,
  onAction,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, [tone, title, message]);

  const handleAction = () => {
    setVisible(false);
    onAction?.();
  };

  return (
    <MessageModal
      visible={visible}
      title={title}
      message={message}
      tone={tone}
      confirmLabel={actionLabel || 'OK'}
      cancelLabel={actionLabel && onAction ? 'OK' : undefined}
      onCancel={() => setVisible(false)}
      onConfirm={handleAction}
    />
  );
};

export default StatusState;
