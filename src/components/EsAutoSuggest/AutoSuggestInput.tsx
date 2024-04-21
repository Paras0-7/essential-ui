import React, { useState, useEffect, useRef } from 'react';

function AutoSuggestInput({ attach, items }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputElement = document.querySelector(attach);
    if (inputElement) {
      inputElement.addEventListener('input', handleInputChange);
    }
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('input', handleInputChange);
      }
    };
  }, [attach]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filteredItems = items.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredItems);
    setHighlightedIndex(-1);
  };

  const handleItemClick = (item) => {
    setInputValue(item);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prevIndex => Math.min(prevIndex + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prevIndex => Math.max(prevIndex - 1, -1));
    } else if (e.key === 'Enter' && highlightedIndex !== -1) {
      e.preventDefault();
      setInputValue(suggestions[highlightedIndex]);
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const highlightMatch = (text) => {
    const regex = new RegExp(inputValue, 'gi');
    return text.replace(regex, match => `<span class="highlighted-char">${match}</span>`);
  };

  return (
    <div className="autosuggest-container">
      <input
        type="text"
        ref={inputRef}
        placeholder="Type to search..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={highlightedIndex === index ? 'highlighted' : ''}
              dangerouslySetInnerHTML={{ __html: highlightMatch(item) }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoSuggestInput;
