
class Setting extends React.Component{
    
    constructor(props) {
        super(props);
    }
  handleSubmit(event) {
    event.preventDefault()
    const flag = event.target.elements[0].value
    const value = event.target.elements[1].value
    const path = `/settings/${flag}/${value}`
    this.context.router.push(path)
  }

  render() { 
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
        {this.props.currentSettings.map((sets)=>{
            return (
                    <div key={sets.key} className="form-group"> 
                        <label htmlFor="" className="col-sm-10 col-sm-offset-2">{sets.description}</label>
                        <label className="col-xs-2 control-label">
                            {sets.title}
                        </label>
                        <div className="col-xs-3">
                            <input type="text" defaultValue={sets.value} name="title" className="form-control"/>
                            <label>{sets.note}</label>
                        </div>
                    </div>   	 
            );
        })}
        
         <div className="form-group">
             <div className="col-sm-10 col-sm-offset-2">
                 <button type="submit" className="btn btn-primary">提交</button>
             </div>
         </div>
      </form>
    )
  }

}

export default Setting;

