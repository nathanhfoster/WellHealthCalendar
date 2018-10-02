import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect as reduxConnect } from 'react-redux'
import Calendar from 'react-calendar/dist/entry.nostyle'
import {List} from 'immutable'
import EventList from '../../components/EventList'
import {Grid, Row, Col, PageHeader, Button, Modal, Form, FormControl, FormGroup, ControlLabel, DropdownButton, ButtonToolbar, MenuItem} from 'react-bootstrap'
import {setCalendarEvents} from '../../actions/App'
import Moment from 'react-moment'
import MomentJS from 'moment'
import './styles.css'
import './stylesM.css'

const renderTimePicker = () => (
  <ButtonToolbar>
    <DropdownButton title="9:00am" id="dropdown-size-medium">
      <MenuItem eventKey="1">9:00am</MenuItem>
      <MenuItem eventKey="2">9:30am</MenuItem>
      <MenuItem eventKey="3">10:00am</MenuItem>
      <MenuItem eventKey="4">10:30am</MenuItem>
    </DropdownButton>
  </ButtonToolbar>
)

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
    this.onChange = this.onChange.bind(this)
    this.onFormChange = this.onFormChange.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleHide = this.handleHide.bind(this)
 
    this.state = {
      activeDate: Date,
      isMobile: false,
      CalendarEvents: new List(),
      show: false
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
                    "07": 'Jul', "08": 'Aug', "09": 'Sep', "10": 'Oct', "11": 'Nov', "12": 'Dec'},
    formOptions: [
      {type: "text", name: "title", placeholder: "Title"},
      {type: "text", name: "startTime", placeholder: "Start Time", component: renderTimePicker},
      {type: "text", name: "endTime", placeholder: "End Time"},
      {type: "text", name: "description", placeholder: "Description"},
    ]
  }
  
  componentWillMount() {
     this.getState(this.props)
  }

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

  onFormChange = (e) => this.setState({[e.target.name]: e.target.value})

  handleShow = () => this.setState({show: true})

  handleHide = () => this.setState({show: false})

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
            <span className="eventStartTime"><Moment format="H:mma">{k.startTime}</Moment> {k.title}</span>
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
    let {activeDate, CalendarEvents, title, startTime, endTime, description} = this.state
    startTime = new Date(activeDate.getFullYear(), activeDate.getMonth(), activeDate.getDay(), startTime)
    endTime = new Date(activeDate.getFullYear(), activeDate.getMonth(), activeDate.getDay(), endTime)
    CalendarEvents.push({key: CalendarEvents.length, title, startTime, endTime, description})
    this.props.setCalendarEvents(CalendarEvents)
  }


  Today = () => {
    this.setState({activeDate: new Date()})
  }

  onActiveDateChange = ({ activeStartDate, view }) => this.setState({activeDate: activeStartDate})

  renderForm = (formOptions) => formOptions.map(k =>
    <FormGroup>
      <ControlLabel>{k.placeholder}</ControlLabel>
      <FormControl type={k.type} name={k.name} placeholder={k.placeholder} onChange={this.onFormChange} componentClass={k.component}/>
    </FormGroup>)

  validateForm = () => { 
    //Appointments can only happen in the future

   // No appointments requested should overlap
  }



  render() {
    const {CalendarEvents, activeDate} = this.state
    const {formOptions} = this.props
    console.log(this.state)
    return (
      <Grid className="WellHealthCalendar Container">
        <Row>
          <PageHeader className="pageHeader">WELL HEALTH CALENDAR</PageHeader>
        </Row>
        <Row>
          <Button onClick={this.handleShow} className="todayButton">Create</Button>
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
        <Row>
          <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
          >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Request Appointment</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form className="Container">
                <Row>
                  {this.renderForm(formOptions)}
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.setCalendarEvent}>Create</Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </Grid>
    )
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(WellHealthCalendar)