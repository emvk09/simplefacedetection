import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";

class App extends React.Component{
  render(){
    return(
      <div>
        <Navigation />
        <Logo/>
        {/*<ImageLinkForm/>
        <FaceRecognition/>*/}
      </div>
    )
  }
}

export default App;
