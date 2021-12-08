import React, { Component } from 'react';
import { connect } from 'react-redux'
import swal from 'sweetalert';
import SimpleReactValidator from 'simple-react-validator';
import { EventFetchInput, addEventForm, editEventtForm, getEventTypes } from '../../Store/events/addEventAction';
import { NotificationLogList, myChapterList } from '../../Store/notifications/notificationLogaction';
import HttpService from './../../Services/HttpService'
import { Multiselect } from 'multiselect-react-dropdown';


class AddEvent extends Component {
    constructor() {
        super()
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        this.state = {
            input: {},
            Uid: '',
            eventtypeid: '',
            event_name: '',
            chapterid: '',
            description: '',
            prerequisites: '',
            disclaimer: '',
            start_date: "",
            end_date: '',
            noof_seats: '',
            available_seats: '',
            notes: '',
            paid_event: '',
            self_register: '',
            send_notifications: '',
            start_time: '',
            end_time: '',
            organized_by: '',
            myChaptersListData: [],
            userslogindetails: {},
            selectedChapterIds:[]

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        this.currentuser = JSON.parse(localStorage.getItem('userdata'));
        var user_id = this.currentuser.user_id;
        this.setState({ Uid: user_id });
        if (this.state.userslogindetails.user.usertypeid == 5 || this.state.userslogindetails.user.usertypeid == 4 ) {
            HttpService.chapterslist()
                .then(response => {
                    console.log('super and org chapter list:- ', response);
                    this.setState({
                        myChaptersListData: response.data.chapters_list
                    })

                })
                .catch(error => {

                })
        }
        else {
            HttpService.myChaptersService()
                .then(response => {
                    console.log('org chapter list:- ', response);
                    this.setState({
                        myChaptersListData: response.data.chapters_list
                    })

                })
                .catch(error => {
                    swal('Something went wrong. Please try again.')
                })
        }


        if (this.props.location.state != null) {

            this.state.organized_by = this.props.location.state.detail.organized_by
            this.state.event_id = this.props.location.state.detail.event_id
            this.state.eventtypeid = this.props.location.state.detail.eventtypeid
            this.state.event_name = this.props.location.state.detail.event_name
            this.state.selectedChapterIds = this.props.location.state.detail.chapterid?.map((ids) => {
                return {chapter_name:ids.chapter_name}
                
            })
            console.log('selectedChapterIds:- ',this.state.selectedChapterIds)
            this.state.description = this.props.location.state.detail.description
            this.state.prerequisites = this.props.location.state.detail.prerequisites
            this.state.disclaimer = this.props.location.state.detail.disclaimer
            this.state.start_date = this.props.location.state.detail.start_date
            this.state.end_date = this.props.location.state.detail.end_date
            this.state.noof_seats = this.props.location.state.detail.noof_seats
            this.state.available_seats = this.props.location.state.detail.available_seats
            this.state.notes = this.props.location.state.detail.notes
            this.state.paid_event = this.props.location.state.detail.paid_event
            this.state.self_register = this.props.location.state.detail.self_register
            this.state.send_notifications = this.props.location.state.detail.send_notifications
            this.state.active_status = this.props.location.state.detail.active_status
            this.state.start_time = this.props.location.state.detail.start_time
            this.state.end_time = this.props.location.state.detail.end_time

        }
    }

    handleChange = (e, key) => {
        const { Uid } = this.state
        let eventInput = {
            key: key,
            value: e.currentTarget.value
        }
        if (key === 'organized_by') {
            this.state.organized_by = e.currentTarget.value
            this.setState({
                organized_by: e.currentTarget.value
            })
        }
        if (key === 'eventtypeid') {
            this.setState({
                eventtypeid: e.currentTarget.value
            })
        }
        if (key === 'event_name') {
            this.setState({
                event_name: e.currentTarget.value
            })
        }
        if (key === 'description') {
            this.setState({
                description: e.currentTarget.value
            })
        }
        if (key === 'prerequisites') {
            this.setState({
                prerequisites: e.currentTarget.value
            })
        }
        if (key === 'start_date') {
            this.setState({
                start_date: e.currentTarget.value
            })
        }
        if (key === 'end_date') {
            this.setState({
                end_date: e.currentTarget.value
            })
        }
        if (key === 'noof_seats') {
            this.setState({
                noof_seats: e.currentTarget.value
            })
        }
        if (key === 'available_seats') {
            this.setState({
                available_seats: e.currentTarget.value
            })
        }
        if (key === 'start_time') {
            this.setState({
                start_time: e.currentTarget.value
            })
        }
        if (key === 'end_time') {
            this.setState({
                end_time: e.currentTarget.value
            })
        }
        if (key === 'paid_event') {
            this.setState({
                paid_event: e.currentTarget.value
            })
        }
        if (key === 'self_register') {
            this.setState({
                self_register: e.currentTarget.value
            })
        }
        if (key === 'send_notifications') {
            this.setState({
                send_notifications: e.currentTarget.value
            })
        }
        this.props.EventFetchInput(eventInput);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { addEvent } = this.props
        const { Uid } = this.state

        if (this.props.location.state != null) {
            if (this.validator.allValid()) {
                var data = {
                    organized_by: this.state.organized_by,
                    event_id: this.state.event_id,
                    eventtypeid: this.state.eventtypeid,
                    event_name: this.state.event_name,
                    chapterids: this.state.selectedChapterIds,
                    description: this.state.description,
                    prerequisites: this.state.prerequisites,
                    disclaimer: this.state.disclaimer,
                    start_date: this.state.start_date,
                    end_date: this.state.end_date,
                    start_time: this.state.start_time,
                    end_time: this.state.end_time,
                    noof_seats: this.state.noof_seats,
                    available_seats: this.state.available_seats,
                    notes: this.state.notes,
                    created_userid: Uid,
                    paid_event: this.state.paid_event,
                    self_register: this.state.self_register,
                    send_notifications: this.state.send_notifications,
                    active_status: 0
                };
                this.props.editEventtForm(data);

                swal({
                    text: "Event updated Successfully",
                    icon: "success",
                    closeOnEsc: false,
                    dangerMode: true,
                    closeOnClickOutside: false
                })
                    .then((willDelete) => {

                        if (willDelete) {
                            if (this.state.organized_by == 'bigs') {
                                this.props.history.push({
                                    pathname: '/dashboard/bigsconnect_community',
                                    state:'list'
                                })
                            }
                            else {
                                this.props.history.push({
                                    pathname: '/dashboard/agencysponsored_events',
                                    state:'list'
                                })
                            }

                        }
                    });
            }
            else {
                this.validator.showMessages();
            }
        }
        else {
            if (!this.validator.allValid()) {
                this.validator.showMessages();
            }
            else {
                var data = {
                    organized_by: addEvent.addEventDetails.organized_by,
                    eventtypeid: addEvent.addEventDetails.eventtypeid,
                    event_name: addEvent.addEventDetails.event_name,
                    //chapterid: addEvent.addEventDetails.chapterid,
                    description: addEvent.addEventDetails.description,
                    prerequisites: addEvent.addEventDetails.prerequisites,
                    disclaimer: addEvent.addEventDetails.disclaimer,
                    start_date: addEvent.addEventDetails.start_date,
                    end_date: addEvent.addEventDetails.end_date,
                    end_time: addEvent.addEventDetails.end_time,
                    start_time: addEvent.addEventDetails.start_time,
                    noof_seats: addEvent.addEventDetails.noof_seats,
                    available_seats: addEvent.addEventDetails.available_seats,
                    notes: addEvent.addEventDetails.notes,
                    created_userid: Uid,
                    paid_event: addEvent.addEventDetails.paid_event,
                    self_register: addEvent.addEventDetails.self_register,
                    send_notifications: addEvent.addEventDetails.send_notifications,
                    active_status: 0,
                    chapterids: this.state.selectedChapterIds
                };
                this.props.addEventForm(data);
                swal({
                    text: "Event Added Successfully",
                    icon: "success",
                    closeOnEsc: false,
                    dangerMode: true,
                    className: 'label-bold-gray',

                    closeOnClickOutside: false
                })
                    .then((willDelete) => {

                        if (willDelete) {
                            if (addEvent.addEventDetails.organized_by == 'bigs') {
                                this.props.history.push({
                                    pathname: '/dashboard/bigsconnect_community'
                                })
                            }
                            else {
                                this.props.history.push({
                                    pathname: '/dashboard/agencysponsored_events'
                                })
                            }
                        }
                    });
                this.eventform.reset();
                this.setState({
                    organized_by: '',
                    eventtypeid: '',
                    event_name: '',
                    chapterid: '',
                    description: '',
                    prerequisites: '',
                    disclaimer: '',
                    start_date: "",
                    end_date: '',
                    noof_seats: '',
                    available_seats: '',
                    notes: '',
                    paid_event: '',
                    self_register: '',
                    send_notifications: '',
                    start_time: "",
                    end_time: ""
                })
                this.validator.hideMessages();
            }
        }
    }

    onCancel() {
        this.props.history.push('/dashboard/agencysponsored_events');
    }
    onSelectItem = (selected, ii) => {
        const chapter_ids = this.state.selectedChapterIds;
        console.log('selected:- ', ii.chapter_id)

        if (chapter_ids == null) {
            this.state.selectedChapterIds = selected.map(id => (
                id.chapter_id
            ))
        }
        else {
            chapter_ids.push(+ii.chapter_id)
            this.state.selectedChapterIds = chapter_ids
            console.log('selectedChapterIds:- ', this.state.selectedChapterIds)

        }
    }
    onRemove = (removeusers, removeitem, yyy) => {
        const remove_chapter_ids = this.state.selectedChapterIds
        let index
        index = remove_chapter_ids.indexOf(-removeitem.chapter_id)
        remove_chapter_ids.splice(index, 1)
        this.state.selectedChapterIds = remove_chapter_ids
        console.log('removed ChapterIds:- ', this.state.selectedChapterIds)
    }
    componentWillReceiveProps(nextProps) {
        console.log("event nextprops:- ", nextProps)
        // if(nextProps.addEventDetails.addEvent_res.status == 200){
        //     console.log("Success:- ",nextProps.addEventDetails.addEvent_res)

        // }
        // else{
        //     console.log("failure:- ",nextProps.addEventDetails.error)

        // }
    }

    onEvents() {
        if (this.state.organized_by == 'agency') {
            this.props.history.push('/dashboard/agencysponsored_events');
        }
        else {
            this.props.history.push('/dashboard/bigsconnect_community');
        }
    }


    render() {
        this.state.userslogindetails = JSON.parse(localStorage.getItem('userdata'))

        return (
            <form className="form" ref={form => this.eventform = form}>
                <div className="container">
                    <div className="row mt-3 mb-4">
                        <div className="col-md-6">
                            <div className="horizontal-container">
                                <label className="label-discount" onClick={() => this.onEvents()}>Events</label>
                                <i style={{ color: "#43425d", margin: "10px" }} class="fa fa-chevron-right" aria-hidden="true"></i>
                                {this.props.location.state ?
                                    <label className="label-discount">Edit {this.state.event_name}</label> : <div className="horizontal-container">
                                        <label className="label-discount">New Event</label>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <section className="newuser-sec">
                        <div className="mb-3">
                            <div className="mb-3">
                                <label className="lehead">Event Organizers<span>*</span></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="radio" id="agency" name='organized_by' value='agency' checked={this.state.organized_by == 'agency'}
                                    onChange={(e) => this.handleChange(e, 'organized_by')} />
                                <label className="custom-control-label" htmlFor="agency"> &nbsp;Agency Sponsored Events  &nbsp;&nbsp; </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="radio" id="bigs" name="organized_by" value='bigs' checked={this.state.organized_by == 'bigs'}
                                    onChange={(e) => this.handleChange(e, 'organized_by')} />
                                <label className="custom-control-label" htmlFor="bigs"> &nbsp;BIGS Connect Community   &nbsp;&nbsp;</label>
                            </div>
                            <span className="text-danger">{this.validator.message("organized_by", this.state.organized_by, "required")}</span>
                        </div>
                        <div className="mb-3">
                            <div className="mb-3">
                                <label className="lehead">Event Type<span>*</span></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="radio" id="one" name='event_type' value='1' checked={this.state.eventtypeid == '1'}
                                    onChange={(e) => this.handleChange(e, 'eventtypeid')} />
                                <label className="custom-control-label" htmlFor="one"> &nbsp;One Time  &nbsp;&nbsp; </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="radio" id="recurring-two" name="event_type" value='2' checked={this.state.eventtypeid == '2'}
                                    onChange={(e) => this.handleChange(e, 'eventtypeid')} />
                                <label className="custom-control-label" htmlFor="recurring-two"> &nbsp;Recurring   &nbsp;&nbsp;</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="radio" id="multi-three" name="event_type" value='3' checked={this.state.eventtypeid == '3'}
                                    onChange={(e) => this.handleChange(e, 'eventtypeid')} />
                                <label className="custom-control-label" htmlFor="multi-three"> &nbsp;Multi-Day  &nbsp;&nbsp;</label>
                            </div>
                            <span className="text-danger">{this.validator.message("eventtypeid", this.state.eventtypeid, "required")}</span>
                        </div>
                        <div className="row pb-3">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">Event Name<span>*</span></label>
                                    <input type="text" className="form-control" name="event_name" defaultValue={this.state.event_name} onChange={(e) => this.handleChange(e, 'event_name')} />
                                </div>
                                <span className="text-danger">{this.validator.message("event_name", this.state.event_name, "required")}</span>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">Chapters<span></span></label>
                                    {/* <input type="text" className="form-control" name="chapter" defaultValue = {this.state.chapterid}  onChange={(e) => this.handleChange(e, 'chapterid')} /> */}
                                    {this.state.userslogindetails.user.usertypeid == 5 || this.state.userslogindetails.user.usertypeid == 4 ? <Multiselect
                                        placeholder="Select Chapters"
                                        options={this.state.myChaptersListData}
                                        displayValue={'chapter_name'}
                                        onSelect={this.onSelectItem}
                                        onRemove={this.onRemove}
                                        selectedValues={this.state.selectedChapterIds}
                                        style={{
                                            chips: {
                                                border: 'none',
                                                'border-radius': '15px'
                                                //  background: 'white'
                                            },
                                            multiselectContainer: {
                                                color: '#8f9199'
                                            },
                                            searchBox: {
                                                border: 'none',
                                                'border': '1px solid gray',
                                                'border-radius': '5px'
                                            }
                                        }}
                                    /> : <Multiselect
                                        placeholder="Select Chapters"
                                        options={this.state.myChaptersListData}
                                        displayValue={'chapter_name'}
                                        onSelect={this.onSelectItem}
                                        onRemove={this.onRemove}
                                        selectedValues={this.state.chapterid}
                                        style={{
                                            chips: {
                                                border: 'none',
                                                'border-radius': '15px'
                                                //  background: 'white'
                                            },
                                            multiselectContainer: {
                                                color: '#8f9199'
                                            },
                                            searchBox: {
                                                border: 'none',
                                                'border': '1px solid gray',
                                                'border-radius': '5px'
                                            }
                                        }}
                                    />}


                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">Description<span>*</span></label>
                                    <textarea className="form-control" name="description" defaultValue={this.state.description} onChange={(e) => { this.handleChange(e, 'description') }} />
                                </div>
                                <span className="text-danger">{this.validator.message("description", this.state.description, "required")}</span>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">Prerequisites<span>*</span></label>
                                    <textarea className="form-control" name="prerequisites" defaultValue={this.state.prerequisites} onChange={(e) => { this.handleChange(e, 'prerequisites') }} />
                                </div>
                                <span className="text-danger">{this.validator.message("prerequisites", this.state.prerequisites, "required")}</span>
                            </div>
                        </div>

                        <div className="row pb-3">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">Disclaimer<span></span></label>
                                    <textarea className="form-control" name="disclaimer" defaultValue={this.state.disclaimer} onChange={(e) => { this.handleChange(e, 'disclaimer') }} />
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">Start Date<span>*</span> </label>
                                    <input
                                        type="Date"
                                        name="start_date"
                                        defaultValue={this.state.start_date}
                                        className="form-control"
                                        onChange={(e) => this.handleChange(e, 'start_date')} />
                                    <span className="text-danger">{this.validator.message("start_date", this.state.start_date, "required")}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">End Date<span>*</span></label>
                                    <input type="date" name="end_date"
                                        defaultValue={this.state.end_date}
                                        className="form-control"
                                        onChange={(e) => this.handleChange(e, 'end_date')} />
                                    <span className="text-danger">{this.validator.message("end_date", this.state.end_date, "required")}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-3">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">Start Time<span>*</span></label>
                                    <input
                                        type="time"
                                        id="appt"
                                        name="start_time"
                                        className="form-control"
                                        defaultValue={this.state.start_time}
                                        onChange={(e) => this.handleChange(e, 'start_time')} />
                                    <span className="text-danger">{this.validator.message("start_time", this.state.start_time, "required")}</span>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">End Time<span>*</span></label>
                                    <input
                                        type="time"
                                        id="appt"
                                        name="end_time"
                                        className="form-control"
                                        defaultValue={this.state.end_time}
                                        onChange={(e) => this.handleChange(e, 'end_time')} />
                                    <span className="text-danger">{this.validator.message("end_time", this.state.end_time, "required")}</span>
                                </div>

                            </div>
                        </div>
                        <div className="row pb-3">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">Number of seats<span>*</span></label>
                                    <input type="number" className="form-control" name="no_of_seats" defaultValue={this.state.noof_seats} onChange={(e) => this.handleChange(e, 'noof_seats')} />
                                    <span className="text-danger">{this.validator.message("noof_seats", this.state.noof_seats, "required")}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">Available seats<span>*</span></label>
                                    <input type="number" className="form-control" name="available_seats" defaultValue={this.state.available_seats} onChange={(e) => this.handleChange(e, "available_seats")}></input>
                                    <span className="text-danger">{this.validator.message("available_seats", this.state.available_seats, "required")}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lehead">Notes<span></span></label>
                                    <textarea className="form-control" name="notes" defaultValue={this.state.notes} onChange={(e) => this.handleChange(e, "notes")}></textarea>
                                </div>
                            </div>
                            <div className="col-md-3">
                            </div>
                        </div>
                        <div className="row pb-3">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <div className="mb-3">
                                        <div>
                                            <label className="lehead">Paid Event<span>*</span></label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                className="radio"
                                                name='paid_event'
                                                value='0'
                                                checked={this.state.paid_event == '0'}
                                                id="paidevent-yes"
                                                onChange={(e) => this.handleChange(e, 'paid_event')} />
                                            <label className="custom-control-label" htmlFor="paidevent-yes"> &nbsp;Yes &nbsp;&nbsp; </label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                className="radio"
                                                name="paid_event"
                                                value='1'
                                                checked={this.state.paid_event == '1'}
                                                id="paidevent-no"
                                                onChange={(e) => this.handleChange(e, 'paid_event')} />
                                            <label className="custom-control-label" htmlFor="paidevent-no"> &nbsp;No &nbsp;&nbsp;</label>
                                        </div>
                                        <span className="text-danger">{this.validator.message("paid_event", this.state.paid_event, "required")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="form-group">
                                    <div>
                                        <label className="lehead">Send Notification<span>*</span></label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input
                                            type="radio"
                                            className="radio"
                                            id="noti-test"
                                            name='send_yes'
                                            value='0'
                                            checked={this.state.send_notifications == '0'}
                                            onChange={(e) => this.handleChange(e, 'send_notifications')} />
                                        <label className="custom-control-label" htmlFor="noti-test"> &nbsp;Yes &nbsp;&nbsp;</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input
                                            type="radio"
                                            className="radio"
                                            id="notify-no"
                                            name="send_no"
                                            value='1'
                                            checked={this.state.send_notifications == '1'}
                                            onChange={(e) => this.handleChange(e, 'send_notifications')} />
                                        <label className="custom-control-label" for="notify-no"> &nbsp;No &nbsp;&nbsp;</label>
                                    </div>
                                    <span className="text-danger">{this.validator.message("send_notifications", this.state.send_notifications, "required")}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <div>
                                        <label className="lehead">Self Register<span>*</span></label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio"
                                            className="radio"
                                            id="register-yes"
                                            name='self_register'
                                            value='0'
                                            checked={this.state.self_register == '0'}
                                            onChange={(e) => this.handleChange(e, 'self_register')} />
                                        <label className="custom-control-label" for="register-yes"> &nbsp;Yes &nbsp;&nbsp;</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input
                                            type="radio"
                                            className="radio"
                                            id="register-no"
                                            name="self_register"
                                            value='1'
                                            checked={this.state.self_register == '1'}
                                            onChange={(e) => this.handleChange(e, 'self_register')} />
                                        <label className="custom-control-label" for="register-no">&nbsp;No &nbsp;&nbsp;</label>
                                    </div>
                                    <span className="text-danger">{this.validator.message("self_register", this.state.self_register, "required")}</span>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-6 my-4">
                                <button type="submit" className="btn btn-info btn-success mt-1" onClick={this.handleSubmit}>Save</button>
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
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        addEvent: state.addEvent
    }
}

export default connect(mapStateToProps, {
    addEventForm,
    EventFetchInput,
    editEventtForm,
    getEventTypes,
    NotificationLogList,
    myChapterList
})(AddEvent);

