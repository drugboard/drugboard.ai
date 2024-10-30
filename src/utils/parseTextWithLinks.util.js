export const parseTextWithLinks = (text) => {
    const words = text.split(' ');
    
    return words.map((word, index) => {

      if ((word.startsWith('http://') || word.startsWith('https://')) && 
        word.includes('.') && // Must have a dot for domain
        word.split('/')[2]?.includes('.')) {
        return (
          <>
            {index > 0 ? ' ' : ''}
            <a
              key={index}
              href={word}
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {word}
            </a>
          </>
        );
      }else{
          return index > 0 ? ` ${word}` : word;
      }

    });
  };