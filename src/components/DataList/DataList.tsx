import { useNavigate } from 'react-router-dom';
import { EditIcon } from '@chakra-ui/icons';
import { Flex, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';

type DataListProps = {
  data: { date?: string | Date; id?: string; routes: string; title: string }[];
};

const DataList = ({ data }: DataListProps) => {
  const navigate = useNavigate();

  const textColor = useColorModeValue('var(--dark-gray)', 'var(--light-gray)');

  return (
    <Flex direction='column' width={'100%'}>
      <List spacing={2}>
        {data.map((item) => (
          <ListItem key={item.id} textAlign={'start'}>
            <Flex alignItems='center' justifyContent='space-around'>
              <Text color={textColor} fontSize='md' fontWeight='medium'>
                {item.title}
              </Text>
              <Text color={textColor} fontSize='md'>
                {item.date?.toString()}
              </Text>

              <EditIcon
                _hover={{ opacity: 0.5 }}
                onClick={() => {
                  const dynamicRoute = `${item.routes}/${item.id}`;
                  navigate(dynamicRoute);
                }}
              />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};

export default DataList;
