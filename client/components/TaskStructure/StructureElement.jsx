import React from 'react';

const StructureElement = props => (
  <div className={`StructureElement ${props.label}`}>
    <p>{props.name}</p>
  </div>
);

export default StructureElement;
