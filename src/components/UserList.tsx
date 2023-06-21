import React, {useEffect} from 'react';
import {useTypesSelector} from "../hooks/useTypesSelector";
import {useActions} from "../hooks/useActions";

const UserList: React.FC = () => {
  const {users, error, loading} = useTypesSelector(state => state.user);
  const {fetchUsers} = useActions();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h2>Список пользователей:</h2>
      {
        loading
          ? <h2>Идёт загрузка пользователей...</h2>
          : error
            ? <h2>{error}</h2>
            : <div
              style={{marginBottom: 30}}
              >
                {users.map(user => {
                  return (<div key={user.id}>{user.name}</div>);
                })}
              </div>
      }
    </>
  );
};

export default UserList;
