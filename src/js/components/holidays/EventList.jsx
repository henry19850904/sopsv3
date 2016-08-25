jQuery.support.cors = true;

const ListHead = (props) => <div><legend>假期列表<small></small></legend></div>;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "loading":false,items:props.items };
       // this.onDelete=this.onDelete.bind(this);
    }
  
    componentDidMount() {
      
        this.setState({"firstView": true});
        this.setState({"loading": true, 'firstView': false});
        this.setState({"loading": false });
        // let url = '/odata/Calendars';
        // var self =this;

        // $.ajax({
        //     url:url,
        //     dataType: 'json',
        //     type: 'GET',
        //     async: false
        // })
        // .done(function(data) {
        //     self.setState({"loading":false, "items": data.value});
        // })
    }

    componentWillReceiveProps(nextProps) {
       // this.setState({items:nextProps});
    }
  

    deleteItem(event){
        var self=this;
        $.ajax({
            type:"DELETE",
            contentType: "application/json",
            url:"/sopsapi/odata/Calendars("+event.Id+")", 
            success:(function(res){
           //     self.props.onFormSubmit(res);
               // self.props.items.remove(event);
               // self.setState({items:self.props.items});
                
                cal.view();
            })
        });
    }

    render() {
        const imgStyle = {
            width: '100px'
        } 
        if (this.state.loading) {
            return (
            <h2>加载数据...</h2>
            );
        } else {
            if (this.props.items.length === 0) {
                return (
                    <h2>无数据</h2>
                )
            } else {
                return ( 
                    <div>
                        <ListHead />
                        <ul className="list-group"> 
                            {this.props.items.map(item=>{ 
                                return (
                                    <li key={item.Id} className="list-group-item" title={item.title}>
                                        <span onClick={this.deleteItem.bind(this,item)} className= { "badge " +item.class}>    
                                        <span className="glyphicon glyphicon-remove"></span></span> 
                                        [{item.Id}]
                                        {item.title.length>15?item.title.substring(0,15):item.title}
                                        [{new Date(parseInt(item.start)).toLocaleDateString()}]-[{new Date(parseInt(item.end)).toLocaleDateString()}]
                                
                                    </li>
                                )
                            })} 
                        </ul>   
                    </div>
                );
            }
        }
    }
}
