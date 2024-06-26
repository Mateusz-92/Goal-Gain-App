import React from "react";
import {
  Avatar,
  Badge,
  Box,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useUser } from "../../context/UserContext";

export type Badge = {
  id: string;
  imgUrl: string;
  name: string;
};

export type Saving = {
  amount: number;
  date: string;
};

export type UserAvatarData = {
  avatar: string;
  badges: Badge[];
  name: string;
  points: number;
  savings: {
    crossOutPuzzle: Saving[];
    roulette: Saving[];
  };
  userId: string;
};

const UserAvatar: React.FC = () => {
  const { user } = useUser();

  const totalRouletteSavings = user.savings.roulette.reduce(
    (acc, saving) => acc + saving.amount,
    // eslint-disable-next-line no-magic-numbers
    0
  );
  const totalCrossOutSavings = user.savings.crossOutPuzzle.reduce(
    (acc, saving) => acc + saving.amount,
    // eslint-disable-next-line no-magic-numbers
    0
  );
  const totalSavings: number = totalRouletteSavings + totalCrossOutSavings;
  return (
    <Box
      borderRadius="lg"
      borderWidth="1px"
      overflow="hidden"
      p={5}
      width={"25%"}
    >
      <VStack align="center" spacing={4}>
        <HStack spacing={4}>
          <Avatar size="xl" src={user.avatar} />
          <VStack align="start">
            <Text fontSize="2xl" fontWeight="bold">
              {user.name}
            </Text>
            <Text color="gray.500" fontSize="md">
              Points: {user.points}
            </Text>
          </VStack>
        </HStack>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Badges:
          </Text>
          <HStack spacing={2}>
            {user.badges.map((badge) => (
              <Badge
                key={badge.id}
                borderRadius="full"
                colorScheme="teal"
                px="2"
              >
                <Image alt={badge.name} boxSize="30px" src={badge.imgUrl} />
                {badge.name}
              </Badge>
            ))}
          </HStack>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {`Savings (łącznie ${totalSavings})`}
          </Text>
          <Text>Roulette: {totalRouletteSavings} PLN</Text>
          <Text>Cross Out Puzzle: {totalCrossOutSavings} PLN</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default UserAvatar;
