import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEvents } from '../../Store/events/eventsListAction';

const localizer = momentLocalizer(moment);

class EventsCalendar extends Component {
    
    constructor(props) {
        super(props);
    
    this.state = {
        events: [],
        start:'',
        end:'',       
    };
  }

    componentDidMount() {
        this.props.getEvents(); 
      }

    componentWillReceiveProps(nextProps) {

        this.state.events= nextProps.eventsList.eventslist.eventslist.map((appointment)=>{
            return {
              id: appointment.event_id,
              title: appointment.event_name,
              start: new Date(appointment.start_date),
              end: new Date(appointment.end_date),
              allDay: false,
             
            }
          })}

          onnewEvent() {
            this.props.history.push({
              pathname: '/dashboard/events/add_event'
            })
          }          
          eventStyleGetter = (event, start, end, isSelected) => {
            console.log(event.hexColor);
           // var backgroundColor = '#' +event.hexColor;
           var backgroundColor= '#'+Math.floor(Math.random()*16777215).toString(16);

            var style = {
              backgroundColor: backgroundColor,
              borderRadius: '0px',
              //opacity: 0.8,
              color: 'white',
              border: '0px',
              display: 'block'
            };
            return {
              style: style
            };
          }
        
    render()
    {        
      return(
        <div className="container">
          <div className="col-md-12">
            <div className="events-calender-sec">
            <div className="row">
            <div className="col-md-6">
              <h3 className="pagename">Agency Sponsored Events</h3>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-8">
                <div>
                  <span style={{ position: 'absolute', padding: '15px', zIndex: '2', display: 'block', color: '#aaa' }} className="fa fa-search"></span>
                  <input style={{ paddingLeft: '40px' }} type="text" className="form-control" placeholder="Search Event Name..." onChange={(e) => this.searchHandler(e)} />
                </div>
                </div>
                <div className="col-md-4">
                  <button type="button" className="btn btn-info btn-success mt-1" onClick={() => this.onnewEvent()}>New Event</button>  
                </div>
               
              </div>
  
            </div>
          </div>
                {/* <h1>Agency Sponsored Events</h1> */}

                {/* <div className="row mb-4">
                  <div className="col-md-4">                   
                    <select className="cal-dpdwn">
                      <option>Calendar View</option>
                      <option>List View</option>                     
                    </select>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center">
                      <span style={{margin: "0px 30px", cursor: "pointer" }}><i class="fas fa-chevron-left"></i></span>
                          July 2021
                      <span style={{margin: "0px 30px", cursor: "pointer" }}><i class="fas fa-chevron-right"></i></span>
                    </div>
                  </div>
                  <div className="col-md-4 text-right">
                    <span className="today-sec">
                      Today
                    </span>
                  </div>
                </div> */}
              <div style={{ width: '100%', paddingTop: '20px', marginLeft: '0px' }} className="row">
                <div className="box">
                    <Calendar                
                    localizer={localizer}                
                    defaultView="month"
                    // defaultDate={new Date()}
                    events={ this.state.events}
                    // startAccessor = {new Date(item.start_date)}
                    // endAccessor=  {new Date(item.end_date)}                    
                    style={{ height: "75vh" }}
                    eventPropGetter={(this.eventStyleGetter)}                    
                 />
                 </div>
                 </div>      
            </div>
          </div>
        </div>
      );
    }
}

export const mapStateToProps = (state) => {
    return {
      eventsList: state.eventsList
    }
  }
  
export default connect(mapStateToProps, { getEvents })(EventsCalendar)
//export default EventsCalendar;