//QVBJX0tFWTo4ZjdkNjA2MjQyZWY3MDEwNTY4NGJiNjFmZjdmMjNhMjpmNzlhYzczZDAzMDFjYWM5ZTEyYzFkMGM4YTFiMDFkYw==
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Stack, Heading, Text, Container, Input, Button, SimpleGrid, useBreakpointValue, Image } from '@chakra-ui/react';
import Head from 'next/head';
import axios from "axios";

export default function Event() {
  const router = useRouter()

  async function events() {
    

    router.push('/explore')
  }


 return (
    <><Head>
    <title>Watch Live Event</title>
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
              Streaming Live Event

            </Heading>

          </Stack>
          <Box as={'form'} mt={10} >

            <Stack spacing={4}>  
            <>
                <video id='stream'  cclassName="object-fill h-400 w-full" width="100%" height="450px" controls>
                  <source src="https://cdn.livepeer.com/hls/16235077api6lgjb/index.m3u8" type="application/x-mpegURL"/>
                </video>
                </>

            </Stack>
          </Box>
          form
        </Stack>
      </Container>
    </Box></>
  )
}
