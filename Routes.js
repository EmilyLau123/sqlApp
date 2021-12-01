import React from 'react'
import HomeScreen from './Screens/HomeScreen.js'
import AccountScreen from './Screens/AccountScreen.js'
import { StatementsScreen } from './Screens/StatementsScreen.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" component = {HomeScreen} title = "Home" initial = {true} />
         <Scene key = "statements" component = {StatementsScreen} title = "statements"/>

      </Scene>
   </Router>
)
export default Routes