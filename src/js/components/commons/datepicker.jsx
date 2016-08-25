
require('./bs-datepicker/bootstrap-datepicker.css'); 
require('./bs-datepicker/bootstrap-datepicker'); 
require('./bs-datepicker/bootstrap-datepicker.zh-CN.min'); 

class Datepicker extends React.Component{
    constructor(props) {
        super(props);
        this.state = { "loading":false }; 
    }
    componentDidMount() {
        
        $(".datepicker").datepicker({
            multidate: "d4",
            autoclose:true,
            format:"yyyy-mm-dd",
            language:"zh-CN"
        });
    }
    render(){
            return (<input {...this.props} type="text" className="datepicker form-control" />)
    }
}

export default Datepicker;

