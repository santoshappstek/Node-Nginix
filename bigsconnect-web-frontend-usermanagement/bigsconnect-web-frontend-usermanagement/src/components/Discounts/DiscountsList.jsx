import React, { Component } from "react";
import { connect } from 'react-redux';
import Icon from "react-crud-icons";
import { getDiscounts } from '../../Store/discounts/discountsListaction';
import { deleteDiscountForm } from '../../Store/discounts/addDiscountaction';
import $ from 'jquery';
import ReactPagenate from 'react-paginate';
import { Button, Spinner } from 'react-bootstrap'
import '../../App.css'
import Edit from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';
import HttpService from '../../Services/HttpService';
import * as moment from 'moment';

const currentuser = JSON.parse(localStorage.getItem('userdata'));



class DiscountsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      offset: 0,
      perPage: 10,
      currentPage: 0,
      discounts: [],
      filterDiscount: [],
      slice: [],
      deleteResponce: '',
      DefaultMessage:'',
      DiscountSearchList: [],
      DiscountSearchInput: '',
      chapter_id:''
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {

    var data ={
      chapter_id:this.state.chapter_id
    }
    this.props.getDiscounts(data);
  }

  componentWillReceiveProps(nextProps) {
    this.state.discounts = nextProps.discountsList.discountslist.discounts

    if (this.state.discounts.length === 0) {
      this.setState({
        spinner: false,
        pageCount: 0,
        DefaultMessage:'No Discount Programs Found.'
      });
    }
    else {
      this.state.filterDiscount = nextProps.discountsList.discountslist.discounts.slice(this.state.offset, this.state.offset + this.state.perPage)
      const postData = this.state.filterDiscount.map(pd => <React.Fragment>
      </React.Fragment>)
      this.setState({
        spinner: false,
        pageCount: Math.ceil(this.state.discounts.length / this.state.perPage),
        postData
      });
    }

  }
  onnewDiscount() {
    this.props.history.push({
      pathname: '/dashboard/discount_programs/new_discount'
    })
  }
  onEdit(item) {    
    this.props.history.push({
      pathname: '/dashboard/discount_programs/new_discount',
      state: { detail: item }
    })
  }
  onDelete(discount_id,index) {
    console.log("delete:- ",discount_id+"index:- "+index)

    swal({
      title: "Delete Discount",
      text: "Are you sure you want to delete this\n user discount?",     
      buttons: ["No, Cancel", "Yes, Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {


        if (willDelete) {
          if(this.state.DiscountSearchInput==''){
            const newCountries = [...this.state.discounts];
            newCountries.splice(index, 1);
            this.state.discounts = newCountries
          }
          else{
            const newCountries = [...this.state.DiscountSearchList];
            newCountries.splice(index, 1);
            this.state.DiscountSearchList = newCountries
          }

          HttpService.deletediscount(discount_id)
            .then(response => {
              console.log('response', response.data);
              this.state.deleteResponce = response.data
              console.log('state response', this.state.deleteResponce);
              if (this.state.deleteResponce.status === 200) {
                this.componentDidMount()
            //    this.state.spinner = false
                swal({
                  text: this.state.deleteResponce.message,
                  icon: "success"
                });
                this.setState({
                  spinner: false,
                  discounts: this.state.discounts,
                })
              }

              else {
                this.setState({
                  spinner: false
                 
                })
                swal({
                  title: "Something went wrong, Please try again after some time",
                  icon: "error"
                });
              }
            })
            .catch(error => {
              swal({
                title: error,
                icon: "error"
              });
            })
        }
      });
  }
  receivedData() {
    this.state.slice = this.state.discounts.slice(this.state.offset, this.state.offset + this.state.perPage)
    const postData = this.state.slice.map(pd => <React.Fragment>
      <img src={pd.thumbnailUrl} alt="" />
    </React.Fragment>)

    this.setState({
      pageCount: Math.ceil(this.state.discounts.length / this.state.perPage),
      postData
    })
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    })
  };

  searchHandler = (event) => {
    if ( event.target.value == '') {
      this.state.discounts=[]
      // var data ={
      //   chapter_id:this.state.chapter_id
      // }
      // this.props.getDiscounts(data);
      this.componentDidMount()
      this.setState({ spinner: !this.state.spinner,  DiscountSearchList: [], DiscountSearchInput: '',DefaultMessage:''})
    }
    else {
      let searcjQery = event.target.value,
        displayedContacts = this.state.discounts.filter((el) => {
          let searchValue = el.program_name;
          return searchValue.toLowerCase().indexOf(searcjQery.toLowerCase()) !== -1;
        })

        if (displayedContacts.length > 0) {
          this.setState({ DefaultMessage:'',DiscountSearchList: displayedContacts, pageCount: Math.ceil(displayedContacts.length / this.state.perPage), DiscountSearchInput: event.target.value })
        }
        else {
          this.setState({discounts:[], DiscountSearchList: [],DefaultMessage:'No Discount Programs Found.'})
        }
    }
  }


  render() {
    localStorage.setItem("activescreen", JSON.stringify('discountlist'));
    if(JSON.parse(localStorage.getItem('chapter_id'))!=null){
     this.state.chapter_id = JSON.parse(localStorage.getItem('chapter_id'))
    
    }
    return (

      <div className="container">
        <div style={{ width: '100%', paddingTop: '20px' }}>
          <div style={{ width: '50%', float: 'left' }}>
            <h3 className="pagename mb-3">Discount Programs</h3>
          </div>

          <div style={{ width: '50%', float: 'right' }}>
            <div style={{ width: '100%', float: 'right' }}>
              <div style={{ width: '70%', float: 'left', paddingRight: '20px' }}>
                <span style={{ position: 'absolute', padding: '15px', zIndex: '2', display: 'block', color: '#aaa' }} className="fa fa-search"></span>
                <input style={{ paddingLeft: '40px' }} type="text" className="form-control" placeholder="Search Discount Program..." onChange={(e) => this.searchHandler(e)} />

              </div>
              <div style={{ width: '30%', float: 'right' }}>
                <button type="button" className="btn btn-info btn-success mt-1" onClick={() => this.onnewDiscount()}>New Discount</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', paddingTop: '20px', marginLeft: '0px' }} className="row">
          <div className="box">
            <center>
              {this.state.spinner? <Spinner
                animation="border"
                role="status" >
                <span className="sr-only">Loading...</span>
              </Spinner>:null}

            </center>
            {this.state.discounts.length ?
              <div style={{ width: '103%' }} className="row">
                <div className="mb-3 col-12 text-center">
                  <div className="table-responsive">
                    <table id="dataTable">
                      <thead>
                       {this.state.discounts.length>0 ?  <tr>
                          <th>Location</th>
                          <th>Expiration Date</th>
                          <th>Description</th>
                          <th>Partner</th>
                          <th>Status</th>
                          <th></th>
                        </tr>:null
                        }
                      </thead>
                      <tbody>
                        {
                          
                         this.state.DiscountSearchInput.length? this.state.DiscountSearchList.length? this.state.DiscountSearchList?.slice(this.state.offset, this.state.offset + this.state.perPage).map((item,index) => (
                            <tr key={item.discount_id}>
                              <td> {item.program_name}</td>
                              <td>{moment(item.end_date).format('MM/DD/YYYY')}</td>
                              <td> {item.description}</td>
                              <td> {item.partner_name}</td>
                              {item.active_status == '0' ? <td>Active</td> : <td>In Active</td>}
                              <td>
                                <div className="float-right">
                                  <span className="pr-2"
                                    name="edit"
                                    onClick={() => this.onEdit(item)}
                                  ><Edit /></span>
                                  <span
                                    name="remove"
                                    onClick={() => this.onDelete(item,index)}

                                  ><CloseIcon /></span>
                                </div>

                              </td>
                            </tr>
                          )):<div style={{ width: '200%',marginTop:'20px' }}><h3 style={{ textAlign: 'center' }}>{this.state.DefaultMessage}</h3></div> :
                        this.state.discounts.length? this.state.discounts?.slice(this.state.offset, this.state.offset + this.state.perPage).map((item,index) => (
                          <tr key={item.discount_id}>
                            <td> {item.program_name}</td>
                            <td>{moment(item.end_date).format('MM/DD/YYYY')}</td>
                            <td> {item.description}</td>
                            <td> {item.partner_name}</td>
                            {item.active_status == '0' ? <td>Active</td> : <td>In Active</td>}
                            <td>
                              <div className="float-right">
                                <span className="pr-2"
                                  name="edit"
                                  onClick={() => this.onEdit(item)}
                                ><Edit /></span>
                                <span
                                  name="remove"
                                  onClick={() => this.onDelete(item,index)}
                                ><CloseIcon /></span>
                              </div>
                            </td>
                          </tr>
                        )):<div style={{ width: '100%' }}><h3 style={{ textAlign: 'center' }}>{this.state.DefaultMessage}</h3></div>                        
                        }
                      </tbody>
                    </table>
                   {!this.state.DefaultMessage.length>0 ? <div className="pagination">
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
              </div> : <center><h3>{this.state.DefaultMessage}</h3></center>}
          </div>
        </div>
      </div>
    );  
  }
}
export const mapStateToProps = (state) => {
  return {
    discountsList: state.discountsList,
    adddiscount: state.adddiscount
  }
}

export default connect(mapStateToProps, { getDiscounts, deleteDiscountForm })(DiscountsList)
