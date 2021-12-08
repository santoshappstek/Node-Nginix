import React, { Component } from 'react';
import { connect } from 'react-redux';
import { photogalleryData, downloadImage, deletePhotoForm, Allusersphotos } from '../../Store/photogallery/photogalleryaction';
import Icon from "react-crud-icons";
import ReactPagenate from 'react-paginate';
import { Button, Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import HttpService from '../../Services/HttpService';

const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };



class PhotoGallery extends Component {
  constructor() {
    super();
    this.images = [
      'https://bigsconnect.com/api/images/filename0-1625566401.jpg',
      'https://bigsconnect.com/api/images/filename0-1624523540.jpg',
      'https://bigsconnect.com/api/images/filename0-1624523526.jpg',
    ]
    this.state = {
      user_id: '',
      photos: [],
      spinner: true,
      offset: 0,
      perPage: 12,
      currentPage: 0,
      filterPhotos: [],
      slice: [],
      message: '',
      deleteResponce: {},
      allPhotos: [],
      GallerySearchList: [],
      GallerysearchInput: '',
      previewPhoto: '',
      photoDate: '',
      currentIndex: 0,
      photoname: '',
      separatedImages: [],
      separatedDate:[],
      separatedNames:[],
      slideDate:0,
      sildeName:'',
      chapter_id:''

    };
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
  }
  componentDidMount() {
   
    this.currentuser = JSON.parse(localStorage.getItem('userdata'));
    var user_id = this.currentuser.user_id;
    this.setState({ user_id: user_id });
    var data ={
      chapter_id:this.state.chapter_id
    }
    this.props.Allusersphotos(data);
  }

