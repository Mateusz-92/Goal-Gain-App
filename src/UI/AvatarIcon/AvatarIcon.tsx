import { Avatar } from '@chakra-ui/react';

import { dummyAvatarIcon } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { useGetUserAvatar } from '../../firebase/queries';

type AvatarIconProps = {
  avatarState?: string;
};

export const AvatarIcon: React.FC<AvatarIconProps> = ({ avatarState }) => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetUserAvatar(userId);

  if (isLoading) return <div>isLoading</div>;
  if (isError) return <div>isError</div>;

  return <Avatar size='xl' src={data || dummyAvatarIcon || avatarState} />;
};
