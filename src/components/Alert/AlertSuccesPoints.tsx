import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';

export const AlertSuccessPoints = ({ points }: { points: number }) => {
  return (
    <Box position='absolute' top='1px' width='100%'>
      {points > 0 && (
        <Alert
          flexDirection='column'
          height='200px'
          justifyContent='center'
          status='success'
          textAlign='center'
          variant='subtle'
        >
          <AlertIcon mr={0} />
          <AlertTitle fontSize='lg' mb={1} mt={4}>
            Zdobyłeś {points} punktów !!!
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            Planuj, realizuj, zdobywaj punkty i odznaki...
          </AlertDescription>
        </Alert>
      )}
      {points < 0 && (
        <Alert
          flexDirection='column'
          height='200px'
          justifyContent='center'
          status='warning'
          textAlign='center'
          variant='subtle'
        >
          <AlertIcon mr={0} />
          <AlertTitle fontSize='lg' mb={1} mt={4}>
            To działanie spowodowało odjęcie {Math.abs(points)} punktów !!!
          </AlertTitle>
          <AlertDescription maxWidth='sm'>Wykonaj ponownie aby je dodać</AlertDescription>
        </Alert>
      )}
    </Box>
  );
};
