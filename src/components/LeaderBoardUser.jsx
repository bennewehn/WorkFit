import { Avatar, Badge, Flex, Icon } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'

const LoaderboardUser = (props) => {
  return (
    <Flex alignItems={"center"} padding=".8em" margin="auto" gap={".3em"} maxWidth={"35rem"}>
      <Badge color={((props.placement === 1 || props.placement === 2) && "black")} backgroundColor={(props.placement === 1 && "gold") || (props.placement === 2 && "silver") || (props.placement === 3 && "yellow.800")} borderRadius={"full"} padding={2} as="b" marginLeft={0} fontSize={25} >{props.placement}</Badge>
      <Avatar marginLeft={2} />
      <Text marginLeft={2} fontSize={25} >{props.name}</Text>
      <Text marginLeft={2} fontSize={25} >{props.surname}</Text>
      <Text as="b" fontSize={21} marginLeft="auto" >{props.balance}</Text>
    </Flex>
  );
};

export default LoaderboardUser;
