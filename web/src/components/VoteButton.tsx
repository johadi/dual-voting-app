import React from 'react';

const VoteButton: React.FC<{ choice: 'A' | 'B'; count: number; onClick: () => void }> = ({ choice, count, onClick }) => (
  <button className="btn btn-outline-primary flex-fill me-2" onClick={onClick}>
    {choice} <span className="badge bg-secondary ms-2">{count}</span>
  </button>
);

export default VoteButton;