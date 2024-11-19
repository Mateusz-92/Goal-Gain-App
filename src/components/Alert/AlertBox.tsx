// import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';

// export const AlertSuccessPoints = ({ points }: { points: number }) => {
//   return (
//     <Box
//       opacity={0.9}
//       position='fixed'
//       top='50%'
//       left='50%'
//       transform='translate(-50%, -50%)'
//       width='45%'
//     >
//       {points > 0 && (
//         <Alert
//           flexDirection='column'
//           height='200px'
//           justifyContent='center'
//           status='success'
//           textAlign='center'
//           variant='subtle'
//         >
//           <AlertIcon mr={0} />
//           <AlertTitle fontSize='lg' mb={1} mt={4}>
//             Zdobyłeś {points} punktów !!!
//           </AlertTitle>
//           <AlertDescription maxWidth='sm'>
//             Planuj, realizuj, zdobywaj punkty i odznaki...
//           </AlertDescription>
//         </Alert>
//       )}
//       {points < 0 && (
//         <Alert
//           flexDirection='column'
//           height='200px'
//           justifyContent='center'
//           status='warning'
//           textAlign='center'
//           variant='subtle'
//         >
//           <AlertIcon mr={0} />
//           <AlertTitle fontSize='lg' mb={1} mt={4}>
//             To działanie spowodowało odjęcie {Math.abs(points)} punktów !!!
//           </AlertTitle>
//           <AlertDescription maxWidth='sm'>Wykonaj ponownie aby je dodać</AlertDescription>
//         </Alert>
//       )}
//     </Box>
//   );
// };
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';

type AlertBoxProps = {
  // Explicitly define status types
  description?: string; 
  points?: number;
  status: 'success' | 'warning' | 'info' | 'error'; 
  // Make points optional
  title: string; //  Make description optional
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
        height='200px' // Consider making this dynamic or removing it
        justifyContent='center'
        status={status}
        textAlign='center'
        variant='subtle'
      >
        <AlertIcon mr={0} />
        <AlertTitle fontSize='lg' mb={1} mt={4}>
          {title}
          {/* Conditionally show points */}
        </AlertTitle>
        {description && <AlertDescription maxWidth='sm'>{description}</AlertDescription>}{' '}
        {/* Conditionally show description */}
      </Alert>
    </Box>
  );
};
