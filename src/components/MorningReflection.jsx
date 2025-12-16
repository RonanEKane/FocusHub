import { useState } from 'react';
import './MorningReflection.css';

const MorningReflection = ({ onClose }) => {
  const [selectedReflection, setSelectedReflection] = useState(null);

  const reflections = [
    {
      id: 'trust',
      title: 'Trust in Divine Providence',
      text: 'God has a plan for today. Trust that your efforts, combined with His grace, will bring about what is needed.'
    },
    {
      id: 'offering',
      title: 'Offer Your Work',
      text: 'Offer your work today as a prayer. Each task completed is an act of service to God and others.'
    },
    {
      id: 'humility',
      title: 'Humility in Success',
      text: 'Remember that all talents and opportunities come from God. Stay humble in success and grateful in struggle.'
    }
  ];

  const handleSelect = (id) => {
    setSelectedReflection(id);
  };

  const handleContinue = () => {
    if (selectedReflection) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal morning-reflection">
        <div className="modal-header">
          <h2 className="modal-title">🙏 Morning Reflection</h2>
        </div>
        
        <div className="modal-body">
          <p className="reflection-intro">
            Start your day with a moment of reflection. Choose one to carry with you today:
          </p>

          <div className="reflection-options">
            {reflections.map(r => (
              <div
                key={r.id}
                onClick={() => handleSelect(r.id)}
                className={`reflection-card ${selectedReflection === r.id ? 'selected' : ''}`}
              >
                <h3 className="reflection-title">{r.title}</h3>
                <p className="reflection-text">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            onClick={handleContinue} 
            className="btn btn-primary"
            disabled={!selectedReflection}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default MorningReflection;
