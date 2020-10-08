import {useEffect} from 'react';
import { toast } from 'react-toastify';

const NotFound = ({history}) => {

 useEffect(() => {
   toast.dark('Page was not found!');
   history.replace('/');
 }, []); 

  return null;
};

export default NotFound;