/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// QVBJX0tFWTo4ZjdkNjA2MjQyZWY3MDEwNTY4NGJiNjFmZjdmMjNhMjpmNzlhYzczZDAzMDFjYWM5ZTEyYzFkMGM4YTFiMDFkYw==
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'
import Head from 'next/head'
import { Box, Stack, Heading, Text, Container, Input, Button, SimpleGrid, useBreakpointValue, Image } from '@chakra-ui/react';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import { nftaddress, nftmarketaddress } from '../config'
import { NFTStorage, File } from 'nft.storage'

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJCNUQ0NTM4NUMzODQ0MTUzZjNlNEU5ZjcwNTFiQUMxYTU3RUMyMjQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNzE0NTg0Mzc4MCwibmFtZSI6ImxpYnJhcnkifQ.ZC5aGh9LnQPv5R86pXYKMzXdXcqjTBLWoBl-DshrFhA'
const client2 = new NFTStorage({ token: apiKey })
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createItem() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })

    
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/explore')
  }

  return (
      <><Head>
      <title>Create Ticket</title>
    </Head><Box position={'relative'} bg='#E9D8FD'>
        <Container  

          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}> 

          <Stack bg='#FFFFFF'

            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ xl: 'xl' }}>
            <Stack spacing={4}>
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                Create a Ticket

              </Heading>

            </Stack>
            <Box as={'form'} mt={10} >
              <Stack spacing={4}>
                <Input
                  placeholder="Enter Event Name"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.900'}
                  _placeholder={{
                    color: 'gray.500',
                  }} onChange={e => updateFormInput({ ...formInput, name: e.target.value })} />
                <Input
                  placeholder="Enter Event Venue, Date/T"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.900'}
                  _placeholder={{
                    color: 'gray.500',
                  }} onChange={e => updateFormInput({ ...formInput, description: e.target.value })} />

                <Input
                  placeholder="Enter amount in Matic"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.900'}
                  _placeholder={{
                    color: 'gray.500',
                  }} onChange={e => updateFormInput({ ...formInput, price: e.target.value })} />
                <Input
                  type="file"
                  name="Asset"
                  fontFamily={'heading'}
                  bg={'gray.200'}
                  color={'gray.900'}
                  onChange={onChange} />
                {fileUrl && (
                  <Image
                    src={fileUrl}
                    roundedTop="lg"
                    boxSize="350px"
                    objectFit="cover"
                    //maxHeight="50%" 
                    width="100%"
                    />
                )}
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
                onClick={createItem}
              >
                 <Text fontSize='2xl'>Create Ticket</Text>
              </Button>
            </Box>
            form
          </Stack>
        </Container>
      </Box></>
    )
}



