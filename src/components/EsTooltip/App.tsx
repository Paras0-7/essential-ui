// App.js
import EsTooltip from './EsTooltip';

const App = () => {
  return (
    <div className="navigation">
      <EsTooltip transitionStyle="fade" position="top" selector=".navigation label">
        <label data-tooltip="Fade">Fade</label>
      </EsTooltip>
    </div>
  );
};

export default App;
