
class Model {
    
        constructor(){
            this.registration = [];
            this.inputValue = null;
            this.check = null; 
        }
    
        subscribe(render) {
            this.render = render;
        }
    
        notify(){
            console.log(this.registration.map(e => e.text));
            console.log(this.registration);
            this.render();
        }
    
        addRegistration(text){
            
            this.registration.push({
                id: Utils.uuid(),
                text: text,
                completed : false
            });
            this.notify();
        }

        upDateRegistration(index, todo){
            index.completed = todo.checked;
            this.notify();
        }

        clearRegistration(text){
            this.registration = this.registration.filter(item => item !== text);
            this.notify();
        }
    }
    
    const App =({ model})=> {
        return(
            <div className="wrapper">
                <header>
                    <h1>RSVP</h1>
                    <p> Registration App </p>
                    <form id="registrar" onSubmit={e =>{e.preventDefault();
                            model.addRegistration(model.index.value);
                            }}>
                        <input type="text" name="name" placeholder="Invite Someone" onChange={e => (model.index = e.target)}/>
                        <button type="submit" name="submit" value="submit">Submit</button>
                    </form>
                </header>
		
                <div class="main">	
                    <h2>Invitees</h2>
                    <ul id="invitedList">{model.registration.map(item => <Registrados key={item.id} model={model} index={item}/>)}</ul>	
                </div>
            </div>
        );
    }

    const Registrados = ({index, model}) => {
        return (
            <li className ={index.completed ? 'responded' : ''}>
                {index.text}
                <label htmlFor="">Confirmed <input type="checkbox" onChange={(e) => model.upDateRegistration(index, e.target)} checked={index.completed} /> </label>
                <button onClick={() => model.clearRegistration(index)}>remove</button>
            </li>
        );
    }

    let model = new Model();
    let render = () => {
        ReactDOM.render(
            <App title="Registration" model={model}/>,
            document.getElementById('container')
        )
    }

    model.subscribe(render);
    render();