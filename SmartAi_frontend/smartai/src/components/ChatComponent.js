import React, { useState } from "react";

const ChatComponent = () => {

  const [prompt, setPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [copySuccess, setCopySuccess] = useState('');
  const [loading, setLoading] = useState(false);


  const askAi = async () => {
    try {

      setLoading(true); 
      setChatResponse('');
      const response = await fetch(
        `http://localhost:8080/api/ask-ai-options?prompt=${prompt}`
      );

      const data = await response.text();
      console.log(data);
      setChatResponse(data);
      setCopySuccess('');
    } 
    catch (error) {
      console.error("Error in Generating Chat : ", error);
      setChatResponse('Error in fetching response');
    }
    finally {
      setLoading(false);
    }
  };


  const copyToClipboard = () => {
    if (chatResponse) {
      navigator.clipboard.writeText(chatResponse);
      setCopySuccess('Response copied!');
    }
  };



  return (
    <div className="tab-content">
      <h2>Chat With AI</h2>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a Prompt for AI..."
      />

      <button onClick={askAi}>Ask AI</button>

      <div className='output'>
        {loading ? (
          <div className='loading-message'>Loading response, please wait...</div>
        ) : (
          <>
            {chatResponse}
            {chatResponse && (
              <div className='copy-section'>
                <button onClick={copyToClipboard} className="copy-button">
                  Copy to Clipboard
                </button>
                {copySuccess && <span className="copy-success">{copySuccess}</span>}
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default ChatComponent;
