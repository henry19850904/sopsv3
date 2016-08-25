
import 'datatables';
import './dt.style.css'; 
import './bstyle';

$.fn.dataTable.ext.errMode = function handleError(e, settings, techNote, message) {   
    console.error(arguments);
};

class Datatable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const options = Object.assign({
 //     language: language,          // 国际化语言设置
   //   ajax: this.props.ajax,
    }, this.props);
    //options.ajax.data=this.props.postData;
    var table = $(this.getTableDomNode()).DataTable(options); // eslint-disable-line new-cap
    this.props.binding && this.props.binding(table);
  }

  componentWillUnmount() {
    const table = $(this.getTableDomNode()).DataTable(); // eslint-disable-line new-cap
    table.destroy();
  }

  getTableDomNode() {
    return ReactDOM.findDOMNode(this);
  }

  render() {
    const {columns, data, ajax, children} = this.props;

    if (!columns && !data && !ajax && children) {
      return children;
    }

    return (
      <table width="100%" className="table table-striped table-bordered sops-table">
        {this.props.children}
      </table>
    );
  }

}


 export default Datatable;
