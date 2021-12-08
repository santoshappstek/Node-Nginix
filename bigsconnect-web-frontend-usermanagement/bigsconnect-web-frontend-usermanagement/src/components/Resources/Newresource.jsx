import React, { Component } from "react";
import { connect } from 'react-redux';
import swal from 'sweetalert';
import SimpleReactValidator from 'simple-react-validator';
import { addResourceForm, resourceFetchInput, editResourceForm } from '../../Store/resources/newResourceaction';
import { withRouter } from 'react-router-dom';

var FormData = require('form-data');

const currentuser = JSON.parse(localStorage.getItem('userdata'));



class Newresource extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    this.state = {        
        title: '',
        description:'',
        files: '',
        active_status: '',        
        image:null,
        chapter_id:''
    }    
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange = (e,key) => {  
   let resourceInput = {
    key: key,
      value: e.currentTarget.value
    }
    if (key==='active_status') {
      this.setState({
        active_status : e.currentTarget.value
      })
    }
    if (key==='title') {
      this.setState({
        title : e.currentTarget.value
      })
    }
     if (key==='description') {
      this.setState({
        description : e.currentTarget.value
      })
    }   
    this.props.resourceFetchInput(resourceInput);
   }

    componentDidMount() {    
      if(this.props.location.state != null){   
        this.setState({
          resource_id: this.props.location.state.detail.resource_id,
          title: this.props.location.state.detail.title,
          description: this.props.location.state.detail.description,
          files: this.props.location.state.detail.files,
          active_status: this.props.location.state.detail.active_status
      })                  
    }  
    }

  onChange(e) {
      this.setState({
        files: e.target.files[0],        
      })
  }

  handleSubmit (e){
      e.preventDefault();
      const { addResource } = this.props;
      if( this.validator.allValid())
      {
        var data = new FormData();
        data.append('title', addResource.resourceDetails.title);
        data.append('description', addResource.resourceDetails.description);
        data.append('active_status', addResource.resourceDetails.active_status);
        data.append('files', this.state.files);
        data.append('chapter_id',this.state.chapter_id);
        this.props.addResourceForm(data);

        swal({      
           text: "Resource added successfully",
           icon: "success",
           closeOnEsc:false,
           dangerMode: true,           
           closeOnClickOutside:false
         })
           .then((willDelete) => {    
             if (willDelete) {
               this.props.history.push({
                 pathname: '/dashboard/resources'
               })
             }
           });
        this.setState({
          title: '',
          description:'',
          files: '',
          active_status: '',        
          image:null    
        }) 
        this.resourceForm.reset();
      }
      else {
        this.validator.showMessages();          
      }
  }

  onCancel()
  {  
    this.props.history.push('/dashboard/resources');
    //this.resourceForm.reset();
  }
  componentWillReceiveProps(nextProps){
      const { history } = this.props;
      if (nextProps.addResource.resource_res.success === true){  
      }
      else if (nextProps.addResource.resource_res.success === false){
        swal('please fill the required fields');
      }
  }

  onResources()
  {
    this.props.history.push('/dashboard/resources');
  }

render() {

  if(JSON.parse(localStorage.getItem('chapter_id'))!=null){
    this.state.chapter_id= JSON.parse(localStorage.getItem('chapter_id'))
  
  }
  return (
    <div>
    <form className="form" ref={form => { this.resourceForm = form }}>
      <div className="container">
        <div className="row mt-3 mb-4">
              <div className="col-md-6">
              <div className="horizontal-container">
              <h3 className="pagename mb-3 resources-text" onClick={() => this.onResources()}>Resources</h3>
                  <i style={{ color: "#43425d", padding: "10px",marginBottom:'5px' }} class="fa fa-chevron-right" aria-hidden="true"></i>
                 
                     <div className="horizontal-container">
                     <h3 className="pagename mb-3">New Resource</h3>
                    </div>
                </div>
              </div>
          </div>
          <section className="newuser-sec">
              <div className="row">   
          <div className="col-md-6 mb-3">
             <div className="col-md-12">
          <div className="mb-3">
            <div>
                <label className="lehead" value={this.state.active_status}>Status<span>*</span></label>
            </div>
              <div style={{marginLeft:'-15px'}} className="custom-control custom-radio custom-control-inline" >
              <input type="radio" className="radio" id="active_status" 
              name="active_status" value="0"
                     onChange={(e) => this.handleChange(e, 'active_status')}/> 
                <label className="custom-control-label" htmlFor="active_status" defaultChecked>             
                      Active
                  </label>             
              </div>            
              <div className="custom-control custom-radio custom-control-inline"> 
              <input type="radio" className="radio" id="in_active_status" name="active_status" value="1"
                      onChange={(e) => this.handleChange(e, 'active_status')}/> 
                  <label className="custom-control-label" htmlFor="in_active_status">            
                      In Active
                  </label>
              </div>
              <span className="text-danger">{this.validator.message("active_status", this.state.active_status, "required")}</span>
            </div>  
           </div>  
          </div>  
        </div>  
        <div className="row">   
          <div className="col-md-6 mb-3">
             <div className="col-md-12">
                <div className="form-group">
                  <label className="lehead">Title:<span>*</span></label>
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    //value={this.state.title}
                    onChange={(e) => this.handleChange(e, 'title')} />
                  <span className="text-danger">{this.validator.message("title", this.state.title, "required")}</span>             
                </div>
               </div>          
              <div className="col-md-12">
                <div className="mb-3">
                  <div className="form-group">
                    <label className="lehead">Description:<span>*</span></label>
                        <textarea
                          name="description"
                          //value={this.state.description}
                          className="form-control"
                          rows="5"
                          onChange={(e) => this.handleChange(e, 'description')} />
                        <span className="text-danger">{this.validator.message("description", this.state.description, "required")}</span>
                  </div>
                </div>
              </div>   
               <div className="col-md-12">      
                 <div className="form-group">
                   <label className="lehead">Files:</label>
                    <input type="file"
                    name = "files"
                    className="form-control"
                    onChange={(e) => this.onChange(e, 'files')}/>                    
                </div>
              </div>
            </div>  
            </div> 
               <div className='row'>
                 <div className="col-md-6 my-4">
                  <button type="submit" className="btn btn-info btn-success mt-1" onClick={(e) => { this.handleSubmit(e) }}>Save</button>          
                </div>
                <div className="col-md-6  my-4">
                    <div className="float-right cancel-sec">
                        <button type="cancel" className="cancelbtnnew" onClick={() => this.onCancel()}>Cancel</button>
                    </div>
                </div>            
            </div>              
          </section>                    
        </div>              
      </form>
    </div>
  );
}
}

export const mapStateToProps = (state) =>{
    return{
      addResource: state.addResource
    }
  }
  
  export default connect(mapStateToProps, { addResourceForm, resourceFetchInput, editResourceForm }) (withRouter(Newresource));
