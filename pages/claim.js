/* pages/claim.js */
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Stack, Heading, Text, Container, Input, Button, SimpleGrid, useBreakpointValue, Image } from '@chakra-ui/react';
import Head from 'next/head';
import axios from "axios";

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({  name: '' })
  const router = useRouter()

  async function mintNFT() {
    const { name } = formInput
    const options = {
        method: 'POST',
        url: 'https://api.nftport.xyz/v0/mints/easy/urls',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '768bfb7a-087d-4ee1-8bb0-5498cc36ad46' 
        },
        data: {
          chain: 'polygon',
          name: 'MemoTicket',
          description: 'Memorable Ticket NFT',
          file_url: 'https://thumbs.dreamstime.com/b/conceptual-hand-writing-showing-well-done-concept-meaning-used-praising-demonstrating-group-something-have-good-way-young-142552626.jpg',
          mint_to_address: formInput.name
        }
      };

        axios.request(options).then(function (response) {
          console.log(response.data);
          alert("Your Memories for this event have just been sent to your wallet");
        }).catch(function (error) {
          console.error(error);
        });
       router.push('/')
 }

 return (
    <><Head>
    <title>Create Ticket</title>
  </Head><Box position={'relative'} bg='#E9D8FD'>
      <Container  
        //as={SimpleGrid}
        //maxW={'7xl'}
        //columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}> 

        <Stack bg='#FFFFFF'
          //bg={'gray.100'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ xl: 'xl' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Claim your Memories

            </Heading>

          </Stack>
          <Box as={'form'} mt={10} >
            <Stack spacing={4}>
              <Input
                placeholder="Enter your wallet address"
                bg={'gray.100'}
                border={0}
                color={'gray.900'}
                _placeholder={{
                  color: 'gray.500',
                }} onChange={e => updateFormInput({ ...formInput, name: e.target.value })} />

            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bg={'purple.400'}
              color={'white'}
              height='100px'
              border='2px'
              _hover={'purple.400'}
              onClick={mintNFT}
            >
               <Text fontSize='2xl'>Claim</Text>
            </Button>
          </Box>
          form
        </Stack>
      </Container>
    </Box></>
  )
}
