import React from 'react';
import ParticlesBg from 'particles-bg'
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Form from "./components/Form/Form";
import Rank from "./components/Rank/Rank.js";
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";

// import Clarifai from 'clarifai';

// const app = new Clarifai.App({
//  apiKey: ''
// });

class App extends React.Component{
  constructor(){
    super()
    this.state= {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  onRouteChange= (newroute) =>{
    this.setState({ route: newroute })
    if((newroute === 'signin'))
      this.setState({ isSignedIn: false })
    else if(newroute === 'home')
      this.setState({ isSignedIn: true })
  }

  onInputChange= (event) =>{
    this.setState({ input: event.target.value })
  }
  onSubmitChange= () =>{
    this.setState({ imageUrl: this.state.input });
    console.log(this.state.imageUrl);
    // app.models.predict({
    //   id: 'face-detection',
    //   name: 'face-detection',
    //   version: '6dc7e46bc9124c5c8824be4822abe105',
    //   type: 'visual-detector',
    // }, this.state.input)

    // .then((response) =>{
    //   this.displayFaceBox(this.calulateFaceLocation(response));
    // })
    // .catch((error) =>{
    //   console.log('Error');
    // })
  }

  calculateFaceLocation= (data) =>{
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('inputimage')
    const width= Number(image.width);
    const height= Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width- (clarifaiFace.right_col * width),
      bottomRow: height- (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox= (box) =>{
    console.log(box)
    this.setState({box: box})
  }

  render(){
    return(
      <div>
        <ParticlesBg className= "particles" type= "square" bg={true} />
        <Navigation routechange= {this.onRouteChange} isSignedIn= {this.state.isSignedIn}/>
        {
          this.state.route === 'home' 
          ?
          <div>
              <Logo/>
              <Rank/>
              <Form inputchange= {this.onInputChange} submitchange= {this.onSubmitChange}/>
              <FaceRecognition url= {this.state.imageUrl} box= {this.state.box}/>
          </div>
          :(
            this.state.route === 'signin'
            ?
            <Signin routechange= {this.onRouteChange}/>
            :
            <Register routechange= {this.onRouteChange}/>
          )
            
        }
      </div>
    )
  }
}

export default App;
