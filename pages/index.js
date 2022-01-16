/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal, { connectors } from "web3modal";
import { SimpleGrid , Flex, Box, Image, useColorModeValue, Button, Heading, Text } from '@chakra-ui/react';
import PillPity from 'pill-pity';
import Head from "next/head"

import { nftaddress, nftmarketaddress } from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

import Hero from '../components/hero.tsx';


export default function Home() {
  return (
      <><Head>
      <title>MemoTickets</title>
    </Head><>
        <Hero />
        <PillPity pattern="glamorous"
          width="100%"
        >
        </PillPity>
        
      </></>
  )
}

