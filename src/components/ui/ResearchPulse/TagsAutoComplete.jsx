"use client";
import db from "@/services/backend/appwrite/database.config";
import {Autocomplete, AutocompleteItem, Avatar, Button} from "@nextui-org/react";
import { Hash } from 'lucide-react';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TagsAutoComplete = ({tags, setTags, selectedTags, setSelectedTags}) => {

    const [drugboardTags, setDrugboardTags] = useState([]);
    const [addedTag, setAddedTag] = useState(null);

    //Fetching all drugboard tags...
    useEffect(() => {
        //TODO: In future change this to debouncing...
        const fetchPostTags = async () => {
            try {
                const allTags = await db.postTags.getAllDocs();
                // console.log(allTags);
                allTags && setDrugboardTags([...allTags]);
            } catch (error) {
                console.error("Error in fetching all drugboard tags: \n", error);
                toast.error("Failed to get the #tags");
            }
        }
        fetchPostTags();
    }, []);

    useEffect(()=>{
        if(addedTag){
            const [tagID, tagName] = addedTag?.split(" ")
            
            // console.log(tagID, tagName);
            // setTags((previousState)=>[...previousState, (!previousState?.includes(tagID) && tagID)]);
            
            if(tags?.length === 0){
                setTags([tagID])
            }else{
                if(!tags?.includes(tagID)){
                    const newTags = [...tags, tagID];
                    setTags(newTags);
                }
            }
    
            if(selectedTags?.length === 0){
                setSelectedTags([tagName])
            }else{
                if(!selectedTags?.includes(tagName)){
                    const newSelectedTags = [...selectedTags, tagName];
                    setSelectedTags(newSelectedTags);
                }
            }
        }

    },[addedTag]);
    
    return (
        <Autocomplete
        color="secondary"
        variant="flat"
        selectedKey={addedTag}
        onSelectionChange={setAddedTag}
        defaultItems={drugboardTags}
        aria-label="Select for related tags"
        label={<p className="flex items-center gap-2"><Hash className="text-purple-500" size={16}/> Select related tags...</p>}
        radius="full"
        >
        {(tag) => (
            <AutocompleteItem key={`${tag.$id} ${tag?.tagName}`} textValue={`# ${tag?.tagName}`}>
                <p className="line-clamp-1 flex items-center gap-1 font-semibold text-[16px] text-[#0F172A]"><Hash size={16} /><span className="text-[#0F172A]">{tag?.tagName}</span></p>
            </AutocompleteItem>
        )}
        </Autocomplete>
    );
}

export default TagsAutoComplete;