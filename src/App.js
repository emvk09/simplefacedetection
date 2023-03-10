import React from 'react';
import ParticlesBg from 'particles-bg'
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Form from "./components/Form/Form";
import EntryCount from "./components/EntryCount/EntryCount.js";
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";
// import Clarifai from "clarifai";

// const app = new Clarifai.App({
//  apiKey: "",
// });

class App extends React.Component{
  constructor(){
    super()
    this.state= {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {  
        // this temporarily stores the data of the current userprofile in the frontend, when user does signin or register
        // Don't store the password in frontend
        id: '',
        name: '',
        email: '' ,
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser= (userdata) => {
    this.setState({ user: {
      id: userdata.id,
      name: userdata.name,
      email: userdata.email ,
      entries: userdata.entries,
      joined: userdata.joined
    }})
  }

  onRouteChange= (newroute) => {
    this.setState({ route: newroute })
    if((newroute === 'signin'))
      this.setState({ isSignedIn: false })
    else if(newroute === 'home')
      this.setState({ isSignedIn: true })
  }

  onInputChange= (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmitChange= () => { 
    this.setState({ imageUrl: this.state.input });
    // app.models.predict({
    //   id: 'face-detection',
    //   name: 'face-detection',
    //   version: '6dc7e46bc9124c5c8824be4822abe105',
    //   type: 'visual-detector',
    // }, this.state.input)
    // .then((response) => { // each time a correct response is obtained from an api client, this PUT request for updating the no. of entries will be executed
      fetch("http://localhost:3000/imageentries", {
          method: "put",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
      })
      .then(response => response.json()) // this response is the number of image entries count which was sent from backend after doing the calculations
      .then((count) => {
        // // if we change the user object of the state object, then the whole data inside the user object will be lost 
        // this.setState({user: { 
        //   entries: count
        // }})
        this.setState(Object.assign(this.state.user, {entries: count}))
      }) 

    //   this.displayFaceBox(this.calculateFaceLocation(response))
    // })
    // .catch(err => {
    //   console.log(err);
    // })
  }

  calculateFaceLocation= (data) => {
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

  displayFaceBox= (box) => {
    this.setState({box: box});
  }

  render(){
    return(
      <div className='App'>
        <ParticlesBg className= "particles" type= "square" bg={true} />
        <Navigation routechange= {this.onRouteChange} isSignedIn= {this.state.isSignedIn}/>
        {
          this.state.route === 'home' 
          ?
          <div>
              <Logo/>
              <EntryCount name= {this.state.user.name} entries= {this.state.user.entries}/>
              <Form inputchange= {this.onInputChange} submitchange= {this.onSubmitChange}/>
              <FaceRecognition url= {this.state.imageUrl} box= {this.state.box}/>
          </div>
          :(
            this.state.route === 'signin'
            ?
            <Signin routechange= {this.onRouteChange} loadUser= {this.loadUser}/>
            :
            <Register routechange= {this.onRouteChange} loadUser= {this.loadUser}/>
          )
            
        }
      </div>
    )
  }
}

export default App;
