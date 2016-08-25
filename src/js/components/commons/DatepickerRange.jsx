
require('./bs-datepicker/bootstrap-datepicker.css'); 
require('./bs-datepicker/bootstrap-datepicker'); 
require('./bs-datepicker/bootstrap-datepicker.zh-CN.min'); 

class DatepickerRange extends React.Component{
    constructor(props) {
        super(props);
        this.state = { };
    }
    componentDidMount() {
          $('.input-daterange input').each(function() {
                $(this).datepicker({
                    weekStart: 1,  
                    //startDate:new Date(), //开始时间，在这时间之前都不可选
                    //endDate:'2016-08-12',//结束时间，在这时间之后都不可选
                    format:"yyyy-mm-dd",
                    autoclose: true, 
                    todayBtn: 'linked', 	
                    language: 'zh-CN'
                });
            });
            var self=this;
            $('.input-daterange input').change(function(){
                    self.props.valueChanged({
                        date:{
                        start:self.refs.start.value,
                        end:self.refs.end.value}
                    })
            })
    }
    handleChange(event){
        if(this.refs.start.value||this.refs.end.value)
            this.props.valueChanged({
                date:{
                start:this.refs.start.value,
                end:this.refs.end.value}
            })

    }
    render(){
            return (
                <div className="form-group"> 
                    <div className="input-group input-daterange">
                        <input ref="start" type="text" placeholder="开始日期" className="form-control"/>
                        <span className="input-group-addon">至</span>
                        <input ref="end" type="text" placeholder="结束日期" className="form-control"/>
                    </div>
                </div>)
    }
}

export default DatepickerRange;


                