  componentWillReceiveProps(nextProps) {
    this.state.photos = nextProps.photoGallery.gallery_res.photos
    this.state.allPhotos = [].concat(...this.state.photos)
    this.setState({
      spinner: false,
      photos: nextProps.photoGallery.gallery_res.photos
    });
    if (this.state.allPhotos.length === 0) {
      this.setState({
        spinner: false,
        pageCount: 0,
        message: nextProps.photoGallery.gallery_res.message
      })
    }
    else {
      this.setState({
        spinner: false,
      });

      this.state.filterPhotos = this.state.allPhotos.slice(this.state.offset, this.state.offset + this.state.perPage)
      const postData = this.state.filterPhotos.map(pd => <React.Fragment>
      </React.Fragment>)
      this.setState({
        pageCount: Math.ceil(this.state.allPhotos.length / this.state.perPage),
        postData
      })
    }

    this.state.separatedImages = this.state.allPhotos?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
      item.photo_name
    //  item.createdDate
    ))
    this.state.separatedDate = this.state.allPhotos?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item=>(
      item.created_at
    ))
    this.state.separatedNames = this.state.allPhotos?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item=>(
      item.display_name
    ))
  
  
  }

  onDelete = (photo_id) => {
    swal({
      title: "Delete Photo",
      text: "Are you sure you want to delete this\n user photo?",
      buttons: ["No, Cancel", "Yes, Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          if (photo_id > -1) {
            this.state.allPhotos.splice(photo_id, 1);
          }
          HttpService.deletephoto({ photo_id })
            .then(response => {
              console.log('delete photo response', response.data);
              this.state.deleteResponce = response.data
              if (this.state.deleteResponce.status === 200) {
                var data = {
                  chapter_id: this.state.chapter_id
                }
            this.setState({
              spinner:false
            })
                this.state.allPhotos = ''
                this.currentuser = JSON.parse(localStorage.getItem('userdata'));
                var user_id = this.currentuser.user_id;
                this.setState({ user_id: user_id });
                this.props.Allusersphotos(data);
                swal({
                  title: this.state.deleteResponce.message,
                  icon: "success"
                });
              }
              else {
                this.setState({
                  spinner:false
                })
                swal({
                  title: this.state.deleteResponce.message,
                  icon: "error"
                });
              }
            })
            .catch(error => {
              this.setState({
                spinner:false
              })
              swal(error, {
                icon: 'error'
              });
              //  dispatch(notificationError());
            })
          this.setState({
            photos: this.state.allPhotos,
            spinner: false
          })
        }
      });
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
  receivedData() {
    this.state.slice = this.state.allPhotos.slice(this.state.offset, this.state.offset + this.state.perPage)
    const postData = this.state.slice.map(pd => <React.Fragment>
      <img src={pd.thumbnailUrl} alt="" />
    </React.Fragment>)
    this.setState({
      pageCount: Math.ceil(this.state.allPhotos.length / this.state.perPage),
      // postData
    })
    this.state.separatedImages = this.state.allPhotos?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
      item.photo_name
    //  item.createdDate
    ))
    this.state.separatedDate = this.state.allPhotos?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item=>(
      item.created_at
    ))
    this.state.separatedNames = this.state.allPhotos?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item=>(
      item.display_name
    ))
  }

  onDownload = (photo) => {
    var image_name = photo.replace(/^.*[\\\/]/, '');
    this.props.downloadImage({ image_name })
  }

  onPreviewImage = (photoname, createdDate, name,itemIndux) => {
    this.setState({
      previewPhoto: photoname,
      photoDate: createdDate,
      photoname: name,
     
    })
    this.state.currentIndex =itemIndux
    console.log('currentindex:- ',this.state.currentIndex)
  }

  goToPrevSlide = () => {
    const { currentIndex } = this.state;
    const newPointer = currentIndex === 0 ? this.state.separatedImages.length - 1 : currentIndex - 1;
    const newPrevslideDate = currentIndex === 0 ? this.state.separatedDate.length -1 : currentIndex -1
    const newPrevslideName = currentIndex === 0 ? this.state.separatedNames.length -1 : currentIndex -1
    this.setState({ currentIndex: newPointer ,slideDate:newPrevslideDate,sildeName:newPrevslideName});
  }


  goToNextSlide = () => {
    const { currentIndex } = this.state;
    const newPointer = currentIndex === this.state.separatedImages.length - 1 ? 0 : currentIndex + 1;
    const newNextSlideDate = currentIndex === this.state.separatedDate.length - 1 ? 0 : currentIndex + 1;
    const newNextSlideName = currentIndex === this.state.separatedNames.length - 1 ? 0 : currentIndex + 1;
    this.setState({ currentIndex: newPointer,slideDate: newNextSlideDate,sildeName:newNextSlideName });
  }


  searchHandler = (event) => {
    if (event.target.value.length == 0) {
      this.componentDidMount()
   //   this.props.Allusersphotos(this.state.user_id);
      this.setState({ spinner: false, GallerySearchList: [], GallerysearchInput: '' })
    }
    else {
      let searcjQery = event.target.value,
        displayedSearch = this.state.allPhotos.filter((el) => {
          let searchValue = el.display_name;
          if (searchValue != null) {
            return searchValue.toLowerCase().indexOf(searcjQery.toLowerCase()) !== -1;

          }
        })
      if (displayedSearch.length > 0) {
          // this.state.GallerySearchList = displayedSearch
          // this.state.pageCount = Math.ceil(displayedSearch.length / this.state.perPage)
          // this.state.GallerysearchInput = event.target.value
        this.setState({ GallerySearchList: displayedSearch, pageCount: Math.ceil(displayedSearch.length / this.state.perPage), GallerysearchInput: event.target.value })
        this.state.separatedImages = this.state.GallerySearchList?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
          item.photo_name
        //  item.createdDate
        ))
        this.state.separatedDate = this.state.GallerySearchList?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item=>(
          item.created_at
        ))
        this.state.separatedNames = this.state.GallerySearchList?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item=>(
          item.display_name
        ))
    
      } else {

        this.setState({ GallerySearchList: [] })
      }
      //this.setState({ events: displayedSearch, pageCount: Math.ceil(displayedSearch.length / this.state.perPage) })
    }

   

  }
  render() {
    localStorage.setItem("activescreen", JSON.stringify('alluserphotogallery'));
    if(JSON.parse(localStorage.getItem('chapter_id'))!=null){
     this.state.chapter_id = JSON.parse(localStorage.getItem('chapter_id'))
    
    }
    
    return (
      <div className="container">
        <div className="head">
          <div >
            <div><h3 className="pagename">Photo Gallery</h3></div>
          </div>
          
          <div className="push">
            <div>
              <span style={{ position: 'absolute', padding: '15px', zIndex: '2', display: 'block', color: '#aaa' }} className="fa fa-search"></span>
              <input style={{ paddingLeft: '40px' }} type="text" className="form-control" placeholder="Search Name..." onChange={(e) => this.searchHandler(e)} />
            </div>
          </div>
        </div>
        <div className="box">
        <div  className="imgContainer photogallery-sec">
         
          <div style={{ margin: '5px' ,display:'flex',justifyContent:'center',width:'100%'}} className="float-center">
            {this.state.spinner && <Spinner
              animation="border"
              role="status" >
              <span className="sr-only">Loading...</span>
            </Spinner>}
          </div>
            <div style={{ margin: '30px',width:'100%'}} className="row">
              {
                this.state.GallerysearchInput ? this.state.GallerySearchList.length ? this.state.GallerySearchList?.slice(this.state.offset, this.state.offset + this.state.perPage).map((item,itemIndex) => (
                  <div className="col-md-3 displayicons-sec">
                    <img  onClick={() => this.onPreviewImage(item.photo_name, item.created_at, item.display_name,itemIndex)} style={{ border: "1px solid" }}
                      className="photogallery-img"
                      key={item.photo_id}
                      src={item.photo_name}
                      data-toggle="modal"
                      data-target="#myModal" />
                    <div className="modal" id="myModal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <img style={{ border: "1px solid" }}
                              className="modal-img-slider"
                              // key={item.photo_id}
                              src={this.state.separatedImages[this.state.currentIndex]} />
                          </div>
                        </div>
                      
                      </div>
                      <center> <div className="photocaption-content">
                          <span onClick={() => this.goToPrevSlide()} className="angleRight"><i class="fas fa-angle-left"></i></span>
                          <h4>{(new Date(this.state.separatedDate[this.state.currentIndex])).toLocaleDateString('en-US', DATE_OPTIONS) + " - " + this.state.separatedNames[this.state.currentIndex]}</h4>
                          <span onClick={() => this.goToNextSlide()} className="angleLeft"><i class="fas fa-angle-right"></i></span>
                        </div></center>
                    </div>
                  
                    <div className="img-ontop">
                      <Icon
                        name="download"
                        theme="light"
                        size="small"
                        id="download"
                        color="#fff"
                        className="svg-icons-upl"
                        onClick={() => this.onDownload(item.photo_name)}
                      />
                      <Icon
                        name="delete"
                        theme="light"
                        size="small"
                        onClick={() => this.onDelete(item.photo_id)}
                        className="svg-icons-del"
                      />
                    </div>
                    <div className="text-center userdata-sec mb-5">
                      <h9>{(new Date(item.created_at)).toLocaleDateString('en-US', DATE_OPTIONS)}</h9>
                      <br></br>
                      <h9><span className="pr-2"><i className="fa fa-user-o" aria-hidden="true"></i></span>{item.display_name}</h9>
                    </div>

                  </div>
                )) : <div style={{width:'125vh',justifyContent:'center',display:'flex'}}><h3>No Photos Found</h3></div> :
                  this.state.allPhotos.length ? this.state.allPhotos?.slice(this.state.offset, this.state.offset + this.state.perPage).map((item, itemIndux) =>
                    <div className="col-md-3 displayicons-sec">
                      <div data-toggle="modal"
                        data-target="#myModal">
                        <img onClick={() => this.onPreviewImage(item.photo_name, item.created_at, item.display_name,itemIndux)} style={{ border: "1px solid" }}
                          className="photogallery-img"
                          key={item.photo_id}
                          src={item.photo_name}/>
                      </div>
                      <div className="img-ontop">
                        <Icon
                          name="download"
                          theme="light"
                          size="small"
                          id="download"
                          className="svg-icons-upl"
                          /*onClick = { doSomething }*/
                          onClick={() => this.onDownload(item.photo_name)}
                        />
                        <Icon
                          name="delete"
                          theme="light"
                          size="small"
                          onClick={() => this.onDelete(item.photo_id)}
                          className="svg-icons-del"
                        />
                      </div>
                      <div className="text-center userdata-sec mb-5">
                        <h9>{(new Date(item.created_at)).toLocaleDateString('en-US', DATE_OPTIONS)}</h9>
                        <br></br>
                        <h9><span className="pr-2"><i className="fa fa-user-o" aria-hidden="true"></i></span>{item.display_name}</h9>
                      </div>
                      <div className="modal" id="myModal">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body">
                              <img style={{ border: "1px solid" }}
                                className="modal-img-slider"
                                // key={item.photo_id}
                                src={this.state.separatedImages[this.state.currentIndex]} />
                            </div>
                          </div>

                        </div>
                       <center> <div className="photocaption-content">
                          <span onClick={() => this.goToPrevSlide()} className="angleRight"><i class="fas fa-angle-left"></i></span>
                          <h4>{(new Date(this.state.separatedDate[this.state.currentIndex])).toLocaleDateString('en-US', DATE_OPTIONS) + " - " + this.state.separatedNames[this.state.currentIndex]}</h4>
                          <span onClick={() => this.goToNextSlide()} className="angleLeft"><i class="fas fa-angle-right"></i></span>
                        </div></center>
                      </div>
                    </div>
                  ) : <div style={{width:'125vh',justifyContent:'center',display:'flex'}}><h3>No Photos Found</h3></div>
              }
            </div>
            <div className="col-md-12 App">
              <div className="pagination">               
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export const mapStateToProps = (state) => ({
  photoGallery: state.photoGallery
});

export default connect(mapStateToProps, { photogalleryData, downloadImage, deletePhotoForm, Allusersphotos })(PhotoGallery)