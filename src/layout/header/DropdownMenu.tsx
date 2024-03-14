import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button,Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export type MenuItemType = {
  title: string;
};

type DropdownMenuProps = {
  buttonTitle: string;
  itemTitles: MenuItemType[];
};

const DropdownMenu = ({ buttonTitle, itemTitles }: DropdownMenuProps) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            _active={{ opacity: 0.8 }}
            _hover={{ opacity: 0.8 }}
            as={Button}
            bg="teal"
            color="white"
            isActive={isOpen}
            rightIcon={<ChevronDownIcon />}
            width="222px"
          >
            {buttonTitle}
          </MenuButton>
          <MenuList>
            {itemTitles.map((item) => (
              <MenuItem
                key={item.title}
                _hover={{ opacity: 0.8 }}
                backgroundColor="teal"
                color="white"
              >
                {item.title}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default DropdownMenu;
