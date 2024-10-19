"use client";
import TagsAutoComplete from './TagsAutoComplete';
import { Hash } from 'lucide-react';

/**
 * Use Debouncing technique to call the tags tables from the db.
 */

const Tagger = ({tags, setTags, selectedTags, setSelectedTags}) => {

  return (
    <div className='flex flex-col gap-3'>
      
      <TagsAutoComplete 
        tags={tags} 
        setTags={setTags} 
        selectedTags={selectedTags} 
        setSelectedTags={setSelectedTags}
      />
      
      {/* Listing of the selected Tags for Acknowledgment... */}
      <div className='flex flex-col gap-3'>
        {
          selectedTags?.map((tag, index) => (
            <p className='flex items-center gap-1 px-3 font-semibold text-purple-500' key={index}>
              <Hash size={16}/>
              <span>{tag}</span>
            </p>
          ))
        }
      </div>
    </div>
  )
}

export default Tagger