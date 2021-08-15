import React, { useState, useEffect } from 'react';
import useHttp from '../hooks/use-http';
import { useParams } from 'react-router-dom';
import DetailsPage from './DetailsPage';

const ViewUserDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const { sendRequest: fetchRequest } = useHttp();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const details = (data) => {
      setUserDetails(data);
    };
    fetchRequest({ url: `http://localhost:8000/api/userlist/${id}` }, details);
  }, [fetchRequest, id]);


  return (
    <table
      class="tables"
      style={{ marginTop: '150px', minWidth: '55%', marginLeft: '450px' }}
    >
      {userDetails.map((user) => (
       <DetailsPage
          key={user.id}
          name={user.name}
          username={user.username}
          email={user.email}
          type={user.type}
          active={user.active}
          blood ={user.bloodGroup}
          address = {user.address}
          phone = {user.phone}
        />
        
      ))}
    </table>
  );
};

export default ViewUserDetails;
