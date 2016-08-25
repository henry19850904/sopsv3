import NavLink from './components/layouts/NavLink.jsx'
var Navigation= require('./components/layouts/Navigation.jsx');
var Banner= require('./components/layouts/Banner.jsx');

export default React.createClass({
  render() {
    return ( 
        <div>
            <div className="container-fluid">
                <div className="row">
                    <Banner />
                        <div className="asm-center">
                            <div className="col-xs-2">
                                <Navigation />
                            </div>
                            <div className="col-xs-10 sops-right-slide no-padding">
                                <div className="navbar navbar-default">
                                    <div className="collapse navbar-collapse">
                                        <ul className="nav navbar-nav">
                                            <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li> 
                                            <li><NavLink to="/Holiday">Holiday</NavLink></li> 
                                            <li><NavLink to="/Search">Search</NavLink></li> 
                                            <li><NavLink to="/Table">Table</NavLink></li> 
                                            <li><NavLink to="/Todo">Todo</NavLink></li> 
                                            <li><NavLink to="/settings">Settings</NavLink></li> 
                                        </ul>
                                    </div>
                                </div>
                                {this.props.children}
                            </div>
                        </div> 
                </div> 
            </div> 
        </div>  
    )
  }
})


 
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

