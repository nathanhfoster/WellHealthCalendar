import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect as reduxConnect } from 'react-redux'
import {Map, List} from 'immutable'
import './App.css'
import './AppM.css'
import "regenerator-runtime/runtime"
import {setWindow} from './actions/App'
import WellHealthCalendar from './views/WellHealthCalendar'

import 'moment-timezone'

const mapStateToProps = ({Window}) => ({
})

const mapDispatchToProps = {
  setWindow
}

class App extends Component {
  constructor(props) {
    super(props)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    this.state = { 
      width: 0,
      height: 0 ,
      isMobile: false,
    }
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    isMobile: PropTypes.bool,
  }

  static defaultProps = {
    setWindow: PropTypes.func.isRequired,
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
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps)
  }

  getState = props => {
    const {Window} = props
    this.setState({Window})
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }


  updateWindowDimensions() {
    const { innerHeight, innerWidth } = window
    const isMobile = innerWidth < 676
    this.props.setWindow({ innerHeight, innerWidth, isMobile })
    this.setState({height: innerHeight, width: innerWidth, isMobile})
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