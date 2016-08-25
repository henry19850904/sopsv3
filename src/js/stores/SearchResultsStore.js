var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SearchConstants = require('../constants/SearchConstants');
var q = require('q');
var assign = require('object-assign');

var _searchResults = [];
var _itemCount = 0,
    _pageIndex = 1,
    _pageSize = 10,
    _pageCount = 0;
var _error = null;
var _searching = false;
var _hasSearched = false;
var _searchQuery = "";

var CHANGE_EVENT = 'change';

function getValueFromResults(key, results) {
    var value = '';

    if (results !== null &&
        results.length > 0 &&
        key !== null) {
        for (var i = 0; i < results.length; i++) {
            var resultItem = results[i];

            if (resultItem.Key === key) {
                value = resultItem.Value;
                break;
            }
        }
    }

    return value;
}

function search(searchQuery, pageIndex) {
    var defer = q.defer();

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                defer.resolve(this.response || this.responseText);
            } else if (this.status >= 400) {
                defer.reject({
                    message: this.response['odata.error'].message.value,
                    statusText: this.statusText,
                    status: this.status
                });
            }
        }
    }

    var mark = (new Date()).getTime();
    var search = `Keywords=${searchQuery}&Start=${pageIndex}&PageSize=10`;

    xhr.open('POST', `/sopsapi/api/SPSearch/ServerSearchResult?_=${mark}`, true);
    //  xhr.open('POST', `/sopsapi/api/Search/ClientSearchResult?_=${mark}`, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //xhr.setRequestHeader('Accept', 'application/json; odata=verbose');

    xhr.responseType = 'json';
    xhr.send(search);

    return defer.promise;
}

var SearchResultsStore = assign({}, EventEmitter.prototype, {
    getResults: function() {
        return _searchResults;
    },

    getPageinfo: function() {
        return {
            itemCount: _itemCount,
            pageIndex: _pageIndex,
            pageSize: _pageSize,
            pageCount: Math.ceil(_itemCount / _pageSize),
            searchQuery: _searchQuery
        }
    },

    getError: function() {
        return _error;
    },

    isSearching: function() {
        return _searching;
    },

    hasSearched: function() {
        return _hasSearched;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

function startSearch(searchQuery) {

    _searchResults.length = 0;
    _error = null;
    _searching = true;
    _itemCount = 0;
    _searchQuery = searchQuery;

    SearchResultsStore.emitChange();

    search(searchQuery, _pageIndex-1).then(function(response) {
        if (typeof(response) === "string") {
            response = JSON.parse(response);
        }
        if (response) {
            _itemCount = response.Count;
           // _pageIndex++;
            response.Value.forEach((row) => {
                _searchResults.push({
                    title: row.Title,
                    url: row.TargetUrl,
                    description: row.HitHighlightedSummary
                });
            });
        }
    }, function(err) {
        _error = err;
    }).finally(function() {
        _searching = false;
        _hasSearched = true;
        SearchResultsStore.emitChange();
    });

}

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case SearchConstants.SEARCH:
            var searchQuery = action.text.trim();
            if (searchQuery.length > 0) {
                startSearch(searchQuery);
            }
            break;
        case SearchConstants.SWITCHPAGE:
            _pageIndex = action.text;
           // alert(_pageIndex)
            startSearch(_searchQuery);
            break;

    }
});

module.exports = SearchResultsStore;