var SearchBox = require('./components/SearchBox.jsx');
var SearchStatus = require('./components/SearchStatus.jsx');
var SearchResults = require('./components/SearchResults.jsx');
var Pages = require('./components/Page.jsx');
var Navigation= require('./components/Navigation.jsx');
var Banner= require('./components/Banner.jsx');

require('../css/styles.css');

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
                    <div className="page-header">
                        <h1>搜索 <small>输入关键字，回车键或点击按钮搜索...</small></h1>
                    </div>
                    <SearchBox />
                    <SearchStatus />
                    <SearchResults /> 
                    <Pages />
                    </div>
                </div>

            </div> 
      </div>
    );
  },
});

ReactDOM.render(<App />, document.getElementById('app'));