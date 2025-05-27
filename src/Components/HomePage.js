import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate  } from 'react-router-dom';
import '../NavbarWithSlideMenu.css';
import logo from '../Assets/AXIS_LOGO.png';
import axios from 'axios';

const gateways = ['CYBS', 'MPGS', 'WIBMO'];
const modes = ['LIVE', 'TEST'];
const relation = ['MERCHANT', 'AGGREGATOR'];
const integration = ['REST API', 'SOAP API'];

export const HomePage = () => {

  const navigate = useNavigate();
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [modeIndex, setModeIndex] = useState(0);
  const [relationIndex, setRelationIndex] = useState(0);
  const [integrationIndex, setIntegrationIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const handleProceed = () => {
    if (!selectedGateway) return;
    
    if(selectedGateway === "CYBS" && integration[integrationIndex] ==="SOAP API"){
        navigate('/cybs_soap', {
            state: {
              gateway: selectedGateway,
              mode: modes[modeIndex],
              relation: relation[relationIndex],
              integration: integration[integrationIndex],
            },
          });
    }

    else if(selectedGateway === "CYBS" && integration[integrationIndex] ==="REST API"){
        navigate('/cybs_rest', {
            state: {
              gateway: selectedGateway,
              mode: modes[modeIndex],
              relation: relation[relationIndex],
              integration: integration[integrationIndex]
            },
          });
    }

    else if(selectedGateway === "MPGS"){
      navigate('/mpgs', {
          state: {
            gateway: selectedGateway,
            mode: modes[modeIndex],
            relation: relation[relationIndex]            
          },
        });
  }

  else if(selectedGateway === "WIBMO"){
    
    navigate('/wibmo', {
        state: {
          gateway: selectedGateway,
          mode: modes[modeIndex],
          relation: relation[relationIndex]
        },
      });
}
    
  };

  const changeOption = (setter, currentIndex, list, direction) => {
    const nextIndex = (currentIndex + direction + list.length) % list.length;
    setter(nextIndex);
  };

  return (
    <div style={{ padding: '2rem',backgroundColor: '#8ba0a4', fontFamily: 'sans-serif' }}>
      <div style={{ borderBottom: '5px solid #ccc', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        <div>
        <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </div>

        
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>☰</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="side-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ul>
              <li onClick={() => setIsOpen(false)}>Home</li>
              <li onClick={() => setIsOpen(false)}>About</li>
              <li onClick={() => setIsOpen(false)}>Settings</li>
              <li onClick={() => setIsOpen(false)}>Logout</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      <h1 style={{ textAlign: 'center', fontSize: '2rem', margin: '2rem 0', color: 'purple' }}>Payment Gateway Services</h1>

      <div style={{ border: '3px', backgroundColor: '#c0c0c0', borderRadius: '45px', padding: '3rem', display: 'flex',color:'white', justifyContent: 'space-around', margin: '2rem 0', marginRight: '6rem', marginLeft: '7rem' }}>
        {gateways.map(gw => (
          <div key={gw} onClick={() => setSelectedGateway(gw)} style={{
            border: '2px',
            borderRadius: '30px',
            padding: '4rem',
            width: '100px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: selectedGateway === gw ? '#99004c' : '#cc0066',
            
          }}>
            <div style={{ fontWeight: 'bold' }}>{gw}</div>
            <div style={{ marginTop: '3rem' }}>
              <span style={{
                display: 'inline-block',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: selectedGateway === gw ? '#ffff99' : '#c0c0c0'
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '0.8rem', marginRight: '9rem', marginLeft: '10rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={buttonStyle}>
            <span style={arrowStyle} onClick={() => changeOption(setModeIndex, modeIndex, modes, -1)}>&lt;</span>
            {modes[modeIndex]}
            <span style={arrowStyle} onClick={() => changeOption(setModeIndex, modeIndex, modes, 1)}>&gt;</span>
          </div>
          <div style={descriptionStyle}>Platform</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={buttonStyle}>
            <span style={arrowStyle} onClick={() => changeOption(setRelationIndex, relationIndex, relation, -1)}>&lt;</span>
            {relation[relationIndex]}
            <span style={arrowStyle} onClick={() => changeOption(setRelationIndex, relationIndex, relation, 1)}>&gt;</span>
          </div>
          <div style={descriptionStyle}>Relation</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={buttonStyle}>
            <span style={arrowStyle} onClick={() => changeOption(setIntegrationIndex, integrationIndex, integration, -1)}>&lt;</span>
            {integration[integrationIndex]}
            <span style={arrowStyle} onClick={() => changeOption(setIntegrationIndex, integrationIndex, integration, 1)}>&gt;</span>
          </div>
          <div style={descriptionStyle}>Integration</div>
        </div>
      </div>

      <div style={{ textAlign: 'right', marginRight: '3rem' }}>
        <button
          onClick={handleProceed}
          disabled={!selectedGateway}
          style={{
            padding: '0.7rem',
            backgroundColor: selectedGateway ? '#1e60f5' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: selectedGateway ? 'pointer' : 'not-allowed'
          }}>
          Proceed
        </button>
      </div>
      <div style={{ borderBottom: '5px solid #ccc',marginTop: '0.8rem', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}></div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#e2d9f3',
  color: 'purple',
  fontWeight: 'bold',
  padding: '0.5rem 1.5rem',
  borderRadius: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: '120px'
};

const arrowStyle = {
  cursor: 'pointer',
  padding: '0 0.5rem'
};

const descriptionStyle = {
  color: '#004343',
  fontSize: '0.9rem',
  marginTop: '0.25rem'
};
