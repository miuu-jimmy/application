import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { AccountLayout, TOKEN_PROGRAM_ID, createMint } from '@solana/spl-token';
import { mintTo, getMint, getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import React, { useState,useEffect } from 'react';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Stats({wallet,isUpdated,setBalanceUpdated}) {
  const [balance,setBalance] =useState()
 
  useEffect(() => {
    const getBalance = async (wallet)  => { 
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(wallet.publicKey),{programId: TOKEN_PROGRAM_ID,});
      
     for (let tokenAccount in tokenAccounts.value) {
       //console.log(tokenAccount)
       const balance = AccountLayout.decode(tokenAccounts.value[tokenAccount].account.data);
       // console.log(`${new PublicKey(tokenAccounts.value[tokenAccount].pubkey)}   ${balance.amount}`);
        if (balance.mint=="4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU")
        setBalance(Number(balance.amount) / (10 ))
     }
  
    }

    getBalance(wallet)
    setBalanceUpdated(false)
  },[wallet,isUpdated])


 
  const stats = [
  { name: 'Balance', stat: 'balance', previousStat: "70000", change: '12%', changeType: 'increase' },
  { name: 'Avg. Streams per day', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: 'Other data', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.stat == "balance" ? (<span className="ml-2 text-sm font-medium text-gray-500"> {balance}</span>):(<span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>)} 
                
              
              </div>

              <div
                className={classNames(
                  item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )

}