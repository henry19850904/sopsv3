class User extends React.Component{
    constructor(props) {
        super(props);
        this.state = {userinfo: null}; 
    }
    componentDidMount(){
        $.ajax({
            url:"/boc/_api/Web/CurrentUser",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" }
        }).then((data)=>{ 
            this.setState({userinfo:data.d}); 
        }) 

    }
    render(){
        if(this.state.userinfo==null){
            return (<span>信息加载中...</span>)
        }else{
            return(<p>
                        欢迎登陆
                        <br />
                        <b title={this.state.userinfo.LoginName}>{this.state.userinfo.Title}</b>
                    </p>);
        }

    }

}

module.exports=User;
