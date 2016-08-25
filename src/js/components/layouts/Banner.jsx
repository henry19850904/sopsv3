
import User from './User.jsx';

class Banner extends React.Component{

    render(){
        return (<div className="row sops-top">
                <div className="col-xs-3 no-padding">
                    <img src="images/home_01.jpg" />
                </div>
                <div className="col-xs-4">
                    <h3>网点运营管理辅助平台</h3>
                </div>
                <div className="col-xs-5 text-right sops-userinfo">
                    <div className="col-xs-10">
                        <User />
                    </div>
                    <div className="col-xs-2 sops-userpic">
                        <img src="images/user2.jpg"/>
                    </div> 
                </div>
            </div>);
    }

}

module.exports=Banner;

