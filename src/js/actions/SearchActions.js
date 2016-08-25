var AppDispatcher = require('../dispatcher/AppDispatcher');
var SearchConstants = require('../constants/SearchConstants');

var SearchActions = {
  search: function(searchQuery) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.SEARCH,
      text: searchQuery
    })
  },
  switchPage: function(index) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.SWITCHPAGE,
      text: index
    })
  }
};

module.exports = SearchActions;