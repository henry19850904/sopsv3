//var React = require('react');
 
var SearchActions = require('../../actions/SearchActions');
var SearchResultsStore = require('../../stores/SearchResultsStore');

function getSearchResultsState() {
  return SearchResultsStore.getPageinfo()
}

var Pages = React.createClass({

  getInitialState: function() {
    return getSearchResultsState();
  },

  componentDidMount: function() {
    SearchResultsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SearchResultsStore.removeChangeListener(this._onChange);
  },
previewsPage:function(){
    if(this.state.pageIndex==1){
        alert("最小页");return;
    } 
    SearchActions.switchPage(this.state.pageIndex-1); 
},
nextPage: function(){
    if(this.state.pageIndex==this.state.pageCount){
        alert("最大页");return;
    }
    SearchActions.switchPage(this.state.pageIndex+1); 
},
     switchPage:function(obj){
         this.setState({pageIndex:obj.target.text})
        SearchActions.switchPage(obj.target.text); 
         
     },
  render: function() {

        var items = []; 
        var count =(this.state.pageCount>10?10:this.state.pageCount);
        for (var index = 1; index <= count; index++) {
            items.push(<li className={this.state.pageIndex==index?"active":""} key={index}>
            <a onClick={this.switchPage} href="#">{index}</a>
            </li>)
        }
/* <h3>Here is count:{this.state.itemCount},
                pageIndex:{this.state.pageIndex},
                searchQuery:{this.state.searchQuery},
                pageCount:{this.state.pageCount}</h3> */
        return (
         <div>
            
            

            <nav aria-label="Page navigation">
            <ul className="pagination">
                <li>
                <a onClick={this.previewsPage} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li> 

                {items}
            
                <li>
                <a onClick={this.nextPage} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
            </nav>
          </div>)
  },

  _onChange: function() {
    this.setState(getSearchResultsState());
  }
});
 
 
module.exports = Pages;