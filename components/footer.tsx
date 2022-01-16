import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import { ReactNode } from 'react';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallCentered() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('purple.200', 'purple.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text> MemoTickets.com © 2022</Text>
          <Stack direction={'row'} spacing={10}>
            <SocialButton label={'Twitter'} href={'https://twitter.com/holyaustin'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'Github'} href={'https://github.com/holyaustin'}>
              <FaGithub />
            </SocialButton>
            <SocialButton label={'Linkdeni'} href={'https://www.linkedin.com/in/holyaustin/'}>
              <FaLinkedinIn />
            </SocialButton> 
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}