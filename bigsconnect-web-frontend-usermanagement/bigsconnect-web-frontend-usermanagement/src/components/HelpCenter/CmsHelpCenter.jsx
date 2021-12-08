import React, { Component } from "react";
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { addChapterForm, chapterFetchInput } from '../../Store/chapters/addChaptersAction';
import Icon from "react-crud-icons";
import swal from 'sweetalert';
import HttpService from '../../Services/HttpService';
import { Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js'; //ContentState
import draftToHtml from 'draftjs-to-html';
var FormData = require('form-data');

const styles = {
    editor: {
        border: '0.5px solid lightgray',
        minHeight: '15em',
        left: '2935px',
        padding: "10px"
    }
};

class CmsHelpCenter extends Component {
    constructor() {
        super();
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        this.state = {
            editorState: EditorState.createEmpty(),
            input: {},
            Uid: '',
            active_status: '',
            category: '',
            title:'',
            description: '',
            chapter_id: '',
            spinner: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // this.currentuser = JSON.parse(localStorage.getItem('userdata'));
        // var user_id = this.currentuser.user_id;
        // this.setState({ Uid: user_id });

        if (this.props.location.state != null) {
            this.setState({
                chapter_id: this.props.location.state.detail.chapter_id,
                chapter_name: this.props.location.state.detail.chapter_name,
                description: this.props.location.state.detail.description,
                active_status: this.props.location.state.detail.active_status
            })
            // this.state.spinner = false
            // this.state.chapter_id = this.props.location.state.detail.chapter_id
            // this.state.chapter_name = this.props.location.state.detail.chapter_name
            // this.state.description = this.props.location.state.detail.description
        }

    }
    componentWillReceiveProps(nextProps) {
        this.state.spinner = false
    }
    handleChange = (e, key) => {
        let chaptersInput = {
            key: key,
            value: e.currentTarget.value
        }
        console.log('chaptersInput:- ', chaptersInput.value)

        if (key === 'active_status') {
            this.setState({
                active_status: e.currentTarget.value
            })
        }
        if (key === 'category') {
            this.setState({
                category: e.currentTarget.value
            })
        }
        if (key === 'title') {
            this.setState({
                title: e.currentTarget.value
            })
        }
        if (key === 'description') {
            this.setState({
                description: e.currentTarget.value
            })
        }
        
    }
    onEditorStateChange = (editorState) => {
        const currentContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        this.setState({
            editorState,
        });
        if (this.state.editorState !== null) {
            let eventInput = {
                key: "draftbody",
                value: this.state.editorState
            }
            //this.props.SendMessageInput(eventInput);
        }
        else {
            let eventInput = {
                key: "draftbody",
                value: ''
            }
            //this.props.SendMessageInput(eventInput);
        }

    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.state.spinner = true
        const { addchapter } = this.props
        const html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        this.state.description = html

        //const { Uid } = this.state

        if (this.props.location.state != null) {
            if (this.validator.allValid()) {
                var data = new FormData();


                data.append('category', this.state.category);
                data.append('title', this.state.title);
                data.append('description', this.state.description);
                data.append('active_status', this.state.active_status);
                HttpService.createHelpCenter(data)
                    .then(response => {
                        console.log('create help center ', response.data);
                        if (response.data.status === 200) {
                            this.state.spinner = false

                            swal({
                                text: "Data Added Successfully",
                                icon: "success",
                                closeOnEsc: false,
                                dangerMode: true,

                                closeOnClickOutside: false
                            })
                                .then((willDelete) => {

                                    if (willDelete) {
                                        // this.props.history.push({
                                        //     pathname: '/dashboard/Chapters/ChaptersList'
                                        // })
                                    }
                                });


                        }

                        else {
                            this.state.spinner = false
                            swal({
                                title: response.data.error,
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        swal({
                            title: "Something went wrong, Please try again after some time",
                            icon: "error"
                        });
                    })

            }
            else {
                this.state.spinner = false
                this.validator.showMessages();
            }
        }
        else {

            if (!this.validator.allValid()) {
                this.state.spinner = false
                this.validator.showMessages()
            }
            else {
                var data = new FormData();
                data.append('category', this.state.category);
                data.append('title', this.state.title);
                data.append('description', this.state.description);
                data.append('active_status', this.state.active_status);
                HttpService.createHelpCenter(data)
                    .then(response => {
                        console.log('add help response', response);
                        if (response.data.status == 200) {
                            this.state.spinner = false

                            swal({
                                text: "Data Added Successfully",
                                icon: "success",
                                closeOnEsc: false,
                                dangerMode: true,

                                closeOnClickOutside: false
                            })
                                .then((willDelete) => {

                                    if (willDelete) {
                                        // this.props.history.push({
                                        //     pathname: '/dashboard/Chapters/ChaptersList'
                                        // })
                                    }
                                });
                            this.chapterForm.reset();
                            this.setState({
                                active_status: '',
                                editorState: '',
                                title: '',
                                th: '',
                                active_status: '',
                            })
                            this.validator.hideMessages();
                        }

                        else {
                            swal({
                                icon: 'error',
                                text: response.data.error
                            })

                        }
                    })
                    .catch(error => {
                        swal({
                            icon: 'error',
                            text: "Something went wrong. Please try again."
                        })                    })





            }
        }
    };

    onCancel() {
        this.props.history.push('/dashboard/help_center');
    }

    onChapters() {
        this.props.history.push('/dashboard/Chapters/ChaptersList');
    }



    render() {
        this.currentuser = JSON.parse(localStorage.getItem('userdata'));
        this.state.Uid = this.currentuser.user.user_id;
        const { editorState } = this.state;

        //this.setState({ Uid: user_id });
        return (
            <div>
                <form className="form" ref={form => this.chapterForm = form} onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div className="row mt-3 mb-4">
                            <div className="col-md-6">
                                <div className="horizontal-container">
                                    <label className="label-discount" onClick={() => this.onChapters()}>Add Help Center Data</label>

                                </div>
                            </div>
                        </div>
                        <section className="newuser-sec">

                            <div className="row">
                                <div className="col-md-5">
                                    <div className="mb-3">
                                        <div>
                                            <label className="lehead" defaultValue={this.state.active_status}>Status<span>*</span></label>
                                        </div>

                                        <div style={{ marginLeft: '-15px' }} className="custom-control custom-radio custom-control-inline" >
                                            <input type="radio" className="radio" id="active_status" name="active_status" value="0" checked={this.state.active_status == '0'}
                                                onChange={(e) => this.handleChange(e, 'active_status')} onBlur={this.handleChange} />
                                            <label className="custom-control-label" htmlFor="active_status">Active</label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="radio" id="active_status_two" name="active_status" value="1" checked={this.state.active_status == '1'}
                                                onChange={(e) => this.handleChange(e, 'active_status')} onBlur={this.handleChange} />
                                            <label className="custom-control-label" htmlFor="active_status_two">In Active</label>
                                        </div>
                                        <span className="text-danger">{this.validator.message("active_status", this.state.active_status, "required")}</span>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <div className="form-group">
                                            <label className="lehead">Category:<span>*</span></label>
                                            <input

                                                className="form-control"
                                                type="text"
                                                onChange={(e) => this.handleChange(e, 'category')}
                                                defaultValue={this.state.category}
                                                onBlur={this.handleChange} />
                                            <span className="text-danger">{this.validator.message("category", this.state.category, "required")}</span>
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <div className="form-group">
                                            <label className="lehead">Title:<span>*</span></label>
                                            <input

                                                className="form-control"
                                                type="text"
                                                onChange={(e) => this.handleChange(e, 'title')}
                                                defaultValue={this.state.title}
                                                onBlur={this.handleChange} />
                                            <span className="text-danger">{this.validator.message("title", this.state.title, "required")}</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className='row'>
                                        <div className="col-sm-10">

                                            <div className="form-group">
                                                <label className="lehead">Description:*</label>
                                                <div
                                                    style={styles.editor}
                                                    onClick={this.focusEditor}>
                                                    <Editor
                                                        editorState={editorState}
                                                        placeholder=" Write Something... "
                                                        wrapperClassName="demo-wrapper"
                                                        editorClassName="demo-editor"
                                                        editorStyle={{ lineHeight: '75%' }}
                                                        onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
                                                    // onEditorStateChange={(ev)=> this.handleChange(ev,"body")}
                                                    />
                                                </div>
                                                {/* <span className="text-danger">{this.validator.message("draftbody", this.state.editorState, "required")}</span> */}
                                            </div>
                                        </div>
                                    </div>
                            <div>
                                {this.state.spinner && <Spinner
                                    animation="border"
                                    role="status" >
                                    <span className="sr-only">Loading...</span>
                                </Spinner>}

                            </div>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-info btn-success mt-1">Save</button>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="my-4">
                                        <div className="float-right cancel-sec">
                                            <button type="cancel" className="cancelbtnnew" onClick={() => this.onCancel()}>Cancel</button>
                                        </div>
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

export const mapStateToProps = (state) => {
    return {
        addchapter: state.addchapter
    }
}

export default connect(mapStateToProps, { addChapterForm, chapterFetchInput })(withRouter(CmsHelpCenter));
