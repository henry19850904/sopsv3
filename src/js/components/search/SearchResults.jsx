//var React = require('react');
var SearchResultsStore = require('../../stores/SearchResultsStore');

function getSearchResultsState() {
  return {
    results: SearchResultsStore.getResults(),
    hasSearched: SearchResultsStore.hasSearched(),
    isSearching: SearchResultsStore.isSearching(),
    pageInfo:SearchResultsStore.getPageinfo()
  }
}

var SearchResults = React.createClass({
  getInitialState: function() {
    return getSearchResultsState();
  },

  componentDidMount: function() {
    SearchResultsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SearchResultsStore.removeChangeListener(this._onChange);
  },

  render: function() {
    if (this.state.hasSearched && !this.state.isSearching) {
      if (this.state.results.length > 0) {
        var items = this.state.results.map((result, i) => {
          return (
            <li className="list-item" key={i}>
              <a href={result.url} className="item-primaryText">{result.title}</a>
              <span className="item-secondaryText" dangerouslySetInnerHTML={{ __html: result.description }}/>
              <span className="item-tertiaryText">{result.url}</span>
            </li>
          );
        });

        return (
          <div>
          <span>总数：{this.state.pageInfo.itemCount}</span>
          <ul className="list">
            {items}
          </ul>
          </div>
        );
      }
      else {
        return (
          <div className="ms-font-m">
            找不到相关内容
          </div>
        );
      }
    }
    else {
      return (<div/>);
    }
  },

  _onChange: function() {
    this.setState(getSearchResultsState());
  }
});

module.exports = SearchResults;