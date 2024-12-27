import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';

type AlertBoxProps = {
  description?: string;
  points?: number;
  status: 'success' | 'warning' | 'info' | 'error';
  title: string;
};

export const AlertBox = ({ description, status, title }: AlertBoxProps) => {
  return (
    <Box
      left='50%'
      opacity={0.9}
      position='fixed'
      top='50%'
      transform='translate(-50%, -50%)'
      width='65%'
    >
      <Alert
        flexDirection='column'
        height='200px'
        justifyContent='center'
        status={status}
        textAlign='center'
        variant='subtle'
      >
        <AlertIcon mr={0} />
        <AlertTitle fontSize='lg' mb={1} mt={4}>
          {title}
        </AlertTitle>
        {description && <AlertDescription maxWidth='sm'>{description}</AlertDescription>}{' '}
      </Alert>
    </Box>
  );
};
