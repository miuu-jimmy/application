import { Fragment, useEffect } from 'react'
import MainPageLayout from '../../components/Layouts/MainPage'
import PaymentHistory from './components/PaymentHistory'
import ProfileInfo from './components/ProfileInfo'
import Stats from './components/Stats'
import PaymentButton from './components/payment_button'
import { useWallet } from '@solana/wallet-adapter-react';
import React, {FC, useState, useMemo} from 'react';
import {  Keypair } from '@solana/web3.js';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import {useSelector} from 'react-redux'
import { useRouter } from 'next/router'
const Profile = () => {
  //const [wallet, setWallet] = useState('');
  //const wallet = Keypair.generate();
  //const { wallet, connect, connecting, connected } = useWallet(); Using Anchor Provider
  // dev only 
  const [network, setNetwork] = useState("https://api.testnet.solana.com");
  const b = bs58.decode("36oKvzRUS86mHzj5SiQzVwe9YSfZUyy26zMkZ8r2ZUAqw89ehxsWSUXNPURusoGLzXGJsbcsgTCfbfGufDu8vFC6")
  const j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
  //return new Wallet(Keypair.fromSecretKey(j))
  const [wallet, setWallet] = useState(Keypair.fromSecretKey(j));
  const [isBalanceUpdated, setBalanceUpdated] = useState(Keypair.fromSecretKey(j));
  const user = useSelector(state => state.authReducer.user)
  const router = useRouter()
  useEffect(()=> {
   
    if(!localStorage.user){
      router?.push("/login")
    }
  },[])

  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }
  
  return (
    <Fragment>
      <div className='container px-8 mx-auto'>
        <ProfileInfo wallet={wallet}/>
        
        <Stats  wallet={wallet} isUpdated={isBalanceUpdated} setBalanceUpdated={setBalanceUpdated} className='mt-20' />
        <PaymentButton wallet={wallet} setBalanceUpdated={setBalanceUpdated} className='mt-20'/>
        <PaymentHistory wallet={wallet}/>
       
      </div>
    </Fragment>
  )
}

Profile.Layout = MainPageLayout

export default Profile