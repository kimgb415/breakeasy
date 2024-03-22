'use client'
import React, { useState } from 'react';
import MatchUpContainerTab from '@/component/MatchUpContainerTab';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, title: "8-1", content : <MatchUpContainerTab matchName="8-1"/>},
    { id: 2, title: "8-2", content : <MatchUpContainerTab matchName="8-2"/>},
    { id: 3, title: "8-3", content : <MatchUpContainerTab matchName="8-3"/>},
    { id: 4, title: "8-4", content : <MatchUpContainerTab matchName="8-4"/>},
    { id: 5, title: "4-1", content : <MatchUpContainerTab matchName="4-1"/>},
    { id: 6, title: "4-2", content : <MatchUpContainerTab matchName="4-2"/>},
    { id: 7, title: "2-1", content : <MatchUpContainerTab matchName="2-1"/>},
  ]

  return (
     <div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tabs.map(tab => (
          <li key={tab.id} style={{ display: 'inline', marginRight: '20px', cursor: 'pointer', color: activeTab === tab.id ? 'red' : 'white' }}
              onClick={() => setActiveTab(tab.id)}>
            {tab.title}
          </li>
        ))}
      </ul>
      <div>
        {tabs.map(tab => (
          activeTab === tab.id ? tab.content : null
        ))}
      </div>
    </div>
  );
}

export default HomePage;