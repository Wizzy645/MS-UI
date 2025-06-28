'use client';
import React from 'react';

interface Props {
  icon: React.ReactNode; // changed from emoji: string
  title: string;
  description?: string;
}

const HowItWorksCard: React.FC<Props> = ({ icon, title, description }) => {
  return (
    <div className="container noselect">
      <div className="canvas">
        {/* All 25 hover tracker divs */}
        {[...Array(25)].map((_, i) => (
          <div key={i} className={`tracker tr-${i + 1}`} />
        ))}

        {/* #card must come AFTER trackers and be a sibling */}
        <div id="card">
          <div className="emoji text-green-400 w-8 h-8 mb-2">{icon}</div> {/* renders Lucide icon */}
          <div className="title">{title}</div>
          {description && <p className="subtitle">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksCard;
