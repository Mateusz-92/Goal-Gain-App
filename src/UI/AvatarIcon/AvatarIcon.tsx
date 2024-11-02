import { Avatar } from '@chakra-ui/react';

import { useAuth } from '../../context/AuthContext';
import { useGetUserAvatar } from '../../firebase/queries';

const dummyAvatarIcon =
  'https://static.vecteezy.com/system/resources/previews/007/319/933/non_2x/black-avatar-person-icons-user-profile-icon-vector.jpg';

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
// import { Avatar } from '@chakra-ui/react';
// import { useEffect, useState } from 'react';
// import { useGetUserAvatar } from '../../firebase/queries';
// import { useAuth } from '../../context/AuthContext';

// const dummyAvatarIcon =
//   'https://static.vecteezy.com/system/resources/previews/007/319/933/non_2x/black-avatar-person-icons-user-profile-icon-vector.jpg';

// type AvatarIconProps = {
//   avatarState?: string;
// };

// export const AvatarIcon: React.FC<AvatarIconProps> = ({ avatarState }) => {
//   const { user } = useAuth();
//   const userId = user?.uid || '';
//   const { data, isLoading, isError } = useGetUserAvatar(userId);
//   const [avatarUrl, setAvatarUrl] = useState<string>(data || avatarState || dummyAvatarIcon);

//   // Use effect to update the avatar URL whenever avatarState or data changes
//   useEffect(() => {
//     setAvatarUrl(avatarState || data || dummyAvatarIcon);
//   }, [avatarState, data]);

//   if (isLoading) return <div>isLoading</div>;
//   if (isError) return <div>isError</div>;

//   return <Avatar size='xl' src={avatarUrl} />;
// };
