"use client";
import 'ketcher-react/dist/index.css';
import { StandaloneStructServiceProvider } from "ketcher-standalone";
import { Editor } from "ketcher-react";
import React, { useEffect, useState } from 'react';

const getHiddenButtonsConfig = () => {
  if (typeof window === "undefined") return {};  // Ensure the code runs only in the browser

  const searchParams = new URLSearchParams(window.location.search);
  const hiddenButtons = searchParams.get('hiddenControls');

  if (!hiddenButtons) return {};

  return hiddenButtons.split(',').reduce((acc, button) => {
    if (button) acc[button] = { hidden: true };

    return acc;
  }, {});
};

const KetcherEditor = () => {

  const structServiceProvider = new StandaloneStructServiceProvider();
  const [hiddenButtonsConfig, setHiddenButtonsConfig] = useState({});
  const [smiles, setSmiles] = useState("");
  const [ketcher, setKetcher] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [editor, setEditor] = useState(true);

  useEffect(() => {
    setHiddenButtonsConfig(getHiddenButtonsConfig());  // Set config after the component mounts
  }, []);

  useEffect(()=>{
    setEditor(true)
  }, [refreshing])

  useEffect(()=>{
    setRefreshing(false);
  },[editor])

  const initializeKetcherEditor = async (ketcher) => {
    await ketcher?.setMolecule("");
    window.ketcher = ketcher;
    console.log("New Editor rendered!");
    setKetcher(ketcher);
  };


  const getSmiles = async() => {
    console.log(ketcher);
    const smiles =  await ketcher?.getSmiles();
    if(smiles) console.log("Smiles: ",smiles);
  }

  const getSmarts = async() => {
    console.log(ketcher);
    const smarts = await ketcher?.getSmarts();
    if(smarts) console.log("Smarts: ",smarts);
  }


  const getMolFile = async() => {
    console.log(ketcher?.getMolFile());
  }

  const setMolecule = async() => {
    //Append the new smiles to the existing mols on the ketcher
    const existingDataOnKetcher = await getSmiles();
    console.log(existingDataOnKetcher);
    console.log(`${existingDataOnKetcher}.${smiles}`);
    // if(!existingDataOnKetcher){
    //     //If no existing data, set the smiles.
    //     await ketcher.setMolecule(smiles);
    //     return;
    // }
    // await ketcher.setMolecule(`${existingDataOnKetcher}.${smiles}`);
  }

  const handleSmilesField = (event) => {
    setSmiles(event.target.value);
  } 

  const clearEditor = () => {
    setEditor(false);
    setRefreshing(true);
  }
  

  return (
    <div className='flex flex-col gap-3 h-[100vh] w-full border-2 border-red-300'>
        <div className='flex items-center gap-3'>

            <button onClick={getSmiles}>Get Smiles</button>

            <input value={smiles} onChange={handleSmilesField} type="text" name="smiles" id="smiles" placeholder='Enter Smiles here...' className='outline-0 border-2 border-purple-600 bg-white p-3 w-[300px]'/>
            <button onClick={setMolecule}>Set Molecule</button>

            <button onClick={getSmarts}>Get Smarts</button>

            <button onClick={getMolFile}>Get Mol</button>

            <button onClick={clearEditor}>Clear Editor</button>

        </div>
        {
         editor && 
        <Editor
            className="!rounded-md"
            buttons={hiddenButtonsConfig}
            staticResourcesUrl={""}
            structServiceProvider={structServiceProvider}
            onInit={initializeKetcherEditor}
        />
        }
    </div>
  );
};

export default KetcherEditor;
