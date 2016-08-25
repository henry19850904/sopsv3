
import Datatable from './Datatables/index'; 
import boc from './commons/boc.lib';

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.settings = boc.sops.util.config;
    this.state.settings.columns=[
                    {
                        "className": 'remove-user',
                        "orderable": false,
                        "data": null,
                        "defaultContent": '删除'
                    },
                    {
                        "className": 'details-control',
                        "orderable": false,
                        "data": null,
                        "defaultContent": '详细'
                    },
                    { "data": "ID" },
                    { "data": "UserName" },
                    { "data": "DisplayName" },
                    { "data": "BranchID" },
                    { "data": "BranchName" },
                    { "data": "Department" },
                    { "data": "ProvinceName" },
                    { "data": "BranchInformation" }
        ];
        this.state.settings.deferLoading=0;
        this.state.settings.ajax.type="POST" ;
        this.state.settings.columnDefs= [
                    {
                        "render": function (data, type, row) {
                            return "<a onclick='_ctx._jumpTo('/detals/',"+data+")'>Detail</a>";
                        },
                        "targets": [1]
                    }]
  }


    binding(table){
        this.setState({table:table});
        //table.context[0].ajax.data=this.getFilterParams();
        var url =boc.sops.util.createOperationAddress({
                                            Action: "User",
                                            Method: "GetAllUsers",
                                            Branch: '00001'
                                        });
        table.ajax.url(url).load();
    }

  

  componentWillMount() {
    // Clean up work here.
  }

  componentDidMount() {
    //$(this.refs.placeholder).append($('<span />'));
    window._ctx={
        currentComponent:this,
        _jumpTo:function(url,ctx){
           alert( this.currentComponent.props.location);
        }
    }
  }

  shouldComponentUpdate() {
    // Let's just never update this component again.
    //return false;
  }

  componentWillUnmount(){
    delete window._ctx;
  }

  render() {
    
    return (
        <div>
            <div className="col-xs-6 no-padding">
                <div className="form-inline">
                    <label>
                        一级分行:
                        <select className="form-control input-sm" 
                        name="Branch" data-bind="options: Branchs,optionsText:'BranchName',optionsValue:'BranchID',value:Branch"></select>
                    </label>
                    <input className="sops-btn" type="button" value="添加新用户" data-bind="click: toAddNewUser" />
                </div>
            </div>

            <Datatable binding={this.binding.bind(this)} {...this.state.settings}>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>ID</th>
                        <th>用户名</th>
                        <th>显示名</th>
                        <th>机构号</th>
                        <th>机构名称</th>
                        <th>部门</th>
                        <th>省行名</th>
                        <th>机构信息</th>
                    </tr>
                </thead>
            </Datatable>
        </div>
    );
  }
};

export default Table;

