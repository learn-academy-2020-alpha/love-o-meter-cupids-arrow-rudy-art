import React, { Component } from 'react';
import './App.css';
import GoodMatch from './components/GoodMatch'
import BadMatch from './components/BadMatch'

export default class App extends Component{
  constructor(props){
    super(props)
    // The state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // The handleChange methods update userName and loveName as the user types
      tempKey: "",
      userName: "",
      loveName: ""
    }
  }

  handleChangeUser = (e) => {
    // This method takes the input and saves the value in this.state.userName so we can use the input in our program
    // no need to modify this method
    this.setState({ userName: e.target.value })
  }

  handleChangeLove = (e) => {
    // This method takes the input and saves the value in this.state.loveName so we can use the input in our program
    // No need to modify this method
    this.setState({ loveName: e.target.value })
  }

  // Add a method here that returns information to your user by adding a key:value pair to the state object. This method should utilize the user inputs established in state.
checkMatch = () => {
    let { userName, loveName} = this.state
    //turn userName into an array
    let userArr = userName.split("")
    let loveArr = loveName.split("")
    let numbers = [1,2,3,4,5,6,7,8,9,0]
    // select a random index of the array
    let randomIndex = Math.floor(Math.random()*userArr.length)
    let userChar = userArr[randomIndex]
    let loveComp = 0
    if(/^[a-zA-Z]*$/.test(userName) === false) {
        this.setState({tempKey: "Numbers not allowed"})
    } else if(/^[a-zA-Z]*$/.test(loveName) === false){
        this.setState({tempKey:"Numbers not allowed"})
    } else {
    if(loveArr.includes(userChar)){
        loveComp += 20
    }
    if(loveArr.length === userArr.length){
        loveComp+=20
    }
    if(userArr.includes('a') && loveArr.includes('a')){
        loveComp+=20
    }
    if(userArr.includes('y') || loveArr.includes('y')){
        loveComp-=20
    }
    this.setState({tempKey:loveComp})
    }
}


  render(){

    // Destructuring this.state so that you may just use the following variables throughout your code
    let { tempKey,
          userName,
          loveName
        } = this.state

    return(
      <>

        <div id = "all">
          <h1 id = "title"> Love-O-Meter </h1>

          {/* User input field - every DOM event that happens in the input will call the handleChange methods and update state */}
          <div className = "input-field">
              <input
                id = "userName"
                onChange = { this.handleChangeUser }
                value = { userName }
                placeholder = "Your name"
              />
              <span id = "plus"> + </span>
              <input
                id = "loveName"
                onChange = { this.handleChangeLove }
                value = { loveName }
                placeholder = "Your love's name"
              />
              <br/>
              <button
                id = "submitButton"
                type = "submit"
                onClick={this.checkMatch}
              >
              Submit!
              </button>
              </div>
              <p> Your compatibility percentage! </p>
              <div className = "field">
              <textarea
                id = "compatibility"
                placeholder = "???"
                value = { this.state.tempKey}
              />
              </div>
          {/* Conditional rendering, based on the return value of calculatePercentage */}
          {/* Feel free to go in and change the values here to fall in line with your desired matching criteria */}
          { tempKey <= 20 &&
            <div>
              <BadMatch />
            </div>
          }

          { tempKey > 20 &&
            <div>
              <GoodMatch />
            </div>
          }

          {/* Go ahead and customize this info! */}
          <footer> Rudy & Art | LEARN Academy Alpha 2020 </footer>
        </div>

      </>
    )
  }
}
