import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { getChapters } from '../../Store/chapters/chapterListAction';
import ReactPagenate from 'react-paginate';
import { Button, Spinner } from 'react-bootstrap'
import '../../App.css'
import Edit from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';
import HttpService from '../../Services/HttpService';
import * as moment from 'moment';

class ChaptersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      offset: 0,
      perPage: 10,
      currentPage: 0,
      chapters: [],
      filterchapter: [],
      slice: [],
      deleteResponce: '',
      DefaultMessage:'',
      chapterSearchList: [],
      chapterSearchInput: ''
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      spinner:true
    })
    this.props.getChapters();
  }

  componentWillReceiveProps(nextProps) {
    this.state.chapters = nextProps.chaptersList.chapterslist.chapters_list

    if (this.state.chapters.length === 0) {
      this.setState({
        spinner: false,
        pageCount: 0,
        DefaultMessage:'No Chapters Found.'
      });
    }
    else {
      this.state.filterchapter = nextProps.chaptersList.chapterslist.chapters_list.slice(this.state.offset, this.state.offset + this.state.perPage)
      const postData = this.state.filterchapter.map(pd => <React.Fragment>
      </React.Fragment>)
      this.setState({
        spinner: false,
        pageCount: Math.ceil(this.state.chapters.length / this.state.perPage),
        postData
      });
    }

  }
  onnewChapter() {
    this.props.history.push({
      pathname: '/dashboard/Chapters/NewChapter'
    })
  }
  onEdit(item) {    
    this.props.history.push({
      pathname: '/dashboard/Chapters/NewChapter',
      state: { detail: item }
    })
  }
  onDelete = (chapter_id,index) =>{
    swal({
      title: "Delete Chapter",
      text: "Are you sure you want to delete this\n user discount?",     
      buttons: ["No, Cancel", "Yes, Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {         

          HttpService.deleteChapter({chapter_id})
            .then(response => {
              this.state.deleteResponce = response.data
              if (this.state.deleteResponce.status === 200) {
                if(this.state.deleteResponce.message=='Chapter was in use not able to delete'){
                  swal({
                    text: this.state.deleteResponce.message,
                    icon:'warning'                  
                  });
                }
                else{
                    
                  if(this.state.chapterSearchInput==''){
                    const newCountries = [...this.state.chapters];
                    newCountries.splice(index, 1);
                    this.setState({
                      chapters:newCountries
                    })
                  }
                  else{
                    const newCountries = [...this.state.chapterSearchList];
                    newCountries.splice(index, 1);
                    this.setState({
                      chapterSearchList:newCountries
                    })
                  }       
              
                  swal({
                    text: this.state.deleteResponce.message,
                    icon:'success'               
                  });
                }          
              }
              else {
                this.state.spinner = false
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
    this.state.slice = this.state.chapters.slice(this.state.offset, this.state.offset + this.state.perPage)
    const postData = this.state.slice.map(pd => <React.Fragment>
      <img src={pd.thumbnailUrl} alt="" />
    </React.Fragment>)

    this.setState({
      pageCount: Math.ceil(this.state.chapters.length / this.state.perPage),
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
    this.state.chapterSearchInput= event.target.value
    if (this.state.chapterSearchInput.length === 0) {
      this.componentDidMount()
      //this.props.getChapters();
      this.setState({ spinner: !this.state.spinner })
    }
    else {
      let searcjQery = event.target.value,
        displayedContacts = this.state.chapters.filter((el) => {
          let searchValue = el.chapter_name;
          return searchValue.toLowerCase().indexOf(searcjQery.toLowerCase()) !== -1;
        })

        if (displayedContacts.length > 0) {
          this.setState({ DefaultMessage:'',chapterSearchList: displayedContacts, pageCount: Math.ceil(displayedContacts.length / this.state.perPage) })
        }
        else {
         // this.state.chapterSearchList = []
          //this.state.DefaultMessage = 'No Chapters Found.'
          this.state.spinner = false
          this.setState({chapters:[],  chapterSearchList: [],DefaultMessage:'No Chapters Found.'})
        }
    }
  }


  render() {

    return (

      <div className="container">
        <div style={{ width: '100%', paddingTop: '20px' }}>
          <div style={{ width: '50%', float: 'left' }}>
            <h3 className="pagename mb-3">Chapters</h3>
          </div>

          <div style={{ width: '50%', float: 'right' }}>
            <div style={{ width: '100%', float: 'right' }}>
              <div style={{ width: '70%', float: 'left', paddingRight: '20px' }}>
                <span style={{ position: 'absolute', padding: '15px', zIndex: '2', display: 'block', color: '#aaa' }} className="fa fa-search"></span>
                <input style={{ paddingLeft: '40px' }} type="text" className="form-control" placeholder="Search chapter name..." onChange={(e) => this.searchHandler(e)} />

              </div>
              <div style={{ width: '30%', float: 'right' }}>
                <button type="button" className="btn btn-info btn-success mt-1" onClick={() => this.onnewChapter()}>New Chapter</button>
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
            {this.state.chapters.length>0 ?
              <div style={{ width: '103%' }} className="row">
                <div className="mb-3 col-12 text-center">
                  <div className="table-responsive">
                    <table id="dataTable">
                      <thead>
                       {this.state.chapters.length>0 ?  <tr>
                          <th>Chapter Name</th>
                          <th>Description</th>
                          <th>Created Date</th>
                          <th>Status</th>
                          <th></th>
                        </tr>:null
                        }
                      </thead>
                      <tbody>
                        {
                          
                         this.state.chapterSearchInput.length? this.state.chapterSearchList.length>0? this.state.chapterSearchList?.slice(this.state.offset, this.state.offset + this.state.perPage).map((item,index) => (
                            <tr key={item.chapter_id}>
                              <td> {item.chapter_name}</td>                            
                              <td> {item.description}</td>
                              <td>{moment(item.created_at).format('MM/DD/YYYY')}</td>
                              {item.active_status == '0' ? <td>Active</td> : <td>In Active</td>}
                              <td>
                                <div className="float-right">
                                  <span className="pr-2"
                                    name="edit"
                                    onClick={() => this.onEdit(item)}
                                  ><Edit /></span>
                                  <span
                                    name="remove"
                                    onClick={() => this.onDelete(item.chapter_id,index)}

                                  ><CloseIcon /></span>
                                </div>

                              </td>
                            </tr>
                          )):<div style={{ width: '100%' }}><h3 style={{ textAlign: 'center' }}>{this.state.DefaultMessage}</h3></div> :
                        this.state.chapters.length? this.state.chapters?.slice(this.state.offset, this.state.offset + this.state.perPage).map((item,index) => (
                          <tr key={item.chapter_id}>
                            <td> {item.chapter_name}</td>
                            <td> {item.description}</td>
                            <td>{moment(item.created_at).format('MM/DD/YYYY')}</td>
                            {item.active_status == '0' ? <td>Active</td> : <td>In Active</td>}
                            <td>
                              <div className="float-right">
                                <span className="pr-2"
                                  name="edit"
                                  onClick={() => this.onEdit(item)}
                                ><Edit /></span>
                                <span
                                  name="remove"
                                   onClick={() => this.onDelete(item.chapter_id,index)}
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
    chaptersList: state.chaptersList,
  }
}

export default connect(mapStateToProps, { getChapters })(ChaptersList)
