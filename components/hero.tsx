import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  Link
} from '@chakra-ui/react';

export default function SplitScreen() {
  return (
    
    <Stack bg='#E9D8FD' minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      

      <Flex flex={1}>
        <Image
          alt={'FrontPage Image'}
          objectFit={'cover'}
          src={
            '/memoticket.png' 
          }
        />
      </Flex>

      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={2} w={'full'} maxW={'lg'} >
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
     
          <Text color={'purple.700'} as={'span'}>
              MemoTickets
            </Text>{' '}
            <br />{' '}
            <Text fontSize={{ base: '3xl', lg: 'lg' }}color={'purple.500'} as={'span'}>
              Memories for every ticket
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.700'}>
            This is an NFT-based ticketing Platform. Event Managers can create Tickets while users can buy tickets 
            and after event, they come and claim the memories of the event as an NFT into thier wallet. whenever 
            they go through thier collectibles in the future, they remember the event
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button size='lg' 
              height='100px'
              width='250px'
              border='2px'
            bg={'purple.500'}
              color={'white'}
              _hover={{
                bg: 'purple.700',}}
            ><Link 
               href={'create'}
            >
              <Text fontSize='2xl'>Create Ticket </Text>
            </Link></Button>
            <Button  size='lg'  
                          height='100px'
                          width='250px'
                          border='2px'         
                          bg={'purple.500'}
                          color={'white'}
                          _hover={{
                            bg: 'purple.700',}}
                              
            ><Link href={'explore'}>
              <Text fontSize='2xl'>Explore Tickets</Text>
              </Link></Button>
          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button size='lg'
                          height='100px'
                          width='510px'
                          border='2px'
            bg={'purple.500'}
              color={'white'}
              _hover={{
                bg: 'purple.700',}}
            ><Link 
               href={'claim'}
            >
              <Text fontSize='2xl'>Claim Memories</Text>
            </Link></Button>

          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}