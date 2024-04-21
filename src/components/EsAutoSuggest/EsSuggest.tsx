import AutoSuggestInput from './AutoSuggestInput';
import './style.scss'
function EsSuggest() {
  const items = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'kiwi', 'lemon', 'mango'];

  return (
    <div>
      <h1>Auto Suggest Example</h1>
      <input id="input" type="text" placeholder="Type to search..." />
      <AutoSuggestInput attach="#input" items={items} />
    </div>
  );
}

export default EsSuggest;
