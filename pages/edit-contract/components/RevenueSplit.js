import { useRouter } from 'next/router'
import React,{useState,useEffect} from 'react'
import Select from './Select'
import { useForm } from "react-hook-form";
import FormData from 'form-data';
import bs58 from "bs58";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useSnackbar } from 'nextjs-toast'

export default function RevenueSplit() {
  const router = useRouter()
  const { register, trigger, formState:{errors},handleSubmit } = useForm();
  const [validationMsg, setValidationMsg] = useState([])
  const [data, setdata] = useState(new FormData());
  const snackbar = useSnackbar()

  const [messages,setMessages] = useState({"account-number1": "Below or over 100",
  "account-number2": "Below 0 or over 100",
  "account-number3": "Below 0 or over 100",
  "global": "Total Revenue share should be between 0% and 100%"})
  useEffect(()=> {
    Validate()
    }
  ,[errors])
  const Validate = ()=> {
    let newArray = {"account-number1": "",
    "account-number2": "",
    "account-number3": "",
    }
    var count = 0 
    
    let res =true
    for(let id in newArray ) {
     
     console.log(id)
     let e = document.getElementById(id)
     
      if (e)
      {
        count = count+parseInt(e.value)
        console.log(count)
        if (errors[id]) 
        {
          if (errors[id].type == "positive" || errors[id].type == "lessThan"  ) {
          
          newArray[id] = messages[id]
          res=false
          //document.getElementById(id).style.borderColor = "red"
        } 
       } else if (count >100) {
         newArray["global"] = messages["global"]
         res=false
       }
        else {
          console.log("Unalert " + id)
          newArray[id] = ""
          newArray["global"] = ""
          //document.getElementById(id).style.borderColor = "black"
        }
  
        setValidationMsg(newArray)
      }
    }
    return res
  }
  const onSubmit = 
  async () => {
   

    const validation = await trigger()
    const res = Validate();
    console.log(res)
    console.log(validation)
    if (!validation  || !res) {
      //document.getElementById("music-form").reset();
      return
    }
    console.log("Validation Success Uploading NFT and redirecting.... ")
    data.append("username", wallet.publicKey)
    
    const result = await requestnft(data)
    console.log(result)
    if (result.success){
      router.push('payments')
    }
    }
    // dev only 
    const [network, setNetwork] = useState("https://api.testnet.solana.com");

    const b = bs58.decode("36oKvzRUS86mHzj5SiQzVwe9YSfZUyy26zMkZ8r2ZUAqw89ehxsWSUXNPURusoGLzXGJsbcsgTCfbfGufDu8vFC6")
    const j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    //return new Wallet(Keypair.fromSecretKey(j))
    const [wallet, setWallet] = useState(Keypair.fromSecretKey(j));
    
    const Keys = wallet;
    // request a mint to user wallet
    const requestnft = async function (formdata) {
      
      const formData = formdata
      let response
      console.log("requesting")
      try {
        snackbar.showMessage("We're creating your cover as nft","success","filled" )
        response = await fetch("/api/requestNFT", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json',
  
        }
      })
      } catch (e) {
        snackbar.showMessage("Cannot fetch API","error","filled")
      
      }
      let data = await response.json()
      console.log(data)
      if (!data.success) {
        snackbar.showMessage("NFT upload error" + data.msg,"error","filled")
      } else {
        snackbar.showMessage(data.msg,"success","filled")
      }
      // let res = await fetch('/api/requestNft?user='+Keys.publicKey.toString()+"&filename=" + amount.toString())   
      return data 
      // upload the file 
    };


  return (
    <div className="md:grid md:grid-cols-3 md:gap-6 pt-16">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Choose a revenue split</h3>
          <p className="mt-1 text-sm text-gray-600">
            Choose right owners among your contacts and assign a share to everyone. This information will be used to automatically send payments based on streaming data.
          </p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:rounded-md">
            
            <div className='flex flex-col p-8 gap-y-8'>
              <div className='flex gap-8'>
              <Select />
              <div>
                <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">
                  Revenue share
                </label>
                <div className="mt-1 h-10 relative flex border border-gray-300 rounded-md shadow-sm">
                  <input
                    {...register("account-number1",{ validate:  {
                      positive: v => parseInt(v) > 0,
                      lessThan: v => parseInt(v) <= 100, }})}
                    type="text"
                    name="account-number1"
                    id="account-number1"
                    
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-28 pl-2 pr-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-300">
                    %
                  </div>
                 
                </div>
                {(validationMsg)? <span className="text-xs text-red-500">{validationMsg["account-number1"]}</span>:<span></span>}
              </div>
            </div>

            <div className='flex gap-8'>
              <Select />
              <div>
                <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">
                  Revenue share
                </label>
                <div className="mt-1 h-10 relative flex border border-gray-300 rounded-md shadow-sm">
                  <input
                   {...register("account-number2",{validate:  {
                    positive: v => parseInt(v) >= 0,
                    lessThan: v => parseInt(v) <= 100, }})}
                    type="text"
                    name="account-number2"
                    id="account-number2"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-28 pl-2 pr-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-300">
                    %
                  </div>
                  
                </div>
                {(validationMsg)? <span className="text-xs text-red-500">{validationMsg["account-number2"]}</span>:<span></span>}
              </div>
            </div>

            <div className='flex gap-8'>
              <Select />
              <div>
                <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">
                  Revenue share
                </label>
                <div className="mt-1 h-10 relative flex border border-gray-300 rounded-md shadow-sm">
                  <input
                    {...register("account-number3",{validate:  {
                      positive: v => parseInt(v) >= 0,
                      lessThan: v => parseInt(v) <= 100, }})}
                    type="text"
                    name="account-number3"
                    id="account-number3"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-28 pl-2 pr-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-300">
                    %
                  </div>

                 
                </div>
                {(validationMsg)? <span className="text-xs text-red-500">{validationMsg["account-number3"]}</span>:<span></span>}
              </div>
            </div>
            </div>
            
            <button
              type="button"
              className="bg-white py-2 px-3 w-16 ml-8 mb-8 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
            {(validationMsg)? <span className="text-xs text-red-500">{validationMsg["global"]}</span>:<span></span>}
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                onClick={handleSubmit}
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
