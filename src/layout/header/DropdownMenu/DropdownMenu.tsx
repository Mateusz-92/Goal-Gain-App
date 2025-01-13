import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

export type MenuItemType = {
  path: string;
  title: string;
};

type DropdownMenuProps = {
  buttonTitle: string;
  itemTitles: MenuItemType[];
  onClick?: () => void;
};

const DropdownMenu = ({ buttonTitle, itemTitles, onClick }: DropdownMenuProps) => {
  const navigate = useNavigate();

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            _active={{ backgroundColor: 'var(--orange)' }}
            _hover={{ backgroundColor: 'var(--orange)' }}
            as={Button}
            bg='black'
            color='var(--light-gray)'
            isActive={isOpen}
            margin='0'
            padding='0'
            width='222px'
            onClick={onClick}
          >
            {buttonTitle}
          </MenuButton>
          {itemTitles && itemTitles.length > 0 && (
            <MenuList backgroundColor={'var(--dark-gray)'} m={0} maxWidth='100px' p={0}>
              {itemTitles.map((item) => (
                <MenuItem
                  key={item.title}
                  _hover={{ color: 'var(--orange)' }}
                  backgroundColor='transparent'
                  color='var(--light-gray)'
                  textAlign={['center', 'center', 'left']}
                  onClick={() => navigate(item.path)}
                >
                  {item.title}
                </MenuItem>
              ))}
            </MenuList>
          )}
        </>
      )}
    </Menu>
  );
};

export default DropdownMenu;
