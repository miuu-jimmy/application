import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useState } from "react";

import bs58 from "bs58";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import FormData from 'form-data';
import { useSnackbar } from 'nextjs-toast'
import { useForm } from "react-hook-form";
import { getDialogActionsUtilityClass } from '@mui/material';
import { color } from '@mui/system';




export default function TrackInfo() {
  const router = useRouter()
  const [filename, setfilename] = useState("");
  const [imagename, setimagename] = useState("");
  const [data, setdata] = useState(new FormData());
  
  const snackbar = useSnackbar()
  const { register, trigger, formState:{errors},handleSubmit } = useForm();
  const [messages,setMessages] = useState({name: "We need a name to remember your album",
                                           about: "The description is missing",
                                           "file-upload": "Provide a cover picture for your album",
                                           "music-upload": "WAV or MP3 missing"})
 const [validationMsg, setValidationMsg] = useState([])
 const Validate = ()=> {
  let newArray = {name: "",
  about: "",
  "file-upload": "",
  "music-upload": ""}
  for(let id in newArray ) {
    
   console.log(id)
    if (document.getElementById(id))
    {
      if (errors[id]) 
      {if (errors[id].type == "required") {
        
        newArray[id] = messages[id]
        //document.getElementById(id).style.borderColor = "red"
      } }
      else {
        console.log("Unalert " + id)
        newArray[id] = ""
        //document.getElementById(id).style.borderColor = "black"
      }

      setValidationMsg(newArray)
   
     
    }
  }
}
  useEffect(()=> {
    Validate()
    }
  ,[errors])
  
  const handleFileChange = async () => {
    let inputFile = document.getElementById("file-upload");
    console.log(inputFile.files[0])
    const newdata = new FormData()
    newdata.append("file", inputFile.files[0])
    setdata(newdata) 
    console.log(newdata.get("file"))
    setimagename(newdata.get("file").name)
  }
  const handleMusicChange = async () => {
    let inputFile = document.getElementById("music-upload");

    const newdata = data
    console.log(data)
    //newdata.append("file", data.get("file"))
    newdata.append("file2", inputFile.files[0])
    newdata.append("username", wallet.publicKey)
    setdata(newdata) //<-- CHANGED .value to .files[0]
   
    setfilename(inputFile.files[0].name)
    
  }
  const onSubmit = 
    async (e) => {
     

      const validation = await trigger()
      if (!validation) {
        console.log(errors)
        Validate();
        //document.getElementById("music-form").reset();
        return
      }
      let inputName = document.getElementById("name");
      let inputAbout = document.getElementById("about");
      data.append("name",inputName.value)
      data.append("about",inputAbout.value)
      //data.username = wallet.publicKey
      console.log(data.get("name"))
      let res = await uploadCover(data)
      console.log(res)
      let coverPath = ""
      let musicPath = ""
      if (res.data.path != "") {
        snackbar.showMessage(res.data.msg,"success","filled" )
        coverPath = res.data.path
      } else {
        snackbar.showMessage("Cannot save cover picture.Try again later","error","filled" )
        return
      }
      res = await uploadTrack(data)
      console.log(res)
      if (res.data.path != "") {
        snackbar.showMessage(res.data.msg,"success","filled" )
        musicPath = res.data.path 
      } else {
        snackbar.showMessage("Cannot save music file.Try again later","error","filled" )
        return
      }
      data.append("musicPath", musicPath)
      data.append("coverPath", coverPath)
      data.delete("file")
      console.log(data)
      res = await saveTrackData(data)
      console.log(res)
      if (res.data.success) {
        snackbar.showMessage(res.data.msg + ". Redirecting...","success","filled" )
      }
        if (res.data.success)
         router.push('choose-contract')
      
     
    
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
    const form = document.getElementById("form");
    const formData = formdata
    let response 
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
    return { data }
    // upload the file 
  };
   // request a mint to user wallet
   const uploadCover = async function (formdata) {
    const form = document.getElementById("form");
    const formData = formdata
    console.log(formData)
    let response 
    try {
      snackbar.showMessage("We're uploading your cover","success","filled" )
      response = await fetch("/api/uploadCover", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json',

      }
    })
    } catch (e) {
      snackbar.showMessage("Cannot fetch API","error","filled")
    
    }
    console.log(response)
    let data = await response.json()
    
    // let res = await fetch('/api/requestNft?user='+Keys.publicKey.toString()+"&filename=" + amount.toString())   
    return { data }
    // upload the file 
  };
   // request a mint to user wallet
   const uploadTrack = async function (formdata) {
    const form = document.getElementById("form");
    const formData = formdata
    let response 
    try {
      snackbar.showMessage("We're uploading your music","success","filled" )
      response = await fetch("/api/uploadTrack", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json',

      }
    })
    } catch (e) {
      snackbar.showMessage("Cannot fetch API","error","filled")
    
    }
    console.log(response)
    let data = await response.json()
    // let res = await fetch('/api/requestNft?user='+Keys.publicKey.toString()+"&filename=" + amount.toString())   
    return { data }
    // upload the file 
  };
  const saveTrackData = async function (formdata) {
    const form = document.getElementById("form");
    const formData = formdata
    let response 
    try {
      snackbar.showMessage("We're saving your track metadata","success","filled" )
      response = await fetch("/api/saveTrackData", {
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
    // let res = await fetch('/api/requestNft?user='+Keys.publicKey.toString()+"&filename=" + amount.toString())   
    return { data }
    // upload the file 
  };
  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6 pt-16">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Track info</h3>
            <p className="mt-1 text-sm text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form id="music-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>


                    <input
                      {...register("name",{required: true, maxLength: 30 ,message:"Name is required and should be less than 30 char" })}
                      id="name"
                      errors={errors}
                      options={{
                        required: "Name is required"
                      }}
                      message= "Name is required"
                      type="text"
                      placeholder="Name here"
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300 p-2 border border-gray-300 rounded-md"
                    />
                    {(validationMsg)? <span className="text-xs text-red-500">{validationMsg["name"]}</span>:<span></span>}

                  </div>
                </div>

                <div>
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      {...register("about",{required: true, maxLength: 200 })}
                    
                      id="about"
                      name="about"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder="Information about the track"
                      defaultValue={''}
                    />
                    {(validationMsg)? <span className="text-xs text-red-500">{validationMsg["about"]}</span>:<span></span>}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your track.
                  </p>
                </div>

                <div>
                 
                  <span>Cover Photo</span>
                  <div className="mt-1 flex flex-col gap-y-2">
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    { //Check if message failed
                       (imagename != '')
                        ? <div>
                        <img className="h-32 w-full object-cover lg:h-48" src={imagename} alt="" />
                      </div>
                         : <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                       </svg>
                     }
                    
                    </span>
                    <div cssName="row upload-btn-box">
                    <label htmlFor="file-upload" className="bg-white py-2 px-3 w-16 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add</label>
                  <input     {...register("file-upload",{required: true })} id="file-upload" name="file-upload" type="file" className="sr-only"  onChange={handleFileChange} /> 
                    </div>
                    {(validationMsg)? <span className="text-xs text-red-500">{validationMsg["file-upload"]}</span>:<span></span>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload your track</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="music-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input   {...register("music-upload",{required: true })} id="music-upload" name="music-upload" type="file" className="sr-only" onChange={handleMusicChange} />

                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">MP3 up to 10MB</p>
                      <p className="text-xs text-gray-500">{filename ? filename : 'no file selected'}</p>
                    
                    </div> 
                   

                  </div>
                </div>
                {(validationMsg)? <span className="text-xs text-red-500">{validationMsg["music-upload"]}</span>:<span></span>}
              </div>
              
              <input type="hidden" id="referer" name="referer" value={wallet.publicKey}></input>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  
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
    </div>
  )
}
