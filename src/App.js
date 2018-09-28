import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import {Map, List} from 'immutable'
import './App.css'
import './AppM.css'
import "regenerator-runtime/runtime"
import { Image } from 'react-bootstrap'
import WellHealthCalendar from './views/WellHealthCalendar'

import 'moment-timezone'

const mapStateToProps = ({}) => ({
})

const mapDispatchToProps = {
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { 
    }
  }

  static propTypes = {
  }

  static defaultProps = {
  }

  componentWillMount() {
    this.getState(this.props)
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  componentWillUpdate() {
  }

  /* render() */

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps)
  }

  getState = props => {
    this.setState({})
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }


  render() {
    return (
        <div className="App">
          <WellHealthCalendar />
        </div>    
    )
  }
}
 
export default reduxConnect(mapStateToProps, mapDispatchToProps)(App)