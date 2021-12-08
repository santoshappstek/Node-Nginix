import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from "react-crud-icons";
import { getResourcesListdata } from '../../Store/resources/resourcesListaction';
import { deleteResourceForm } from '../../Store/resources/newResourceaction';
import $ from 'jquery';
import ReactPagenate from 'react-paginate'
import '../../App.css'
import { Button, Spinner } from 'react-bootstrap'
import Edit from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';
import HttpService from '../../Services/HttpService'
import Modal from 'react-modal';

const currentuser = JSON.parse(localStorage.getItem('userdata'));

class Resources extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      resources: [],
      offset: 0,
      perPage: 10,
      currentPage: 0,
      filterResources: [],
      slice: [],
      spinner: true,
      DefaultMessage: "",
      deleteResponce: {},
      popUpData: {},
      ResourceSearchList: [],
      ResourcesearchInput: '',
      chapter_id:''
    };

    this.handlePageClick = this
      .handlePageClick
      .bind(this);
  }
  componentDidMount() {   
    this.setState({resources:[]})
    var data = {
      chapter_id : this.state.chapter_id
    }
    this.props.getResourcesListdata(data);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      spinner: false,
      resources: nextProps.getResourceslist.resources.resources
    });
    this.state.resources = nextProps.getResourceslist.resources.resources

    if (this.state.resources.length === 0) {
     
      this.setState({
       spinner:false,
        DefaultMessage: "No Resources Found.",
        pageCount: 0
      })
    }
    else {
      this.state.resources = nextProps.getResourceslist.resources.resources
      this.state.filterResources = nextProps.getResourceslist.resources.resources.slice(this.state.offset, this.state.offset + this.state.perPage)
  
      const postData = this.state.filterResources.map(pd => <React.Fragment>
      </React.Fragment>)

      this.setState({
        spinner:false,
        pageCount: Math.ceil(this.state.resources.length / this.state.perPage),
        postData
      },)
    }
  }
  onnewResource() {
    this.props.history.push({
      pathname: '/dashboard/resources/new_resource'
    })
  }
  onEdit(item) {
    this.props.history.push({
      pathname: '/dashboard/resources/new_resource',
      state: { detail: item }
    })
  }

  handleShowDialog(item) {
    swal({
     icon: item.files,
    className:'swal-iamge-preview'
  })
  };

  handleCloseDialog = () => {
    this.setState({ isOpen: false });
  };

  onDelete(resource_id) {
    swal({
      title: "Delete Resource",
      text: "Are you sure you want to delete this\n user resource?",     
      buttons: ["No, Cancel", "Yes, Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          if (resource_id > -1) {
            this.state.resources.splice(resource_id, 1);
          }
          this.setState({
            spinner: !this.state.spinner,
          })
          //this.props.deleteResourceForm({ resource_id })

          HttpService.deleteresource({ resource_id })
            .then(response => {
              this.state.deleteResponce = response.data
              if (this.state.deleteResponce.status === 200) {
                this.state.spinner = true
                this.state.resources = ""
                var data = {
                  chapter_id : this.state.chapter_id
                }
                this.props.getResourcesListdata(data)
                swal(this.state.deleteResponce.message, {
                  icon: "success",
                });
              }
              else {
                this.state.spinner = true
                swal(this.state.deleteResponce.message, {
                  icon: "error",
                });
              }
            })
            .catch(error => {
              this.state.spinner = false
              swal(error, {
                icon: "error",
              });
            })
        }
      });


  }
  receivedData() {
    //this.props.getDiscounts();
    this.state.slice = this.state.resources.slice(this.state.offset, this.state.offset + this.state.perPage)

    const postData = this.state.slice.map(pd => <React.Fragment>

      <img src={pd.thumbnailUrl} alt="" />
    </React.Fragment>)

    this.setState({
      pageCount: Math.ceil(this.state.resources.length / this.state.perPage),
      postData
    },)

  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    },);
  };

  searchHandler = (event) => {
    if (event.target.value.length === 0) {
      this.componentDidMount()
      //this.props.getResourcesListdata(this.state.spinner);
      this.setState({ spinner: !this.state.spinner, ResourceSearchList: [], ResourcesearchInput: '',DefaultMessage:'' })
    }
    else {
      let searcjQery = event.target.value,
        displayedSearch = this.state.resources.filter((el) => {
          let searchValue = el.title;
          return searchValue.toLowerCase().indexOf(searcjQery.toLowerCase()) !== -1;
        })

      if (displayedSearch.length > 0) {
        this.setState({ DefaultMessage:'',ResourceSearchList: displayedSearch, pageCount: Math.ceil(displayedSearch.length / this.state.perPage), ResourcesearchInput: event.target.value })
      }
      else {
        this.setState({ resources:[], ResourceSearchList: [], DefaultMessage:'No Resources Found.'})
      }
    }
  }

  render() {
    localStorage.setItem("activescreen", JSON.stringify('resourcelist'));

    if(JSON.parse(localStorage.getItem('chapter_id'))!=null){
      this.state.chapter_id = JSON.parse(localStorage.getItem('chapter_id'))
         }
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    return (
      <div className="container">
        <div style={{ width: '100%', paddingTop: '20px' }}>
          <div style={{ width: '50%', float: 'left' }}>
            <h3 className="pagename mb-3">Resources</h3>
          </div>
          <div style={{ width: '50%', float: 'right' }}>
            <div style={{ width: '100%', float: 'right' }}>
              <div style={{ width: '70%', float: 'left', paddingRight: '20px' }}>
                <span style={{ position: 'absolute', padding: '15px', zIndex: '2', display: 'block', color: '#aaa' }} className="fa fa-search"></span>
                <input style={{ paddingLeft: '40px' }} type="text" className="form-control" placeholder="Search Resource Title..." onChange={(e) => this.searchHandler(e)} />

              </div>
              <div style={{ width: '30%', float: 'right' }}>
                <button type="button" className="btn btn-info btn-success mt-1" onClick={() => this.onnewResource()}>New Resource</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', paddingTop: '20px', marginLeft: '0px' }} className="row">
          <div className="box">
            <center>
              {this.state.spinner ? <Spinner
                animation="border"
                role="status" >
                <span className="sr-only">Loading...</span>
              </Spinner>: null}
            </center>
            <div style={{ width: '103%' }} className="row">              
                <div className="mb-3 col-12 text-center">
                  <div className="table-responsive">
                    <table id="dataTable">
                    {this.state.resources.length>0? <thead>
                        <tr>
                          <th>Title</th>
                          <th style={{textAlign:'center'}}>Description</th>
                          <th>Files</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>:null
                      }
                      <tbody>

                        {
                          this.state.ResourcesearchInput.length ? this.state.ResourceSearchList.length ? this.state.ResourceSearchList?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
                            <tr key={item.resource_id}>
                              <td> {item.title}</td>
                              <td> {item.description}</td>
                              { item.files ? <td> <img src={item.files} width="70px" height="70px" onClick={() => this.handleShowDialog(item)}></img>
                                {this.state.isOpen && (
                              
                                 <Modal style={{background:'red'}} isOpen={this.state.isOpen}
                                    onRequestClose={this.handleCloseDialog}
                                    ariaHideApp={false}>
                                    <button className="imagepreviewclose btn" style={{ float: 'right', width: '10%' }} onClick={this.handleCloseDialog}>X</button>
                                    <img
                                      className="image"
                                      src={this.state.popUpData}
                                      alt="no image"
                                      width="100%" height="100%" float="center"
                                      style={customStyles} />
                                  </Modal>
                                )}
                              </td> : <td>No Files Found </td>}
                              {item.active_status == '0' ? <td>Active</td> : <td>In Active</td>}

                              <div style={{ padding: '20px' }} className="float-right">
                                <span
                                  name="remove"
                                  onClick={() => this.onDelete(item.resource_id)}
                                ><CloseIcon /></span>
                              </div>
                            </tr>
                          )) : 
                          <tr>
                            <td colspan="4">
                              <div style={{ width: '100%' }}>
                              <h3 style={{ textAlign: 'center' }}>{this.state.DefaultMessage}</h3>
                              </div>
                            </td>
                          </tr> :
                            this.state.resources.length ? this.state.resources?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
                              <tr key={item.resource_id}>
                                <td> {item.title}</td>
                                <td style={{textAlign:'center'}}> {item.description}</td>
                                { item.files ? <td> <img src={item.files} width="70px" height="70px" onClick={() => this.handleShowDialog(item)}></img>
                                  

                                </td> : <td>No Files Found </td>}
                                {item.active_status == '0' ? <td>Active</td> : <td>In Active</td>}
                                <div  className='cross-center'> 
                                  <span
                             
                                    name="remove"
                                    onClick={() => this.onDelete(item.resource_id)}
                                  ><CloseIcon /></span>
                                </div>
                              </tr>
                            )) : <tr>
                                  <td colspan="4">
                                  <div style={{ width: '100%' }}>
                                    <h3 style={{ textAlign: 'center' }}>
                                        {this.state.DefaultMessage}
                                    </h3>
                                  </div>
                                  </td>
                                </tr>
                        }
                      </tbody>
                    </table>
                    {!this.state.DefaultMessage.length > 0 ? <div className="pagination">
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
                        activeClassName={"active"} />
                    </div>:null
                    }
                  </div>
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
    getResourceslist: state.getResourceslist,
    addResource: state.addResource
  }
}

export default connect(mapStateToProps, { getResourcesListdata, deleteResourceForm })(Resources);
