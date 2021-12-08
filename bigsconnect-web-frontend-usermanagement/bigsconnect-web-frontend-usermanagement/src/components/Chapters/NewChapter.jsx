import React, { Component } from "react";
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { addChapterForm, chapterFetchInput } from '../../Store/chapters/addChaptersAction';
import Icon from "react-crud-icons";
import swal from 'sweetalert';
import HttpService from '../../Services/HttpService';
import { Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

var FormData = require('form-data');

class NewChapter extends Component {
    constructor() {
        super();
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        this.state = {
            input: {},
            Uid: '',
            active_status: '',
            chapter_name: '',
            description: '',
            chapter_id: '',
            spinner: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        if (this.props.location.state != null) {
            this.setState({
                chapter_id: this.props.location.state.detail.chapter_id,
                chapter_name: this.props.location.state.detail.chapter_name,
                description: this.props.location.state.detail.description,
                active_status: this.props.location.state.detail.active_status
            })
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
        if (key === 'active_status') {
            this.setState({
                active_status: e.currentTarget.value
            })
        }
        var fd = new FormData();
        for (var key in chaptersInput) {
            if (chaptersInput[key] == "chapter_name") {             
                this.state.chapter_name = chaptersInput.value
            }
            else if (chaptersInput[key] == "description") {
                this.setState({
                    description: chaptersInput.value
                })
            }

        }
        this.props.chapterFetchInput(chaptersInput);
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.state.spinner = true
        const { addchapter } = this.props
        if (this.props.location.state != null) {
            if (this.validator.allValid()) {
                var data = new FormData();
                data.append('chapter_name', this.state.chapter_name);
                data.append('description', this.state.description);
                data.append('chapter_id', this.state.chapter_id);
                data.append('active_status', this.state.active_status);
                HttpService.editChapter(data)
                    .then(response => {
                        if (response.data.status === 200) {
                            this.state.spinner = false

                            swal({
                                text: "Chapter Updated Successfully",
                                icon: "success",
                                closeOnEsc: false,
                                dangerMode: true,

                                closeOnClickOutside: false
                            })
                                .then((willDelete) => {

                                    if (willDelete) {
                                        this.props.history.push({
                                            pathname: '/dashboard/Chapters/ChaptersList'
                                        })
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
                data.append('chapter_name', addchapter.chapterDetails.chapter_name);
                data.append('description', addchapter.chapterDetails.description);
                data.append('created_by', this.state.Uid);
                data.append('active_status', this.state.active_status);

                // this.props.addChapterForm(data);
                HttpService.addChapterservice(data)
                    .then(response => {
                        if (response.data.status == 200) {
                            this.state.spinner = false

                            swal({
                                text: "Chapter Added Successfully",
                                icon: "success",
                                closeOnEsc: false,
                                dangerMode: true,

                                closeOnClickOutside: false
                            })
                                .then((willDelete) => {

                                    if (willDelete) {
                                        this.props.history.push({
                                            pathname: '/dashboard/Chapters/ChaptersList'
                                        })
                                    }
                                });
                            this.chapterForm.reset();
                            this.setState({
                                active_status: '',
                                program_name: '',
                                partner_name: '',
                                description: '',
                                start_date: '',
                                end_date: ''
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
                            text:"Something went wrong, Please try agian!"
                        })
                    })





            }
        }
    };

    onCancel() {
        this.props.history.push('/dashboard/Chapters/ChaptersList');
    }

    onChapters() {
        this.props.history.push('/dashboard/Chapters/ChaptersList');
    }

    render() {
        this.currentuser = JSON.parse(localStorage.getItem('userdata'));
        this.state.Uid = this.currentuser.user.user_id;
        return (
            <div>
                <form className="form" ref={form => this.chapterForm = form} onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div className="row mt-3 mb-4">
                            <div className="col-md-6">
                                <div className="horizontal-container">
                                    <label className="label-discount" onClick={() => this.onChapters()}>Chapters</label>
                                    <i style={{ color: "#43425d", margin: "10px" }} class="fa fa-chevron-right" aria-hidden="true"></i>
                                    {!this.props.location.state ?
                                        <label className="label-discount">New Chapter</label> : <div className="horizontal-container">
                                            <label className="label-discount">Edit {this.state.program_name}</label>
                                        </div>}
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
                                            <label className="lehead">Chapter Name:<span>*</span></label>
                                            <input

                                                className="form-control"
                                                type="text"
                                                onChange={(e) => this.handleChange(e, 'chapter_name')}
                                                defaultValue={this.state.chapter_name}
                                                onBlur={this.handleChange} />
                                            <span className="text-danger">{this.validator.message("chapter_name", this.state.chapter_name, "required")}</span>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="form-group">
                                            <label className="lehead">Chapter Description:*</label>
                                            <textarea
                                                defaultValue={this.state.description}
                                                className="form-control"
                                                onChange={(e) => this.handleChange(e, 'description')} />
                                            <span className="text-danger">{this.validator.message("description", this.state.description, "required")}</span>
                                        </div>
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

export default connect(mapStateToProps, { addChapterForm, chapterFetchInput })(withRouter(NewChapter));
