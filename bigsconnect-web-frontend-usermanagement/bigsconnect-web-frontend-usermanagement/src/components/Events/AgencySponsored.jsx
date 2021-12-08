import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEvents, getRangeEventList } from '../../Store/events/eventsListAction';
import CustomToolBar from './CustomToolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';
import HttpService from '../../Services/HttpService';
import ReactPagenate from 'react-paginate';
import { Button, Spinner } from 'react-bootstrap'
import { Label } from '@material-ui/icons';

const localizer = momentLocalizer(moment);

const currentuser = JSON.parse(localStorage.getItem('userdata'));


class AgecySponsored extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      start: '',
      end: '',
      eventSearchList: [],
      allEvents: [],
      searchInput: '',
      showListView: 'calender',
      DefaultMessage: '',
      spinner: false,
      offset: 0,
      perPage: 10,
      currentPage: 0,
      filterResources: [],
      slice: [],
      deleteResponse: {},
      EventSearchList: [],
      EventsearchInput: '',
      calenderEventsData: [],
      toolbardata: {},
      datelbel: '',
      chapter_id:'',
      all_events_text:'Today'
     
    };
  }

  componentDidMount() {
   
    this.state.showListView = this.props.location.state
    this.setState({
      spinner:true
    })
   var data ={
         organized_by:"agency",
           month:"current",
           chapter_id: this.state.chapter_id
           
  }
  console.log("input current data:- ", data)
  this.props.getRangeEventList(data)
  }

  componentWillReceiveProps(nextProps) {
   
    this.state.events = nextProps.eventsList.bigseventslist.eventslist
    this.setState({
      spinner:false,
      calenderEventsData: nextProps.eventsList.bigseventslist.eventslist.map((appointment) => {
        return {
          id: appointment.event_id,
          title: appointment.event_name,
          start: new Date(appointment.start_date),
          end: new Date(appointment.end_date),
          allDay: false,
          hexColor: appointment.tag_color
        }
      })
    })

    if (this.state.events.length === 0) {

      this.setState({
        spinner: false,
        DefaultMessage: "No events found.",
        pageCount: 0
      })
    }
    else {


      this.state.events = nextProps.eventsList.bigseventslist.eventslist
      this.state.filterResources = nextProps.eventsList.bigseventslist.eventslist.slice(this.state.offset, this.state.offset + this.state.perPage)
      const postData = this.state.filterResources.map(pd => <React.Fragment>
      </React.Fragment>)
      this.setState({
        spinner: false,
        pageCount: Math.ceil(this.state.events.length / this.state.perPage),
        postData
      })
    }
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    });
  };
  receivedData() {
    this.state.slice = this.state.events.slice(this.state.offset, this.state.offset + this.state.perPage)
    const postData = this.state.slice.map(pd => <React.Fragment>

      <img src={pd.thumbnailUrl} alt="" />
    </React.Fragment>)
    this.setState({
      pageCount: Math.ceil(this.state.events.length / this.state.perPage),
      postData
    })
  }

  onnewEvent() {
    this.props.history.push({
      pathname: '/dashboard/events/add_event'
    })
  }

  onEdit(item) {
    this.props.history.push({
      pathname: '/dashboard/events/add_event',
      state: { detail: item }
    })
  }
  onDelete(event_id) {

    swal({
      title: "Delete Event",
      text: "Are you sure you want to delete this event? Deleted events may not be restored.",

      buttons: ["No, Cancel", "Yes, Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          console.log('id', event_id)
          if (event_id > -1) {
            this.state.events.splice(event_id, 1);
          }
          //this.props.deleteEventForm({ event_id })

          HttpService.deleteevent({ event_id })
            .then(response => {
              console.log('event delete response', response.data);
              this.state.deleteResponse = response.data
              if (this.state.deleteResponse.status === 200) {

                this.state.events = ""
                var data ={
                       organized_by:"agency",
                         month:"current",
                         chapter_id: this.state.chapter_id
                         
                }
                this.props.getRangeEventList(data)
                //this.props.getEvents()
                this.state.spinner = false
                swal(this.state.deleteResponse.message, {
                  icon: "success",
                });
              }
              else {
                this.state.spinner = false
                swal(this.state.deleteResponse.message, {
                  icon: "error",
                });
              }
              //dispatch(deleteeventfor(response.data));
            })
            .catch(error => {
              this.state.spinner = false
              swal(error, {
                icon: "error",
              });
              // dispatch(EventError());
            })

        }
      });
  }
  eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event.hexColor);
    var backgroundColor = '#' + event.hexColor;
    //var backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

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
  searchHandler = (event) => {
    this.state.searchInput = event.target.value

    if (this.state.showListView == 'list') {

      if (event.target.value.length === 0) {
        this.props.getEvents();
        this.setState({ spinner: !this.state.spinner, EventSearchList: [], EventsearchInput: '', DefaultMessage: '' })
      }
      else {
        let searcjQery = event.target.value,
          displayedSearch = this.state.events.filter((el) => {
            let searchValue = el.event_name;
            if (searchValue != null) {
              return searchValue.toLowerCase().indexOf(searcjQery.toLowerCase()) !== -1;
            }
          })

        if (displayedSearch.length > 0) {
          this.setState({ DefaultMessage: '', EventSearchList: displayedSearch, pageCount: Math.ceil(displayedSearch.length / this.state.perPage), EventsearchInput: event.target.value })

        } else {
          this.setState({ EventSearchList: [], DefaultMessage: 'No Events Found.' })
        }
      }
    }
    else {
      if (this.state.searchInput == '') {
        this.state.eventSearchList = []
        this.props.getEvents();

      }
      else {
        let searcjQery = event.target.value,
          displayedevents = this.state.calenderEventsData.filter((el) => {
            let searchValue = el.title;
            return searchValue.toLowerCase().indexOf(searcjQery.toLowerCase()) !== -1;
          })
        if (displayedevents.length > 0) {
          this.setState({ eventSearchList: displayedevents })
        }
        else {
          this.setState({ eventSearchList: [] })
        }
      }
    }
  }

  handleChange = (event) => {

    if (event.target.value == 'list') {
      this.setState({
        showListView: event.target.value
      })
    }
    else {
      this.setState({
        showListView: event.target.value
      })
    }
    console.log('handle:- ',this.state.showListView)
  }
  CustomToolbar = (toolbar) => {
    this.state.toolbardata = toolbar    

    const labellist = () => {
      const date = moment(toolbar.date);
      return (
        <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
      );
    };
    return (
      <Typography variant="headline" style={{ color: '4d4f5c', textTransform: 'capitalize', width: '100%' }}></Typography>
    );    
  }
  goToBack(prev) {
    if (this.state.showListView=='list') {
    }
    else {
    }
  this.state.toolbardata.date.setMonth(this.state.toolbardata.date.getMonth());

    this.state.toolbardata.onNavigate(prev);
    let senddate = this.state.toolbardata.date.getMonth()
    
    const date = moment(this.state.toolbardata.date);
    var data ={
          organized_by:"agency",
         date:date.format('YYYY')+"-"+senddate+"-"+"01",
      //     from: date.format('YYYY')+"-"+senddate+"-"+"01",
      //     to:date.format('YYYY')+"-"+senddate+"-"+"31",
          chapter_id: this.state.chapter_id
    }
    this.props.getRangeEventList(data)
  }
  goToNext(next) {
    this.state.toolbardata.date.setMonth(this.state.toolbardata.date.getMonth());
    this.state.toolbardata.onNavigate(next);

    const date = moment(this.state.toolbardata.date);
    let senddate = this.state.toolbardata.date.getMonth()+2

    var data ={
          organized_by:"agency",
         date:date.format('YYYY')+"-"+senddate+"-"+"01",
      //     from: date.format('YYYY')+"-"+senddate+"-"+"01",
      //     to:date.format('YYYY')+"-"+senddate+"-"+"31",
          chapter_id: this.state.chapter_id
    }
    this.props.getRangeEventList(data)

    return (
      <Typography variant="headline" style={{ color: '4d4f5c', textTransform: 'capitalize', width: '100%' }}>{this.state.datelbel}</Typography>
    )
  }

  goToCurrent = () => {
    
    if(this.state.all_events_text=='All Events'){
      this.state.all_events_text = 'Today'
      var data ={
             organized_by:"agency",
               month:"current",
               chapter_id: this.state.chapter_id
               
      }
      console.log("input current data:- ", data)
      this.props.getRangeEventList(data)
         // this.componentDidMount()
    }
    else {
      this.state.all_events_text = 'All Events'
    const now = new Date();
    this.state.toolbardata.date.setMonth(now.getMonth());
    this.state.toolbardata.date.setYear(now.getFullYear());
    this.state.toolbardata.onNavigate('current');
    var data ={
           organized_by:"agency",
           day:"today",
           chapter_id: this.state.chapter_id
    }
    this.props.getRangeEventList(data)
  }
  };

  label() {
    const date = moment(this.state.toolbardata.date);
    return (
      <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
    );
  }  

  render() {
    console.log('login data:- ',JSON.parse(localStorage.getItem('userdata')))

    localStorage.setItem("activescreen", JSON.stringify('AgecySponsoredlist'));
    if(JSON.parse(localStorage.getItem('chapter_id'))!=null){
      this.state.chapter_id = JSON.parse(localStorage.getItem('chapter_id'))
     }
    const { onNavigate } = this.props;

    if (this.state.searchInput == '') {
      this.state.allEvents = this.state.calenderEventsData
    }
    else {
      this.state.allEvents = this.state.eventSearchList
    }

    const CustomToolbar = (toolbar) => {
      this.state.toolbardata = toolbar
      const goToBack = () => {
        toolbar.date.setMonth(this.state.toolbardata.date.getMonth() - 1);
        toolbar.onNavigate('prev');
      };

      const goToNext = () => {
        toolbar.date.setMonth(this.state.toolbardata.date.getMonth() + 1);
        toolbar.onNavigate('next');
      };

      const goToCurrent = () => {
        const now = new Date();
        toolbar.date.setMonth(now.getMonth());
        toolbar.date.setYear(now.getFullYear());
        toolbar.onNavigate('current');
      };

      const label = () => {
        const date = moment(toolbar.date);
        return (
          <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
        );
      };

      return (
        <div >
          <div className="col-12 p-0" style={{ display: 'flex', alignItems: 'center' }}>

            <div className="col-md-4 ">
              <div className="text-center">
                {/* <IconButton onClick={() => goToBack('PREV')}><i style={{ border: '1px solid #D7DAE2', borderRadius: '2px', padding: '5px', color: 'lightgray' }} class="fa fa-chevron-left" aria-hidden="true"></i></IconButton>
                <Typography variant="headline" style={{ color: '4d4f5c', textTransform: 'capitalize', width: '100%' }}>{label()}</Typography>
                <IconButton onClick={() => goToNext('NEXT')}><i style={{ border: '1px solid #D7DAE2', borderRadius: '2px', padding: '5px', color: 'lightgray' }} class="fa fa-chevron-right" aria-hidden="true"></i></IconButton> */}
              </div>
            </div>
            <div className="col-md-4 text-right pr-0">
              <span className="today-sec" onClick={() => goToCurrent('TODAY')}>Today</span>
            </div>
          </div>  </div>
      );
    };


    return (
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
                    <div >
                      <span style={{ position: 'absolute', padding: '15px', zIndex: '2', display: 'block', color: '#aaa' }} className="fa fa-search"></span>
                      <input style={{ paddingLeft: '40px' }} type="text" className="form-control" placeholder="Search Events..." onChange={(e) => this.searchHandler(e)} />
                    </div>
                  </div>
                  <div style={{marginLeft:'-20px'}}className="col-md-4">
                    <button type="button" className="btn btn-info btn-success mt-1" onClick={() => this.onnewEvent()}>New Event</button>
                  </div>

                </div>

              </div>
            </div>
         
            <div style={{ width: '100%', paddingTop: '20px', marginLeft: '0px' }} className="row">
              <div className="box">
                <div className="row">
                <div className="col-12 mb-3">
                    <div style={{marginTop:'10px'}} className="col-md-4 pl-0">
                    <select 
                    onChange={(e) => this.handleChange(e)} 
                    style={{ padding: '5px', border: '1px solid #D7DAE2', borderRadius: '4px' }} 
                    className="cal-dpdwn"
                    value={this.state.showListView}
                    >
                      <option  value="calender" > Calendar View</option>
                      <option value="list">List View</option>
                    </select>
                  </div>
                  <div className="col-md-4 ">
                    <div className="text-center">
                      <IconButton onClick={() => this.goToBack('PREV')} ><i style={{ border: '1px solid #D7DAE2', borderRadius: '2px', padding: '5px', color: 'lightgray' }} class="fa fa-chevron-left" aria-hidden="true"></i></IconButton>
                      <Typography variant="headline" style={{ color: '4d4f5c', textTransform: 'capitalize', width: '100%',fontWeight:'600' }}>{this.state.toolbardata.label}</Typography>                
                      <IconButton onClick={() => this.goToNext('NEXT')}><i style={{ border: '1px solid #D7DAE2', borderRadius: '2px', padding: '5px', color: 'lightgray' }} class="fa fa-chevron-right" aria-hidden="true"></i></IconButton>
                    </div>
                  </div>
                  <div style={{marginTop:'15px'}} className="col-md-4 text-right pr-0">
                    <span onClick={() => this.goToCurrent('TODAY')} className="today-sec" >{this.state.all_events_text}</span>
                  </div>
                </div>
                </div>
                <center>
                  {this.state.spinner ? <Spinner
                    animation="border"
                    role="status" >
                    <span className="sr-only">Loading...</span>
                  </Spinner> : null}
                </center>
                <Calendar
                      
                      localizer={localizer}
                    
                      defaultDate={new Date()}
                      
                      events={this.state.allEvents}
                      components={{ toolbar: this.CustomToolbar }}
                      toolbar={this.state.toolbardata}
                      style={{ height: "0px" ,width:'0px',display:'none'}}
                      eventPropGetter={(this.eventStyleGetter)}
                      
                    />
                {
                  
                  this.state.showListView == 'list' ?
                    <div className="mb-3 col-12 text-center">
                      
                      <div className="table-responsive">
                     
                        <table id="dataTable">
                          {this.state.events.length > 0 ? <thead>
                            <tr>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Event Title</th>
                              <th>Tag</th>                            
                              <th></th>
                            </tr>
                          </thead> : null}
                          <tbody>
                            {
                              this.state.EventsearchInput ? this.state.EventSearchList.length ? this.state.EventSearchList?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
                                <tr key={item.event_id}>
                                  <td>{moment(item.start_date).format('MM/DD/YYYY')}</td>
                                  <td>{item.start_time}</td>
                                  <td> {item.event_name}</td>
                                  <td> <label
                                       style={{backgroundColor:"#"+item.tag_color,paddingLeft:'20px',paddingRight:'20px',
                                    paddingTop:'0px',paddingBottom:'2px',
                                    fontWeight:'normal',
                                    borderRadius:'5px'
                                  }}>Tag Name 1</label></td>                                  
                                  <div className="float-right">
                                    <span className="pr-2"
                                      name="edit"
                                      onClick={() => this.onEdit(item)}
                                    ><Edit /></span>
                                    <span
                                      name="remove"
                                      onClick={() => this.onDelete(item.event_id)}
                                    ><CloseIcon /></span>
                                  </div>
                                </tr>
                              )) : <tr>
                                    <td colspan="4"> 
                                      <div style={{ textAlign: "center" }}>
                                        <h3>{this.state.DefaultMessage}</h3>
                                        </div>
                                     </td>
                                  </tr> :
                                this.state.events.length ? this.state.events?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
                                  <tr key={item.event_id}>
                                    <td>{moment(item.start_date).format('MM/DD/YYYY')}</td>
                                    <td>{item.start_time}</td>
                                    <td> {item.event_name}</td>
                                    <td>
                                      <label
                                       style={{backgroundColor:"#"+item.tag_color,paddingLeft:'20px',paddingRight:'20px',
                                    paddingTop:'0px',paddingBottom:'2px',
                                    fontWeight:'normal',
                                    borderRadius:'5px'
                                  }}>Tag Name 1</label></td>                                   
                                    <div style={{marginTop:'15px'}} className="float-right">
                                      <span className="pr-2"
                                        name="edit"
                                        onClick={() => this.onEdit(item)}
                                      ><Edit /></span>
                                      <span
                                        name="remove"
                                        onClick={() => this.onDelete(item.event_id)}
                                      ><CloseIcon /></span>
                                    </div>
                                  </tr>
                                )) : 
                                    <tr>
                                      <td colspan="4"><h3 style={{ textAlign: "center" }}>{this.state.DefaultMessage}</h3>
                                      </td>
                                    </tr>
                            }
                          </tbody>
                        </table>
                        <div>
                        </div>
                        {this.state.events.length ? <div className="pagination">
                          {this.state.postData}
                          <ReactPagenate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={10}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                          ></ReactPagenate>
                        </div> : null
                        }
                      </div>
                    </div>
                    :this.state.searchInput.length ? this.state.eventSearchList.length ?
                      <Calendar
                        localizer={localizer}
                        views={['month']}
                        defaultDate={new Date()}
                        popup
                        events={this.state.allEvents}
                        components={{ toolbar: this.CustomToolbar }}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 600 }}
                        eventPropGetter={(this.eventStyleGetter)}
                      /> : <div style={{ width: '100%' }}><h3 style={{ textAlign: 'center' }}>No data found</h3></div> :
                      this.state.calenderEventsData.length ?
                        <Calendar
                          localizer={localizer}
                          views={['month']}
                          defaultDate={new Date()}
                          popup
                          events={this.state.allEvents}
                          components={{ toolbar: this.CustomToolbar }}
                          toolbar={this.state.toolbardata}
                          startAccessor="start"
                          endAccessor="end"
                          style={{ height: 600 }}
                          eventPropGetter={(this.eventStyleGetter)}
                        /> : 
                      <Calendar
                     localizer={localizer}
                     views={['month']}
                     defaultDate={new Date()}
                     popup
                     events={this.state.allEvents}
                     components={{ toolbar: this.CustomToolbar }}
                     toolbar={this.state.toolbardata}
                     startAccessor="start"
                          endAccessor="end"
                          style={{ height: 600 }}
                     eventPropGetter={(this.eventStyleGetter)}
                   />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AgecySponsored.propTypes = {
  onView: PropTypes.func,
  onNavigate: PropTypes.func,
  // label: PropTypes.string,
  view: PropTypes.string,
  views: PropTypes.array,

};

export const mapStateToProps = (state) => {
  return {
    eventsList: state.eventsList
  }
}

export default connect(mapStateToProps, { getEvents, getRangeEventList })(AgecySponsored)