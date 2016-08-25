
import Datatable from './Datatables/index'; 
import boc from './commons/boc.lib';


class Table extends React.Component {

    constructor(props) {
        super(props);
        var self =this;
        this.state = {
            table:null,
            // postData:function(a,b){
            //     alert('in');
            // },
        };
        this.state.settings = boc.sops.util.config;

        this.state.settings.columns= [{ "data": "Title"},
                            { "data": "ItemSeqCode"},
                            { "data": "SenderUserName"},
                            { "data": "SenderDisplayName"},
                            { "data": "CreatedTime"},
                            { "data": "UpdatedTime"},
                            { "data": "SenderBranchID"},
                            { "data": "SenderBranchName"},
                            { "data": "SenderProvinceBranchID"},
                            { "data": "ProductNames"},
                            { "data": "PriorityName"},
                            { "data": "CurrentStatus"}]
         this.state.settings.ajax.type= "POST"; 
    }
   
    getFilterParams(){
        return {
                UserName: "",
                Title: this.refs.title && this.refs.title.value+"",
                SeqNo: $('#txtNo').val()||"",
                FromDate: $('#txtStartDate').val()||"",
                ToDate: $('#txtEndDate').val()||"",
                ProductNames: $('#txtPro').val()||"",
                Status: $('#ddlStatus option:selected').val()||"",
                Sender: $('#txtUser').val()||"",
                SenderOrgNo: $('#txtUserOrgNo').val()||"",
                PageIndex: 0,
                PageSize: 10,
                ItemType: "问题"
        }; 
    }
    filter(){
        
        this.state.table.context[0].ajax.data=this.getFilterParams();
        this.state.table.ajax.url("/sopsapi/api/WFItem/GetUserParticipantedIns").load();
    }
    binding(table){
        this.setState({table:table});
        table.context[0].ajax.data=this.getFilterParams();
        table.ajax.url("/sopsapi/api/WFItem/GetUserParticipantedIns").load();
        //table.
    }

    componentDidMount(){ 
        // $.ajax({url:"/sopsapi/api/ItemTypes/GetItemTypes",type:"GET"}).then((data)=>{
        //     this.setState({itemTypes:data});
        // })
    }
         

    render() { 
     
        return (
            <div>
                <div className="col-xs-6 no-padding">
                    <div className="form-inline">
                          
                        <label>
                            标题
                            <input type="text" ref="title" className="form-control" maxLength="70" />
                        </label>
                
                        <input className="sops-btn" type="button" value="搜索" onClick={this.filter.bind(this)} />
                    </div>
                </div>

                <Datatable binding={this.binding.bind(this)} {...this.state.settings}>
                    <thead>
                        <tr>
                            <th>标题</th>
                            <th>编号</th>
                            <th>提出人</th>
                            <th>提出人姓名</th>
                            <th>提交时间</th>
                            <th>修改时间</th>
                            <th>机构号</th>
                            <th>机构</th>
                            <th>省行号</th>
                            <th>业务产品</th>
                            <th>优先级</th>
                            <th>状态</th>
                        </tr> 
                    </thead>
                </Datatable>
            </div>
        );
    }
};

//Counter.propTypes = { settings: React.PropTypes.object }; //  默认props类型
//Counter.defaultProps = { settings: {
 


export default Table;

