import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from "react-crud-icons";
import { getEvents } from '../../Store/events/eventsListAction';
import { deleteEventForm } from '../../Store/events/addEventAction';
import ReactPagenate from 'react-paginate';
import '../../App.css';
import { Button, Spinner } from 'react-bootstrap'
import Edit from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';
import HttpService from '../../Services/HttpService';
import * as moment from 'moment';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      events: [],
      offset: 0,
      perPage: 10,
      currentPage: 0,
      filterResources: [],
      slice: [],
      DefaultMessage:'',
      deleteResponse:{},
      EventSearchList: [],
      EventsearchInput:''
    };
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
  }
  componentDidMount() {
    this.props.getEvents();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      spinner: !this.state.spinner,
      events:nextProps.eventsList.eventslist.eventslist
    })
    this.state.events = nextProps.eventsList.eventslist.eventslist
    if (this.state.events.length===0) {
      this.setState({
        spinner:!this.state.spinner,
        DefaultMessage:"No events found.",
        pageCount:0
      })
    }
    else{
 //this.setState({ events: nextProps.eventsList.eventslist.eventslist });
 this.state.events = nextProps.eventsList.eventslist.eventslist
 this.state.filterResources = nextProps.eventsList.eventslist.eventslist.slice(this.state.offset, this.state.offset + this.state.perPage)
 const postData = this.state.filterResources.map(pd => <React.Fragment>
 </React.Fragment>)
 this.setState({
   spinner:!this.state.spinner,
   pageCount: Math.ceil(this.state.events.length / this.state.perPage),
   postData
 })
    }
   
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
      text: "Once deleted, you will not be able to recover this event",
      text: "Are you sure you want to delete this\n user event?",     
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

          HttpService.deleteevent({event_id})
          .then(response => {
              console.log('event delete response',response.data);
              this.state.deleteResponse = response.data
               if(this.state.deleteResponse.status===200){
             
                 this.state.events =""
                 this.props.getEvents()
                   this.state.spinner = true
                swal(this.state.deleteResponse.message, {
                  icon: "success",
                });
               }
               else{
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

  searchHandler = (event) => {
    if (event.target.value.length === 0) {
      this.props.getEvents();
      this.setState({ spinner: !this.state.spinner ,EventSearchList:[],EventsearchInput:'',DefaultMessage:''})
    }
    else {
      let searcjQery = event.target.value,
        displayedSearch = this.state.events.filter((el) => {
          let searchValue = el.event_name;
          if (searchValue != null) {
            return searchValue.toLowerCase().indexOf(searcjQery.toLowerCase()) !== -1;
        }
        })

        if (displayedSearch.length>0) {
          this.setState({ DefaultMessage:'', EventSearchList: displayedSearch, pageCount: Math.ceil(displayedSearch.length / this.state.perPage) , EventsearchInput:event.target.value })

      }else {
        this.setState({EventSearchList: [] ,DefaultMessage:'No Events Found.'})
    }
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

  render() {
    // setTimeout(() => {
    //   $('#dataTable').DataTable();
    // }, 1000)

    if (this.state.events.length > 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3 className="pagename">Events</h3>
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
                {this.state.spinner && <Spinner
                  animation="border"
                  role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>}
              </div>
  
            </div>
          </div>
          <div style={{ width: '100%', paddingTop: '20px', marginLeft: '0px' }} className="row">
          <div className="box">
            <div className="mb-3 col-12 text-center">
              <div className="table-responsive">
                <table id="dataTable">
                  {!this.state.DefaultMessage>0? <thead>
                    <tr>                      
                      <th>Date</th>
                      <th>Time</th>
                      <th>Event Title</th>
                      <th>Tag</th>
                      {/* <th>Status</th> */}
                      <th></th>
                    </tr>
                  </thead>:null}
                  <tbody>

                    {this.state.EventsearchInput? this.state.EventSearchList.length? this.state.EventSearchList?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
                        <tr key={item.event_id}>                          
                          <td>{moment(item.start_date).format('MM/DD/YYYY')}</td>
                          <td>{item.start_time}</td>
                          <td> {item.event_name}</td>
                          <td>Tag</td>
                          {/* <td>{moment(item.end_date).format('MM/DD/YYYY')}</td> */}
                          {/* <td> {item.noof_seats}</td> */}
                          {/* {item.active_status == '0' ? <td>Active</td> : <td>In Active</td>} */}
  
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
                      )):<h3>{this.state.DefaultMessage}</h3>:
                    
                      this.state.events.length ?this.state.events?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
                          <tr key={item.event_id}>                            
                            <td>{moment(item.start_date).format('MM/DD/YYYY')}</td>
                            <td>{item.start_time}</td>
                            <td> {item.event_name}</td>
                            <td>Tag</td>
                            {/* <td>{moment(item.end_date).format('MM/DD/YYYY')}</td> */}
                            {/* <td> {item.noof_seats}</td> */}
                            {/* {item.active_status == '0' ? <td>Active</td> : <td>InActive</td>} */}
    
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
                            {/* <td>
                              <Icon
                                name="edit"
                                theme="none"
                                size="small"
                                onClick={() => this.onEdit(item)}
                              />
                              <Icon
                                name="remove"
                                theme="none"
                                size="small"
                                onClick={() => this.onDelete(item.event_id)}
                              />
                            </td> */}
                          </tr>
                        )):<h3>{this.state.DefaultMessage}</h3>
                    }

                    
                  </tbody>
                </table>
                <div>
  
  
  
                </div>
               {!this.state.DefaultMessage>0? <div className="pagination">
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
                </div>:null
                }
              </div>
            </div>
          </div>
        </div>
        </div>
      );
    }
    else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3 className="pagename">Events</h3>
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
          <div className="tabs-photgallery-sec">
            <div className="mb-3 col-12 text-center">
            <div style={{ width: '100%', paddingTop: '20px', marginLeft: '0px' }} className="row">
          <div className="box">
          {this.state.spinner && <Spinner
                  animation="border"
                  role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>}
                <h1>{this.state.DefaultMessage}</h1>
                <div>  
                </div>              
                </div>

             </div>
            </div>
          </div>
        </div>
      );
    } 
  }
}

export const mapStateToProps = (state) => {
  return {
    eventsList: state.eventsList
  }
}

export default connect(mapStateToProps, { getEvents, deleteEventForm })(Events)