import React,{useState} from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user-context';
import classes from './AddUser.module.css'

const AddUserForm = (props) => {
  const [enteredUsername, setEnteredUsername] = useState(props.status==='edit'?props.username:'');
  const [enteredEmail, setEnteredEmail] = useState(props.status==='edit'?props.email:'');
  const [enteredPhone, setEnteredPhone] = useState(props.status==='edit'?props.phone:'');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredActive, setEnteredActive] = useState(props.status==='edit'?props.active:1);
  const [enteredType, setEnteredType] = useState('admin');
  const utx = useContext(UserContext);


  const usernameHandler = (e) => {
    setEnteredUsername(e.target.value);
  };
  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const phoneHandler = (e) => {
    setEnteredPhone(e.target.value);
  };
  const PasswordHandler = (e) => {
    setEnteredPassword(e.target.value);
  };
  const activeHandler = (e) => {
    setEnteredActive(e.target.value);
  };
  const typeHandler = (e) => {
    setEnteredType(e.target.value);
  };

  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();

    if(props.status === 'add'){
      const userData = {
        username: enteredUsername,
        email: enteredEmail,
        phone: enteredPhone,
        password: enteredPassword,
        type: enteredType,
      };   

      utx.onAddUser(userData);
    }

    if(props.status === 'edit'){
      const userData = {
        username: enteredUsername,
        email: enteredEmail,
        phone: enteredPhone,
        active:enteredActive,
      };

      props.onEditUser(userData,props.id);
    }  
    history.push('/admin/viewUserList');

  };
    return (
        <>
        {utx.isLoading && <div className={classes.loader}></div>}
        {!utx.isLoading && <div className={classes['row-right']}>
        <h1 className={classes.user}>{props.status === 'add' ? 'Add User' : 'Edit User'}</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            id={classes.username}
            type="text"
            name="username"
            value={enteredUsername}
            onChange={usernameHandler}
          />
          <label htmlFor="username">Email</label>
          <input
            id={classes.email}
            type="email"
            name="email"
            value={enteredEmail}
            onChange={emailHandler}
          />
          <label htmlFor="salary">Phone</label>
          <input
            type="text"
            id={classes.salary}
            value={enteredPhone}
            onChange={phoneHandler}
          />
          <br />
          {props.status === 'add' && <label htmlFor="password">Password</label>}
          {props.status === 'add' && (
            <input
              id={classes.password}
              type="password"
              name="password"
              value={enteredPassword}
              onChange={PasswordHandler}
            ></input>
          )}
          {props.status === 'edit' && <label htmlFor="active">Active</label>}
          {props.status === 'edit' && (
            <input
              type="number"
              min="0"
              max="1"
              id={classes.active}
              value={enteredActive}
              onChange={activeHandler}
            />
          )}
          {props.status === 'add' && <label htmlFor="type">Type</label>}
          {props.status === 'add' && (
            <select
              name="type"
              id={classes.select}
              value={enteredType}
              onChange={typeHandler}
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
              <option value="receptionist">Receptionist</option>
            </select>
          )}
          <button id={classes['add_button']} type="submit">
            {props.status === 'add' ? 'Add User' : 'Edit User'}
          </button>
        </form>
      </div>}
      </>
    )
}

export default AddUserForm
