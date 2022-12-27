import { showNotification as showNotificationMantine } from '@mantine/notifications';
import { IconCheck, IconX, IconExclamationMark } from '@tabler/icons';

export const showNotification = (props: {
  type: 'success' | 'error' | 'info';
  message: string;
}) => {
  showNotificationMantine({
    message: props.message,
    color:
      props.type === 'success'
        ? 'green'
        : props.type === 'error'
        ? 'red'
        : 'yellow',
    icon:
      props.type === 'success' ? (
        <IconCheck size={20} />
      ) : props.type === 'error' ? (
        <IconX size={20} />
      ) : (
        <IconExclamationMark size={20} />
      ),
  });
};
