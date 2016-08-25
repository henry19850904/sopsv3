
import DatepickerRange from '../commons/DatepickerRange.jsx';

class Typeform extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.RangeChange=this.RangeChange.bind(this);
        this.state={
            title:"",
            start:"",
            end:"",

            date:{start:"",
            end:""}
        }
    }
    handleSubmit(event){
        event.preventDefault();
        //输入验证

        var data = {  title:this.refs.title.value,
                "class":"event-success",url:"#",
                start:new Date(this.state.date.start).getTime()+"",
                end:new Date(this.state.date.end).getTime()+""
            }
        if(data.start>data.end||data.title==''){
            alert("开始时间不能大于结束时间");
            return false;
        }
        
        this.props.onFormSubmit(data);

        //组件内只做输入验证及数据准备，父控件提交数据
        return false;
    }

    handleChange(event){

    }
    RangeChange(date){
        console.log(JSON.stringify(date))
        this.setState(date);
    }
    componentDidMount(){
        // require.ensure([],function(){
        //     require('./libs/bs-datepicker/bootstrap-datepicker.css'); 
        //     require('./libs/bs-datepicker/bootstrap-datepicker'); 
        //     require('./libs/bs-datepicker/bootstrap-datepicker.zh-CN.min'); 
                
        //     $(".datepicker").datepicker({
        //         multidate: "d4",
        //         autoclose:true,
        //         format:"yyyy-mm-dd",
        //         language:"zh-CN"
        //     });
        //     $('.input-daterange input').each(function() {
        //         $(this).datepicker({
        //             weekStart: 1,  
        //             //startDate:new Date(), //开始时间，在这时间之前都不可选
        //             //endDate:'2016-08-12',//结束时间，在这时间之后都不可选
        //             format:"yyyy-mm-dd",
        //             autoclose: true, 
        //             todayBtn: 'linked', 	
        //             language: 'zh-CN'
        //         });
        //     });

        // })
        
    } 
    render(){
        return (
                <form className="form" onSubmit={this.handleSubmit}> 
                <div className="form-group">
                    <legend>添加</legend>
                </div>

                <div className="form-group"> 
                    <input ref="title" type="text" placeholder="事件名" className="form-control" onChange={this.handleChange.bind(this)} /> 
                </div> 
                <DatepickerRange valueChanged={this.RangeChange} />
                
                {/* move to DatepickerRange <div className="form-group"> 
                    <div className="input-group input-daterange">
                        <input ref="start" type="text" placeholder="开始日期" className="form-control" onChange={this.handleChange.bind(this)}/>
                        <span className="input-group-addon">至</span>
                        <input ref="end" type="text" placeholder="结束日期" className="form-control" onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>*/}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">添加</button>
                </div> 
            </form>
            )
        }
}
Typeform.propTypes = { onFormSubmit: React.PropTypes.func.isRequired };
Typeform.defaultProps = { onFormSubmit: function(res){} };

module.exports=Typeform;