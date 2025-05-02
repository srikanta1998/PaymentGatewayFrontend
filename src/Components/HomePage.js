import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const gateways = ['CybS', 'MPGS', 'WIBMO'];
const modes = ['LIVE', 'TEST'];
const integrations = ['Direct', 'Aggregator'];
const apiTypes = ['REST API', 'SOAP API'];

export const HomePage = () => {

    const navigate = useNavigate();
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [modeIndex, setModeIndex] = useState(0);
  const [integrationIndex, setIntegrationIndex] = useState(0);
  const [apiTypeIndex, setApiTypeIndex] = useState(0);

  const handleProceed = () => {
    if (!selectedGateway) return;
    navigate('/next', {
      state: {
        gateway: selectedGateway,
        mode: modes[modeIndex],
        integration: integrations[integrationIndex],
        apiType: apiTypes[apiTypeIndex],
      },
    });
  };

  const changeOption = (setter, currentIndex, list, direction) => {
    const nextIndex = (currentIndex + direction + list.length) % list.length;
    setter(nextIndex);
  };

  return (
    <div style={{ padding: '2rem',backgroundColor: '#F0F8FF', fontFamily: 'sans-serif' }}>
      <div style={{ borderBottom: '5px solid #ccc', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <div><strong>Logo</strong></div>
        <div style={{ fontSize: '1.5rem' }}>≡</div>
      </div>

      <h1 style={{ textAlign: 'center', fontSize: '2rem', margin: '2rem 0', color: 'purple' }}>Payment Gateway Services</h1>

      <div style={{ border: '3px',backgroundColor: '#e5ccff', borderRadius: '45px', padding: '3rem', display: 'flex',color:'white', justifyContent: 'space-around', margin: '2rem 0', marginRight: '6rem', marginLeft: '7rem' }}>
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

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1.5rem', marginRight: '9rem', marginLeft: '10rem' }}>
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
            <span style={arrowStyle} onClick={() => changeOption(setIntegrationIndex, integrationIndex, integrations, -1)}>&lt;</span>
            {integrations[integrationIndex]}
            <span style={arrowStyle} onClick={() => changeOption(setIntegrationIndex, integrationIndex, integrations, 1)}>&gt;</span>
          </div>
          <div style={descriptionStyle}>Relation</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={buttonStyle}>
            <span style={arrowStyle} onClick={() => changeOption(setApiTypeIndex, apiTypeIndex, apiTypes, -1)}>&lt;</span>
            {apiTypes[apiTypeIndex]}
            <span style={arrowStyle} onClick={() => changeOption(setApiTypeIndex, apiTypeIndex, apiTypes, 1)}>&gt;</span>
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
      <div style={{ borderBottom: '5px solid #ccc', paddingBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}></div>
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
  color: 'gray',
  fontSize: '0.8rem',
  marginTop: '0.25rem'
};
