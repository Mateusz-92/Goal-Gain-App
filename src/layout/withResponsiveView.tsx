import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

export function withResponsiveView(
  MobileComponent: React.ComponentType,
  DesktopComponent: React.ComponentType,
) {
  return function ResponsiveComponent(props: any) {
    const isMobile = useBreakpointValue({ base: true, md: false, sm: true });
    return isMobile
? <MobileComponent {...props} />
: <DesktopComponent {...props} />;
  };
}
