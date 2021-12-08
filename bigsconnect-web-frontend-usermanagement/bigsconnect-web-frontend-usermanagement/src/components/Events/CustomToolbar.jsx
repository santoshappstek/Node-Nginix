import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import AgencySponsored from './AgencySponsored';

class CustomToolBar extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      activeScreen:''
    }
  }

  handleChange = (event) => {
    console.log('selected:- ',event.target.value)
   if(event.target.value=='list'){
   this.onListView(event.target.value)
   }
   else{
    this.onListView(event.target.value)
   }

  
  };
  onListView (e){
    this.setState({
      activeScreen: e,
       })
   }
  render() {
    const { view, views, onNavigate, label } = this.props;
    return (
      <Toolbar style={{ padding: '0px' }}>
          
          <div className="col-12 p-0" style={{ display: 'flex', alignItems: 'center' }}>              
            <div className="col-md-4 pl-0">     
            {/* <select style={{padding:'5px', border:'1px solid #D7DAE2',borderRadius:'4px'}} className="cal-dpdwn">
                      <option> Calendar View</option>
                      <option>List View</option> 
            </select>                                   */}
                    <select onChange={(e)=>this.handleChange(e)} style={{padding:'5px', border:'1px solid #D7DAE2',borderRadius:'4px'}} className="cal-dpdwn">
                      <option  selected value="calender" > Calendar View</option>
                      <option value="list">List View</option>                     
                    </select>
                    
            </div>
            <div className="col-md-4 ">
                <div className="text-center">
                    <IconButton onClick={() => onNavigate('PREV')}><i style={{border:'1px solid #D7DAE2', borderRadius:'2px', padding:'5px',color:'lightgray'}} class="fa fa-chevron-left" aria-hidden="true"></i></IconButton>
                    <Typography variant="headline" style={{ textTransform: 'capitalize', width: '100%' }}>{label}</Typography>
                    <IconButton onClick={() => onNavigate('NEXT')}><i style={{border:'1px solid #D7DAE2', borderRadius:'2px', padding:'5px',color:'lightgray'}} class="fa fa-chevron-right" aria-hidden="true"></i></IconButton>
                </div>
            </div>    
            <div className="col-md-4 text-right pr-0">
                <span className="today-sec" onClick={() => onNavigate('TODAY')}>Today</span>
            </div>
            {
              // <AgencySponsored activescreen = {this.state.activeScreen}></AgencySponsored>
                    // this.state.activeScreen == 'calender' ?
                    //   <AgencySponsored />
                    //   : this.state.activeScreen == 'list' ?
                    //     <AgencySponsoredListView />                      
                    //     : null
                  }
        </div>
        
      </Toolbar>
    );
  }
}

CustomToolBar.propTypes = {
  onView: PropTypes.func,
  onNavigate: PropTypes.func,
  label: PropTypes.string,
  view: PropTypes.string,
  views: PropTypes.array,

};

export default CustomToolBar;
