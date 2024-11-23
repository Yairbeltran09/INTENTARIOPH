import React from 'react';
import { Button } from 'react-bootstrap';
import iconoPeligro from '/src/assets/icons8-peligro-100.png'; 

const IncidentButton: React.FC = () => {
  return (
    <Button className='p-3 text-Secondary-emphasis bg-Secondary-subtle border border-Secondary-subtle rounded-3' style={{ backgroundColor: '#6c757d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ marginRight: '10px' }}>GENERAR INCIDENCIA</h2>
      <img src={iconoPeligro} alt="Peligro" style={{ width: '30px', height: '30px' }} />
    </Button>
  );
};

export default IncidentButton;
