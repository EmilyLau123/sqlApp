import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './Routes.js'

class sqlApp extends Component {
   render() {
      return (
         <Routes />
      )
   }
}
export default sqlApp
AppRegistry.registerComponent('sqlApp', () => sqlApp)