 
var Calendar= require('./components/holidays/Calendar.jsx');
var Navigation= require('./components/Navigation.jsx');
var Banner= require('./components/Banner.jsx');
 
import '../extlibs/bootstrap/js/bootstrap.min.js'; 

var App = React.createClass({ 
  render: function() {    
    return (
        <div className="container-fluid">
            <div className="row">
                
                <Banner /> 
                <div className="row asm-center">

                    <div className="col-xs-2">
                        <Navigation />
                    </div>
            
                    <div className="col-xs-10 sops-right-slide no-padding">
                        <Calendar />
                    </div>
                </div>
            </div>
        </div>
        );
    }
});
ReactDOM.render(<App />, document.getElementById('app'));


 