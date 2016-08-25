var SearchBox = require('./search/SearchBox.jsx');
var SearchStatus = require('./search/SearchStatus.jsx');
var SearchResults = require('./search/SearchResults.jsx');
var Pages = require('./search/Page.jsx');
require('../../css/styles.css');

const Search = (props) => <div>
        <div className="page-header">
            <h1>搜索 <small>输入关键字，回车键或点击按钮搜索...</small></h1>
        </div>
        <SearchBox />
        <SearchStatus />
        <SearchResults /> 
        <Pages />
    </div>;

export default Search;

