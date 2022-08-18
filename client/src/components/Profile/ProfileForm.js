import Style from './ProfileForm.module.css'
import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { guardarID } from '../../Redux/Actions';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const idSave = useSelector(state => state.id);

  const [stateContacts, setStateContacts] = useState(false);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("")

  const [nameEdit, setNameEdit] = useState("");
  const [numberEdit, setNumberEdit] = useState("");
  
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
  const changeNameEdit = (e) => {
    setNameEdit(e.target.value);
  }
  const changeNumberEdit = (e) => {
    setNumberEdit(e.target.value);
  }

  const formControler = (e)=>{
    console.log(token);
     fetch(
        'https://hsmxcontacts.herokuapp.com/api/contact/create',
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

  const removeController = (id) => {
    fetch(
      'https://hsmxcontacts.herokuapp.com/api/contact/DELETE',
      {
        method: 'DELETE',
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          'tokenKey':'bearer '+token,
          'Content-Type': 'application/json',
        },
      }
    ).then(res=>res.json())
    .then(res=> console.log(res));    
  }
  const editController = (idSave) => {
    fetch(
      'https://hsmxcontacts.herokuapp.com/api/contact/update',
      {
        method: 'PATCH',
        body: JSON.stringify({
          id: idSave,
          first_name: nameEdit,
          telf_number: numberEdit,
        }),
        headers: {
          'tokenKey':'bearer '+token,
          'Content-Type': 'application/json',
        },
      }
    ).then(res=>res.json())
    .then(res=> console.log(res));  
  }
  useEffect(() => {
    fetch(
      "https://hsmxcontacts.herokuapp.com/api/contact/get",
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
      <div className={Style.contenedor}>
        {usuarios.map(e=>{
       
          return(
            
            <div key={e._id} className={Style.contenedorCard}>


              <div class="card">
                <div class="card-info">
                  <div class="card-avatar"></div>
                  <div class="card-title">{e.first_name}</div>

                  <div class="card-subtitle"><h4 className= {Style.phoneNumber}>{e.telf_number}</h4></div>
                </div>
                <ul class="card-social" style={{position:"relative",bottom:"2rem"}}>
                  <li class="card-social__item">


                    <a onClick={()=>{dispatch(guardarID(e._id))}} data-bs-toggle="modal" data-bs-target="#exampleModal"x>
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#354259" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1="16" y1="5" x2="19" y2="8" />
                      </svg>
                    </a>
                  


                  </li>
                  <li class="card-social__item">

                    <a onClick={()=>removeController(e._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#354259" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          )
        })}
      </div>
    }


    
    <div>
      <button onClick={contacts} class="button2">Add contacts</button>
      {stateContacts && 
      <div class="login-page">
      <div class="form2">
        <form class="login-form" onSubmit={e => formControler(e)}>
          <input type="text" onChange={changeName} value={name} placeholder="name"/>
          <input type="number" onChange={changeNumber} value={number} placeholder="phone number"/>
          <button type="submit">Add Conctacts</button>
        </form>
      </div>
      </div>
      }
    </div>
      {/* <!-- Modal --> */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <form class="form">
                <h2 class="h2">Edit Contact</h2>
                <p class="p" type="Name:"><input   onChange={changeNameEdit} value={nameEdit} placeholder="Write your name here.."></input></p>
                <p class="p" type="Phone Number:"><input  onChange={changeNumberEdit} value={numberEdit} placeholder="Write your Phone Number here.."></input></p>
              </form>
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={()=>editController(idSave)} type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </> 
  );
}

export default ProfileForm;
