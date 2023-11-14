import React, { useEffect } from "react";
import "./App.css";

function formatNumero(numero) {
  if (numero < 10) {
    return `0${numero}`;
  } else {
    return numero;
  }
}

function App() {
  const [cronometro, setCronometro] = React.useState({
    horas: 0,
    minutos: 0,
    segundos: 0,
  });
  
  const[estado, setEstado] = React.useState({status: false})

  const formatTiempo = (tiempo) => {
    return `${formatNumero(tiempo.horas)}:${formatNumero(tiempo.minutos)}:${formatNumero(tiempo.segundos)}`;
  };

  useEffect(() => {

    let intervalID;

    const reloj = () => {

      setCronometro((prevTiempo) => {
        const nuevoTiempo = { ...prevTiempo, segundos: prevTiempo.segundos + 1 };
        if(nuevoTiempo.segundos === 60 && nuevoTiempo.minutos < 60){
          nuevoTiempo.segundos = 0;
          nuevoTiempo.minutos += 1;
        } else if(nuevoTiempo.segundos === 60 && nuevoTiempo.minutos === 60){
          nuevoTiempo.segundos = 0;
          nuevoTiempo.minutos = 0;
          nuevoTiempo.horas += 1;
        } if(nuevoTiempo.horas === 24){
          nuevoTiempo.segundos = 0;
          nuevoTiempo.minutos = 0;
          nuevoTiempo.horas = 0;
        }
        return nuevoTiempo;
      });
    }

    if(estado.status === true){

      intervalID = setInterval(reloj, 1000);

    } else {
     
      clearInterval(intervalID)
    }
    return () => clearInterval(intervalID);
  },[estado])

  const inicio = () => {
    setEstado({...estado, status: true})
  }
  

  const reiniciar = () => {
    setCronometro({segundos:0, minutos:0, horas:0})
    setEstado({...estado, status: false})
  }

  const parar = () => {

    setEstado({...estado, status: false})

  }

  const continuar = () => {

    setEstado({...estado, status: true})
  }

  return (
    <div id="div-app">
      <div id="h1-app">
      <h1>Cronometro</h1>
      </div>
      <div id="h2-app">
      <h2 >{formatTiempo(cronometro)}</h2>
      </div>
      <div id="div-button">
      <button id="start" onClick={inicio}>Start</button>
      <button id="stop" onClick={parar}> Stop</button>
      <button id="continue" onClick={continuar}>Continuar</button>
      <button id="reboot" onClick={reiniciar}>Reiniciar</button>
      </div>
    </div>
  );
}

export default App;
