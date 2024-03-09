
import './App.css'
import EsTooltip from './components/EsTooltip/EsTooltip'

function App() {
 
  return (
     <div className="navigation">
      <EsTooltip  delayIn="3000" delayOut="2000" position="right" arrow={false}>
        <button data-tooltip="Some Info" id="fade-bt">I am info</button>
      </EsTooltip>
    </div>
  )
}

export default App
