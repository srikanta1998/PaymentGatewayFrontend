import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const WIBMO_REST = () => {
  const location = useLocation();
  const { gateway, mode, relation } = location.state || {};

  useEffect(() => {
    if (gateway) {
      alert(`Gateway: ${gateway}\nMode: ${mode}\nRelation: ${relation}`);
    }
  }, [gateway, mode, relation]);

  return (
    <div>
      <h2>WIBMO INTEGRATION</h2>
    </div>
  );
};
