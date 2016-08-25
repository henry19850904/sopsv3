
import Datatable from './Datatables/index'; 
import boc from './commons/boc.lib';
import DateRange from "./commons/DatepickerRange"

class Table extends React.Component {

    constructor(props) {
        super(props);
        var self =this;
        this.state = {
            table:null,
            date:{start:null,end:null},
            statusList:[]
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
         this.state.settings.columnDefs= [
                    {
                        "render": function (data, type, row) {
                            return "<a href='/SitePages/项目详情.aspx?iid="+row.ItemID+"'>"+data+"</a>";
                        },
                        "targets": [0]
                    }
                    ]
    }
   
    getFilterParams(){
        return {
                UserName: "sp\\spadmin",
                Title: this.refs.title && this.refs.title.value+"",
                SeqNo: this.refs.seqNo&& this.refs.seqNo.value+"",
                FromDate: this.state.date.start ,
                ToDate: this.state.date.end,
                ProductNames: this.refs.productNames&& this.refs.productNames.value+"",
                Status: this.refs.status.value&& this.refs.status.value+"",
                Sender: this.refs.sender&& this.refs.sender.value+"",
                SenderOrgNo: this.refs.branchNo&& this.refs.branchNo.value+"",
                PageIndex: 0,
                PageSize: 10,
                ItemType: "经验建议"
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
        this.setState({statusList:[{key:"待反馈",name:"待反馈"},{key:"已反馈",name:"已反馈"}]});
        // $.ajax({url:"/sopsapi/api/ItemTypes/GetItemTypes",type:"GET"}).then((data)=>{
        //     this.setState({itemTypes:data});
        // })
    }
    valueChanged(values){

        this.setState(values);

       // alert(JSON.stringify(values));
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
                        <label>
                            时间
                            <DateRange valueChanged={this.valueChanged.bind(this)} />
                        </label>
                        <label>
                            编号
                            <input type="text" ref="seqNo" className="form-control" maxLength="15" />
                        </label>
                        <label>
                            状态
                            <select ref="status">
                                {this.state.statusList.map((s)=>{
                                    return (<option key={s.key} value={s.key}>{s.name}</option>)
                                })}
                            </select>
                        </label>
                        <label>
                            业务产品
                            <input type="text" ref="productNames" className="form-control" maxLength="25" />
                        </label>
                        <label>
                            提出人
                            <input type="text" ref="sender" className="form-control" maxLength="15" />
                        </label>
                        <label>
                            机构号
                            <input type="text" ref="branchNo" className="form-control" maxLength="15" />
                        </label>
                        <input className="sops-btn" type="button" value="查询" onClick={this.filter.bind(this)} />
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

