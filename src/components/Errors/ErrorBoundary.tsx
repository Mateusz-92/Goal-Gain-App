import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

import Btn from '../../UI/Btn/Btn';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }
  refreshPage = () => {
    window.location.reload();
  };
  goToHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box>
          <Flex
            alignItems='center'
            direction='column'
            gap={2}
            h='100vh'
            justifyContent='center'
            w='100vw'
          >
            <Heading>Coś poszło nie tak...</Heading>
            <Btn text='Odśwież' type='button' onClick={this.refreshPage} />
            <Btn text='Idź do strony głównej' type='button' onClick={this.goToHome} />
          </Flex>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
