// src/components/Chatbot.js
import React, { useState } from 'react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const commands = {
    Cleaning: [
      { name: 'John Doe', experience: '5 years', contact: 'johndoe@example.com' },
      { name: 'Alice Smith', experience: '3 years', contact: 'alicesmith@example.com' }
    ],
    Plumbing: [
      { name: 'Mike Ross', experience: '4 years', contact: 'mikeross@example.com' },
      { name: 'Rachel Green', experience: '2 years', contact: 'rachelgreen@example.com' }
    ],
    Electrical: [
      { name: 'Ethan Hunt', experience: '7 years', contact: 'ethanhunt@example.com' },
      { name: 'Jane Doe', experience: '4 years', contact: 'janedoe@example.com' }
    ]
  };

  const handleCommandClick = (service) => {
    const providerInfo = commands[service].map(
      (provider) => `${provider.name} - Experience: ${provider.experience}, Contact: ${provider.contact}`
    ).join('\n');
    setMessages([...messages, { type: 'user', text: service }, { type: 'bot', text: providerInfo }]);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div className={`p-4 bg-gray-800 text-white rounded-lg shadow-lg w-64 ${isOpen ? 'block' : 'hidden'}`}>
        <h3 className="text-lg font-bold">Service Chatbot</h3>
        <div className="mt-2 max-h-48 overflow-y-auto">
          {messages.map((msg, index) => (
            <p key={index} className={msg.type === 'user' ? 'text-right text-blue-400' : 'text-left text-gray-300'}>
              {msg.text}
            </p>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-gray-300">Choose a service:</p>
          {Object.keys(commands).map((command) => (
            <button
              key={command}
              onClick={() => handleCommandClick(command)}
              className="text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-full px-3 py-1 mt-2 mr-2"
            >
              {command}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-blue-600 text-white rounded-full shadow-lg focus:outline-none hover:bg-blue-500"
      >
        {isOpen ? 'Close' : 'Chat'}
      </button>
    </div>
  );
}

export default Chatbot;
