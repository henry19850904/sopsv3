import EventList from './EventList.jsx';
import Typeform from './Typeform.jsx';

require('./libs/calendar.css');
 
var inlineStyle={height:' 400px'}

const CHeader = (props) =>  { 
    return (
        <div className="page-header">
            <div className="pull-right form-inline">
                <div className="btn-group">
                    <button className="btn btn-primary" data-calendar-nav="prev">{'<<'} 向前</button>
                    <button className="btn btn-default" data-calendar-nav="today">今天</button>
                    <button className="btn btn-primary" data-calendar-nav="next">向后 {'>>'}</button>
                </div>
            </div>
            <h3>{props.name}</h3>
            <small>{props.name}</small>
        </div>
    )
}
 
 
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
}; 

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

var calendar = class  extends React.Component {
    constructor(props){
        super(props);
        var self= this; 
        this.updateItems=this.updateItems.bind(this);

        this.state= {
            options: {
                events_source: '/sopsapi/odata/Calendars',
                view: 'month',
             //   tmpl_path: 'tmpls/',
            //    tmpl_cache: false,
                language:"zh-CN",
            //  day: '2013-03-12',
                onAfterEventsLoad: function(events) {
                    if (!events) {
                        return;
                    } 
                    self.setState({items:events,loading:false });
                },
                onAfterViewLoad: function(view) {
                    self.setState({title:this.getTitle()}) 
                },
                classes: {
                    months: {general: 'label'}
                },
                views: {
                    year: {slide_events: 0,enable: 0},
                    month: {slide_events: 1,enable: 1},
                    week: {enable: 0},
                    day: {enable: 0}
                },
                merge_holidays: false,
                display_week_numbers: false,
                weekbox: false,
                templates:{
                    day:require("./tmpls/day.html"),
                    month:require("./tmpls/month.html"),
                    'month-day':require("./tmpls/month-day.html"),
                    week:require("./tmpls/week.html"),
                    'week-days':require("./tmpls/week-days.html"),
                    year:require("./tmpls/year.html"),
                    'year-month':require("./tmpls/year-month.html"),
                    "events-list":require("./tmpls/events-list.html")
                }
            },
            items:[],
            loading:true
        };

    }
    componentDidMount() {
        var options = this.state.options;
        jQuery.support.cors = true;
        var self=this;

        require.ensure([], function() {
 
            require('imports?this=>window!./libs/jstz.min.js');
            require('imports?_=underscore!./libs/calendar');
            require('./libs/calendar.zh-cn.js')
 

            window.cal = $(self.refs.placeholder).calendar(options);

            $('.btn-group button[data-calendar-nav]').each(function() {
                var $this = $(this);
                $this.click(function() {
                    cal.navigate($this.data('calendar-nav'));
                    return false;
                });
            });
 
        });
    }
 
    updateItems(data){
        var self =this;
        //验证代码 
        $.ajax({
            type:"POST",
            contentType: "application/json",
            url:"/sopsapi/odata/Calendars",
            data:JSON.stringify(data),
            success:(function(res){  
                cal.view();
            })
        });

    }
 
    render() { 
            return (
                <div> 
                        <CHeader name={this.state.title}/> 
                        <div className="col-md-8">
                            <div ref="placeholder" id="calendar">
                             
                            </div>
                        </div>
                        <div className="col-md-4">
                            <EventList items={this.state.items} fnDelete="deleteItem" />

                            <Typeform onFormSubmit={this.updateItems} /> 
                        </div>
                        <div className="clearfix"></div>
    
                </div>
            )
        
    }
}

module.exports=calendar;
