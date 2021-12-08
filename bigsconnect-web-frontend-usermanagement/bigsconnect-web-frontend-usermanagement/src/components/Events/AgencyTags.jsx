import React, { Component } from 'react';

class AgencyTags extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-md-12">
                    <div className="events-calender-sec">
                        <div className="row">
                            <div className="col-md-6">
                                <h3 className="pagename">Agency Sponsored Events Tags</h3>
                            </div>
                            <div  className="col-md-6">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div>
                                            <span style={{ position: 'absolute', padding: '15px', zIndex: '2', display: 'block', color: '#aaa' }} className="fa fa-search"></span>
                                            <input style={{ paddingLeft: '40px' }} type="text" className="form-control" placeholder="Search Events..." onChange={(e) => this.searchHandler(e)} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <button type="button" className="btn btn-info btn-success mt-1" >New Event</button>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div style={{ width: '100%', paddingTop: '20px', marginLeft: '0px' }} className="row">
              <div className="box">
                        <div style={{ display: 'flex', justifyContent: 'center' }} className="container">
                            <h3 style={{ display: 'flex', alignItems: 'center' }} className="pagename">No Data Available</h3>

                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AgencyTags;