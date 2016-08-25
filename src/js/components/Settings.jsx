
import Setting from './Setting.jsx'
import { Link } from 'react-router'

class Settings extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state={setList:[ {
                                key: "reportSettings",
                                title:"数据统计参数", 
                                keys:[
                                        {
                                            key:"ClickCount",
                                            value:100,
                                            title: "点击量统计",
                                            note:"默认值“100”次，允许修改",
                                            description:"点击量超过设置的数值，将会在柜员端出现“高频”标识"
                                        },
                                        {
                                            key:"EvaluateCount",
                                            value:100,
                                            title: "评价低于分数值",
                                            note:"默认值“50分”，允许修改",
                                            description:"评价低于设置的分值，将被统计在《评价低于一定分数的问题回复》的报表中"
                                        },
                                        {
                                            key:"topDegree",
                                            value:100,
                                            title: "TOP次数",
                                            note:"默认值“50分”，允许修改",
                                            description:"评价低于设置的分值，将被统计在《评价低于一定分数的问题回复》的报表中"
                                        },
                                        {
                                            key:"topDateScope",
                                            value:100,
                                            title: "TOP时间区间",
                                            note:"默认值“50分”，允许修改",
                                            description:"评价低于设置的分值，将被统计在《评价低于一定分数的问题回复》的报表中"
                                        },
                                        {
                                            key:"highDegree",
                                            value:100,
                                            title: "高频次数",
                                            note:"默认值“50分”，允许修改",
                                            description:"评价低于设置的分值，将被统计在《评价低于一定分数的问题回复》的报表中"
                                        }
                                ]
                            },
                            {
                                title:"节假日管理",
                                url:"/Holiday"
                            }

                        ],
                        currentSettings:[]
                    };
    }
    handleClick(event){
        var key = event.target.getAttribute("data-key")
       
        let item = this.state.setList.filter(k => k.key == key);
        this.setState({currentSettings:item[0].keys});
    }
    render() {
        return (
        <div>
            <h2>设置</h2>
            <div className="col-xs-2">
            
                <div className="list-group">
                    {this.state.setList.map((set,i)=>{
                        return (<a key={i} onClick={this.handleClick.bind(this)} className="list-group-item" data-key={set.key}>{set.title}</a>)
                    })}
                </div> 
                  
            </div>
            <div className="col-xs-10">
                <Setting currentSettings={this.state.currentSettings} />
            </div>
        </div>
        )
    }

}


export default Settings;
