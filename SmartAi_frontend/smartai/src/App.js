import './App.css';
import React,{useState} from 'react';
import ImageGenerator from './components/ImageGenerator';
import ChatComponent from './components/ChatComponent';
import RecipeGenerator from './components/RecipeGenerator';


function App() {

  const [activeTab, setActiveTab] =   useState('image-Generator');

  const handleTabChange =(tab)=>
  {
    //alert(tab);
    setActiveTab(tab);
    console.log()
  }
  return (
    <div className="App">
      <button className={activeTab === 'image-Generator' ? 'active' : ''}
      onClick={() => handleTabChange('image-Generator')}>Image Generator</button>

      <button className={activeTab === 'Chat' ? 'active' : ''}
      onClick={() => handleTabChange('Chat')}>Text Generator</button>

      <button className={activeTab === 'Recipe-Generator' ? 'active' : ''}
      onClick={() => handleTabChange('Recipe-Generator')}>Recipe Generator</button>

      <div>
        {activeTab === 'image-Generator' && <ImageGenerator/>}
        {activeTab === 'Chat' && <ChatComponent/>}
        {activeTab === 'Recipe-Generator' && <RecipeGenerator/>}
      </div>
    </div>
  );
}

export default App;
