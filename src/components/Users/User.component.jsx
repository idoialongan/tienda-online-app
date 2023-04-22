import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { of } from 'rxjs';

export default function Users() {
  const URL = 'https://jsonplaceholder.typicode.com/todos'
  const [todolist, setTodolist] = useState([]);

  // Creamos un observable que emite dos valores distintos
  const observable = of("Hola ", "mundo!");
  // Creamos un observador con las funciones para manejar el estado
  const observer = {
    next: x => console.log(x),
    error: err => console.error('¡Error! ', err),
    complete: () => console.log('Fin de la traza'),
  };

	
  useEffect(() => {
    Axios.get(URL)
      .subscribe(
      response => setTodolist(response.data),
      error => console.error("¡Hay un problema con la petición!", error),
      () => console.log("¡Suscripción completada!")
    );
  }, [])

  return ( /* Contenido del return */ );
}