
import boc from './commons/boc.lib';


class ItemAudit extends React.Component {

    constructor(props) {
        super(props);

        var self =this;
        this.state={
            item:null
        };
        this.state.settings = boc.sops.util.config;
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
    edit(){
        
        this.state.table.context[0].ajax.data=this.getFilterParams();
        this.state.table.ajax.url("/sopsapi/api/WFItem/GetUserParticipantedIns").load();
    }
    del(){
        
        this.state.table.context[0].ajax.data=this.getFilterParams();
        this.state.table.ajax.url("/sopsapi/api/WFItem/GetUserParticipantedIns").load();
    }
    back(){
        
        this.state.table.context[0].ajax.data=this.getFilterParams();
        this.state.table.ajax.url("/sopsapi/api/WFItem/GetUserParticipantedIns").load();
    }

    componentDidMount(){ 

        const { id } = this.props.params;
  
        $.ajax({url:"/sopsapi/api/WFItem/Get/38389",type:"GET"}).then((data)=>{
            this.setState({item:data});
        })
    }
         

    render() { 
        
        return (
            <div>
                <div className="col-xs-6 no-padding">
                    <div className="form-inline">
                        <input className="sops-btn" type="button" value="编辑项目" onClick={this.edit.bind(this)} />
                        <input className="sops-btn" type="button" value="删除" onClick={this.del.bind(this)} />
                        <input className="sops-btn" type="button" value="返回" onClick={this.back.bind(this)} />
                        <label>
                            标题
                        </label>
                        <div>
                            {this.state.item.Title}
                        </div>
                        <label>
                            类型
                        </label>
                        <div>
                            {this.state.item.ItemTypeName}
                        </div>
                        <label>
                            制度
                        </label>
                        <div>
                            {this.state.item.RelatedRule}
                        </div>
                        <label>
                            优先级
                        </label>
                        <div>
                            {this.state.item.PriorityName}
                        </div>
                        <label>
                            内容
                        </label>
                        <div>
                            {this.state.item.ItemContent}
                        </div>
                        <label>
                            机构
                        </label>
                        <div>
                            {this.state.item.SenderBranchName}
                        </div>
                        <label>
                            联系电话
                        </label>
                        <div>
                            {this.state.item.ContactNumber}
                        </div>
                        <label>
                            编号
                        </label>
                        <div>
                            {this.state.item.ItemSeqCode}
                        </div>
                        <label>
                            状态
                        </label>
                        <div>
                            {this.state.item.CurrentStatus}
                        </div>
                        <label>
                            业务产品
                        </label>
                        <div>
                            {this.state.item.ProductNames}
                        </div>
                        <label>
                            提出人
                        </label>
                        <div>
                            {this.state.item.SenderUserName}
                        </div>
                        <label>
                            提出人姓名
                        </label>
                        <div>
                            {this.state.item.SenderDisplayName}
                        </div>
                        <label>
                            机构号
                        </label>
                        <div>
                            {this.state.item.SenderBranchID}
                        </div>
                        <label>
                            所属省行号
                        </label>
                        <div>
                            {this.state.item.SenderProvinceBranchID}
                        </div>
                        <label>
                            发起组
                        </label>
                        <div>
                            {this.state.item.SenderAsGroupName}
                        </div>
                        <label>
                            当前处理组
                        </label>
                        <div>
                            {this.state.item.Title}
                        </div>
                        <label>
                            附件
                        </label>
                        <div>
                           
                        </div>
                    </div>
                </div>

            </div>
        );
    }
};

//Counter.propTypes = { settings: React.PropTypes.object }; //  默认props类型
//Counter.defaultProps = { settings: {
 


export default ItemAudit;

