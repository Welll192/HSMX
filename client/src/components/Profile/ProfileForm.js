import classes from './ProfileForm.module.css';
import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
const ProfileForm = () => {
  const [stateContacts, setStateContacts] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("")

  const [usuarios, setUsuarios] = useState("");

  const token = useSelector(state => state.token);

  const contacts = () => {
    setStateContacts(stateContacts=>!stateContacts);
  }
  
  const changeName = (e) => {
    setName(e.target.value);
    console.log(name);
  }
  const changeNumber = (e) => {
    setNumber(e.target.value);
  }

  const formControler = (e)=>{
    console.log(token);
     fetch(
        'http://localhost:8000/api/contact/create',
        {
          method: 'POST',
          body: JSON.stringify({
            first_name: name,
            telf_number: number,
           
          }),
          headers: {
            'tokenKey':'bearer '+token,
            'Content-Type': 'application/json',
          },
        }
      ).then(res => res.json())
        .then(() => console.log(token))
       

    setName("");
    setNumber("");
    setStateContacts(stateContacts=>!stateContacts);
    e.preventDefault();
  }
  useEffect(() => {
    fetch(
      "http://localhost:8000/api/contact/get",
      {
        method: 'GET',
        headers: {
          'tokenKey':'bearer '+token,
          'Content-Type': 'application/json',
        },
      }
    ).then (res => res.json())
     .then(res=> setUsuarios(res));
  },[usuarios])
  return (
    <>
    {usuarios.length === 0? <h1>No tienes contactos añadidos</h1> :
      <div>
        {usuarios.map(e=>{
          return(
            <div key={e.id}>
              {e.first_name !==""? <><li>Nombre: {e.first_name}</li></>:null}
              {e.telf_number !==""? <><li>Number: {e.telf_number}</li> </> : null}
            </div>
          )
        })}
      </div>
    }
    <div>
      <h2 onClick={contacts}>Agregar contactos</h2>
      {stateContacts && 
      <div>
        {/* NOTA: MODIFICAR EL NOMBRE DEL CONTROLADOR FORM  */}
        <form onSubmit={e => formControler(e)}>     
          <label>
            <p>Name</p>
            <input type="text" onChange={changeName} value={name} />   
          </label>
          
          <label>
            <p>Phone Number</p>
            <input type="number" onChange={changeNumber} value={number} />   
          </label>
          
          <div><button type="submit">Add Contacts</button></div>
        </form> 

        </div>
      }
    </div>
    </> 
  );
}

export default ProfileForm;
