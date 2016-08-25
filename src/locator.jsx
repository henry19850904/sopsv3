
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Index from './js/index.jsx'

import Home from './js/components/Home.jsx'
import Search from './js/components/Search.jsx'
import Table from './js/components/Table.jsx'
import Todo from './js/components/Todo.jsx'
import Holiday from './js/components/holidays/Calendar.jsx' 

import Settings from './js/components/Settings.jsx'
import Setting from './js/components/Setting.jsx'

import './extlibs/bootstrap/js/bootstrap.min.js'; 

import withBasePath from './withBasePath'
/*
            <Route path="/settings/:flag" component={Setting}/> */
ReactDOM.render(( 
  <Router history={withBasePath(hashHistory, '/boc/SitePages/Manage/')}> 
    <Route path="/" component={Index}>
      <IndexRoute component={Home}/> 
      <Route path="/Holiday" component={Holiday}/>
      <Route path="/Search" component={Search}/>
      <Route path="/Table" component={Table}/>
      <Route path="/Todo" component={Todo}/>

        <Route path="/settings" component={Settings}/>
    </Route>
  </Router>
), document.getElementById("app"))
