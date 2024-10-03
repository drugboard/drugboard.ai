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

const KetcherEditor = ({id}) => {

  console.log("id: ", id)

  let ketcherState = `ketcher-${id}`;
  console.log("ketcherState: ",ketcherState);

  const structServiceProvider = new StandaloneStructServiceProvider();
  const [hiddenButtonsConfig, setHiddenButtonsConfig] = useState({});

  useEffect(() => {
    setHiddenButtonsConfig(getHiddenButtonsConfig());  // Set config after the component mounts
  }, []);


  const getSmiles = async() => {
    console.log(window[ketcherState]);
    const smiles =  await window[ketcherState]?.getSmiles();
    if(smiles) console.log("Smiles: ",smiles);
  }

  const getSmarts = async() => {
    console.log(window[ketcherState]);
    const smarts = await window[ketcherState]?.getSmarts();
    if(smarts) console.log("Smarts: ",smarts);
  }


  const getMolFile = async() => {
    const molecule = await window[ketcherState]?.getMolfile();
    console.log(molecule);
  }


  return (
    <div className='flex flex-col gap-3 h-[90vh] w-full'>
        <div className='flex items-center gap-3'>

            <button onClick={getSmiles}>Get Smiles</button>

            <button onClick={getSmarts}>Get Smarts</button>

            <button onClick={getMolFile}>Get Mol</button>


        </div>
        <Editor
            id={id}
            buttons={hiddenButtonsConfig}
            staticResourcesUrl={""}
            structServiceProvider={structServiceProvider}
            errorHandler={(message) => {
              console.error(message);
            }}
            onInit={async(ketcher) => {
              console.log(ketcher)
              window[ketcherState] = ketcher;
              console.log(await window.ketcherState)
      
              window.parent.postMessage(
                {
                  eventType: 'init',
                },
                '*',
              );
            }}
        />
    </div>
  );
};

export default KetcherEditor;
