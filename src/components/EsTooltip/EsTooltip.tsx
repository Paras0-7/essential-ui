// Tooltip.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
const EsTooltip = ({bgColor,color,delayIn,delayOut,position,children}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setTimeout(() => {
      setIsVisible(true);
    }, delayIn || 0)
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, delayOut || 0)
  };
  const styles = {
    backgroundColor: bgColor,
    color:color,
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      {children}
      {isVisible && (
       <div className={`tooltip ${position}`} style={styles}>
          {children.props['data-tooltip']}
        </div>
      )}
    </div>
  );
};

EsTooltip.propTypes = {
  transitionStyle: PropTypes.string,  //will add
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  children: PropTypes.element.isRequired,
  delayIn: PropTypes.string,
  delauOut:PropTypes.string,
};

export default EsTooltip;
