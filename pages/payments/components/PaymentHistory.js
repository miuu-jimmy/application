import React, { useState, useEffect } from 'react'
import { useConnection,useWallet } from '@solana/wallet-adapter-react';
import { Connection,clusterApiUrl, PublicKey } from '@solana/web3.js';
import { useSnackbar } from 'nextjs-toast'

let tracks = [
  
]
const getTransactionHistory = async (wallet)  => { 
  //const connection = useConnection() 
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const txs = await connection.getConfirmedSignaturesForAddress2(new PublicKey(wallet.publicKey.toString()),{programId: TOKEN_PROGRAM_ID,});
  console.log(txs)
 
    //const balance = AccountLayout.decode( tokenAccounts.value[0].account.data);
    ///console.log(`${new PublicKey(balance.mint)}   ${balance.amount}`);
  
  return [txs]
}
export default function PaymentHistory({wallet}) {
  const [tracks,setTracks] =useState([])
  const snackbar = useSnackbar()
  console.log(wallet)
  useEffect(() => {
    // Get detailed transaction history from Frontend
    const getTransactionHistory = async () => {
      //console.log(wallet)
      if (wallet) {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const txs = await connection.getConfirmedSignaturesForAddress2(new PublicKey(wallet.publicKey.toString(),{before:"2CqvHrpA4umnfX62f4tBeoP36zs19ZVqUjKpezYBspU1NE82kxYmL8KQhMFANDMBwHxWTgp7bqbo6tV6jZt1XG2e",limit: 5}));
      let signature = txs.map(tx=>tx.signature);
      console.log(signature.slice(0,3))
      let transactionDetails = await connection.getParsedTransactions(signature.slice(0,3))
      if (transactionDetails) {
        const instruction = transactionDetails[0].meta.innerInstructions[0].instructions[3]
        if (instruction.parsed.info.mint == "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU") {
          console.log(transactionDetails)
          setTracks([{}])
        }

      //console.log(transactionDetails[0].meta.innerInstructions[0].instructions[3].parsed.info.mint)
      //console.log(transactionDetails[0].meta.innerInstructions.instructions)
      setTracks(transactionDetails)
      }
      } else {
        console.log(wallet)
      }
    };
    // Get Track transaction history from DB
    const getTransactionHistoryfromDb = async () => {
      if (wallet) {
        let res
        let data
        try {
         res = await fetch('/api/getHistory?user='+wallet.publicKey.toString())
         data = await res.json()
         if (!data.success) {
          snackbar.showMessage(data.msg, "error", "filled")
          return
         }
        } catch (err) {
          snackbar.showMessage("Error Fetching api. error: " + err, "error", "filled")
          return
        }
        setTracks(data.tracks)
      } else {
        snackbar.showMessage("No wallet connected, Retry your wallet conneciton", "error", "filled")
      }

    };

  getTransactionHistoryfromDb()
},[wallet])
  
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6 pt-16">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">PAYMENT HISTORY</h3>
          <p className="mt-1 text-sm text-gray-600">
            The streaming data for your tracks is tracked and payment made automatically to your account.
          </p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md">
            
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-6">
                            Track Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500">
                            Streams
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500">
                            Payment
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Contract</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {tracks.map((track, i) => (
                            
                          <tr key={track.name} className={i % 2 === 0 ? undefined : 'bg-gray-50'}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {track.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{track.streams}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{track.TotalPayments / (10 )}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                Contract<span className="sr-only">, {track.name}</span>
                              </a>
                            </td>
                          </tr>
                             
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
