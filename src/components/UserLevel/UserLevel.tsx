import React from 'react';
import { Box, Image, Text, VStack } from '@chakra-ui/react';

import BronzeBadge from '../../assets/badges/level1.svg';
import SilverBadge from '../../assets/badges/level2.svg';
import GoldBadge from '../../assets/badges/level3.svg';
import PlatinumBadge from '../../assets/badges/level4.svg';
import DiamondBadge from '../../assets/badges/level5.svg';
import LegendaryBadge from '../../assets/badges/level6.svg';
import DivineBadge from '../../assets/badges/level7.svg';

const badgeLevels = [
  { image: BronzeBadge, name: 'Brązowy Nowicjusz', threshold: 100 },
  { image: SilverBadge, name: 'Srebrny Entuzjasta', threshold: 250 },
  { image: GoldBadge, name: 'Złoty Odkrywca', threshold: 500 },
  { image: PlatinumBadge, name: 'Platynowy Wyzwaniec', threshold: 750 },
  { image: DiamondBadge, name: 'Diamentowy Mistrz', threshold: 1000 },
  { image: LegendaryBadge, name: 'Legendarny Wojownik', threshold: 1500 },
  { image: DivineBadge, name: 'Boski Arcymistrz', threshold: 2000 },
];

interface UserLevelProps {
  points: number;
}

const UserLevel: React.FC<UserLevelProps> = ({ points }) => {
  const earnedBadge = badgeLevels.reduce((acc, badge) => {
    return points >= badge.threshold
? badge
: acc;
  }, badgeLevels[0]);

  return (
    <VStack align='center' bg='transparent' borderRadius='md' spacing={2}>
      <Box boxSize='75px'>
        <Image alt={earnedBadge.name} height='100%' src={earnedBadge.image} width='100%' />
      </Box>
      <Text fontSize='xl' fontWeight='bold' textAlign={'center'}>
        {earnedBadge.name}
      </Text>
      <Text fontSize='md'>Punkty: {points}</Text>
    </VStack>
  );
};

export default UserLevel;
