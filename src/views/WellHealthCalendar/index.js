import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect as reduxConnect } from 'react-redux'
import Calendar from 'react-calendar/dist/entry.nostyle'
import {List} from 'immutable'
import EventList from '../../components/EventList'
import {Grid, Row, Col, PageHeader, Button} from 'react-bootstrap'
import {setCalendarEvents} from '../../actions/App'
import Moment from 'react-moment'
import MomentJS from 'moment'
import './styles.css'
import './stylesM.css'

const mapStateToProps = ({ Window, CalendarEvents }) => ({
  Window,
  CalendarEvents
})

const mapDispatchToProps = {
  setCalendarEvents
}

class WellHealthCalendar extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      activeDate: Date,
      isMobile: false,
      CalendarEvents: new List()
    }
  }

  static propTypes = { 
    activeDate: PropTypes.Date,
    isMobile: PropTypes.bool,
    CalendarEvents: new List()
  }

  static defaultProps = {
    activeDate: new Date(),
    monthToString: {"01": 'Jan', "02": 'Feb', "03": 'Mar', "04": 'Apr', "05": 'May', "06": 'Jun',
                    "07": 'Jul', "08": 'Aug', "09": 'Sep', "10": 'Oct', "11": 'Nov', "12": 'Dec'
                  }
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
    const {activeDate, Window, CalendarEvents} = props

    this.setState({
      activeDate,
      Window,
      CalendarEvents
      })
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  onChange = activeDate => this.setState({activeDate})

  formatDate = monthDay => {
    const split = monthDay.split("-")
    return this.props.monthToString[split[0]] + ' ' + split[1]
  }

  hasEvents = ({ date, view }) => {
    const {CalendarEvents} = this.state
    const {isMobile} = this.state.Window
    let mapCounter = {} // Use to display only 1 eventLabelColor per day for mobile
    return(
      <div class="TileContent">
        {CalendarEvents.length > 0 ? CalendarEvents.map( k => {
        const calendarDay = MomentJS(date)
        const eventStartTime = MomentJS(k.startTime)
        const eventFound = eventStartTime.isSame(calendarDay, 'day')
        mapCounter[eventStartTime._d] = (mapCounter[eventStartTime._d]+1) || 1
        return view === 'month' && eventFound && !isMobile ? 
          <div className="hasEventsContainer">
            <span className="eventLabelColor" />
            <span className="eventStartTime"><Moment format="HH:mma" className="eventStartTime">{k.startTime}</Moment></span>
            <h6 className="eventTitle">{k.name}</h6>
          </div>
          : view === 'month' && eventFound && mapCounter[eventStartTime._d] < 2 ? 
          <div class="hasEventsContainerMobile"><span className="eventLabelColor" /></div>
          : null
      }) : null}
    </div>
    )
  }

  setCalendarEvent = () => {
    let {CalendarEvents} = this.state
    CalendarEvents.push({key: 1, name: 'Event 1',   startTime: new Date(2018, 8, 3, 10, 30), endTime: new Date(2018, 9, 3, 12, 30)})
    //CalendarEvents[new Date(2018, 8, 3, 10, 30, 10)] = {key: 1, name: 'Event 1',   startTime: new Date(2018, 8, 3, 10, 30), endTime: new Date(2018, 9, 3, 12, 30)}
    this.props.setCalendarEvents(CalendarEvents)
  }


  Today = () => {
    this.setState({activeDate: new Date()})
  }

  onActiveDateChange = ({ activeStartDate, view }) => this.setState({activeDate: activeStartDate})

  render() {
    const {CalendarEvents, activeDate} = this.state
    console.log(CalendarEvents)
    return (
      <Grid className="WellHealthCalendar Container">
        <Row>
          <PageHeader className="pageHeader">WELL HEALTH CALENDAR</PageHeader>
        </Row>
        <Row>
          <Button onClick={this.setCalendarEvent} className="todayButton">Create</Button>
          <Button onClick={this.Today} className="todayButton">Today</Button>
        </Row>
        <Row>
          <Col>
            <Calendar
            onChange={this.onChange}
            value={activeDate}
            activeStartDate={activeDate} // fallback if value not set
            tileContent={this.hasEvents}
            minDetail={"month"}
            onActiveDateChange={this.onActiveDateChange}
            showFixedNumberOfWeeks={true}
            next2Label={null}
            prev2Label={null}
            nextLabel={<i class="fa fa-chevron-circle-right"/>}
            prevLabel={<i class="fa fa-chevron-circle-left"/>}
            />
          </Col>
          <Col className="EventList" lgHidden mdHidden sm={12}>
            <h2><Moment format="MM-D" filter={this.formatDate}>{activeDate}</Moment></h2>
            {CalendarEvents.length > 0 ? <EventList data={CalendarEvents} activeDate={activeDate}/> : null}
          </Col>
        </Row>
      </Grid>
    )
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(WellHealthCalendar)