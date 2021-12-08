import React, { Component } from 'react';
import { connect } from 'react-redux';
import { photogalleryData, deletePhotoForm } from '../../Store/photogallery/photogalleryaction';
import "./Imagestyle.css";
import Icon from "react-crud-icons";
import { Button, Spinner } from 'react-bootstrap'
import ReactPagenate from 'react-paginate';
import swal from 'sweetalert';
import HttpService from '../../Services/HttpService';

const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

class UserPhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      photos: [],
      spinner: true,
      offset: 0,
      perPage: 10,
      currentPage: 0,
      slice: [],
      filterPhotos: [],
      message: '',
      deleteResponce: {}
    }; 
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
            this.state.photos.splice(photo_id, 1);
          }
          HttpService.deletephoto({ photo_id })
            .then(response => {
              console.log('delete photo response', response.data);
              this.state.deleteResponce = response.data
              if (this.state.deleteResponce.status === 200) {
                this.state.spinner = true
                this.state.photos = ''
                var user_id = this.props.userId;
                this.setState({ user_id: user_id });
                this.props.photogalleryData({ user_id });
                swal({
                  title: this.state.deleteResponce.message,
                  icon: "success"
                });
              }
              else {
                this.state.spinner = true
                swal({
                  title: this.state.deleteResponce.message,
                  icon: "error"
                });
              }
              //   dispatch(deletephotofor(response.data));
            })
            .catch(error => {
              this.state.spinner = true
              swal(error, {
                icon: 'error'
              });
              //  dispatch(notificationError());
            })

          this.setState({
            spinner: !this.state.spinner
          });

        }
      });
  }

  onDownload = (photo) => {
    console.log('de', photo);
    var element = document.createElement("a");
    var file = new Blob(
      [
        photo
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = photo;
    element.click();
  }

  componentDidMount() {
    var user_id = this.props.userId;
    this.setState({ user_id: user_id });
    this.props.photogalleryData({ user_id });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      spinner: !this.state.spinner,
      photos: nextProps.photoGallery.gallery_res.photos
    });

    if (this.state.photos.length === 0) {
      this.setState({
        spinner: !this.state.spinner,
        pageCount: 0,
        message: nextProps.photoGallery.gallery_res.message
      })
    }
    else {
      this.setState({
        spinner: true,
      });

      this.state.filterPhotos = nextProps.photoGallery.gallery_res.photos.slice(this.state.offset, this.state.offset + this.state.perPage)
      const postData = this.state.filterPhotos.map(pd => <React.Fragment>

      </React.Fragment>)
      this.setState({
        pageCount: Math.ceil(this.state.photos.length / this.state.perPage),
        postData
      })
    }
  }

  receivedData() {
    this.state.slice = this.state.photos.slice(this.state.offset, this.state.offset + this.state.perPage)
    const postData = this.state.slice.map(pd => <React.Fragment>
      <img src={pd.thumbnailUrl} alt="" />
    </React.Fragment>)
    this.setState({
      pageCount: Math.ceil(this.state.photos.length / this.state.perPage),
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
    });
  };
  render() {

    if (this.state.photos.length === 0) {
      return (

          <div style={{height:'100vh'}} className="App">
            <div>
              {this.state.spinner && <Spinner
                animation="border"
                role="status" >
                <span className="sr-only">Loading...</span>
              </Spinner>}
            </div>
            <h3  className="pagename">{this.state.message}</h3>
          </div>
      
      )
    }
    else {

      return (
        <div style={{ marginTop: '-40px' }} className="tabs-photgallery-sec">
          <div className="container">
            {/* <h1 className="pagename">Photo Gallery</h1>                 */}
            <div className="imgContainer photogallery-sec">
              <div className="row" style={{width: '100%'}}>
                {/* {this.props.photoGallery.gallery_res.photos?.map(item => ( */}
                {
                  this.state.photos?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
                    //   { this.state.photos.length > 0 ? this.state.photos.map(function(photos)  {
                    // return (  
                    this.state.photos < 0 ? (<p>no images</p>) : (
                      <div className="col-md-4 displayicons-sec">
                        <img className="photogallery-img" key={item.photo_id} src={item.photo_name} />
                        <div className="img-ontop">
                          <a
                            href={item.photo_name}
                            download
                            onClick={() => this.onDownload(item.photo_name)}
                          />
                          <Icon
                            name="download"
                            theme="light"
                            size="small"
                            className="svg-icons-upl"
                            /*onClick = { doSomething }*/
                            onClick={() => this.onDownload(item.photo_name)}
                          />
                          <Icon
                            name="delete"
                            theme="light"
                            size="small"
                            className="svg-icons-del"
                            onClick={() => this.onDelete(item.photo_id)}
                          />
                        </div>
                        <div className="text-center userdata-sec mb-5">
                          <p>{(new Date(item.created_at)).toLocaleDateString('en-US', DATE_OPTIONS)}</p>
                        </div>
                      </div>)
                  ))}
              </div>
              <div>
                {this.state.spinner && <Spinner
                  animation="border"
                  role="status" >
                  <span className="sr-only">Loading...</span>
                </Spinner>}

              </div>

            </div>

          </div>
          <div className="App">
            <div className="pagination">
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
            </div>

          </div>
        </div>
      )
    }
  }
}

export const mapStateToProps = (state) => ({
  photoGallery: state.photoGallery
});

export default connect(mapStateToProps, { photogalleryData, deletePhotoForm })(UserPhotoGallery)