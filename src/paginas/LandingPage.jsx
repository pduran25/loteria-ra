import React, { useState } from 'react';
import sound from '/assets/chiverito.mp3';
import styled from 'styled-components';

const LandingPage = () => {

  const [enviadoExitosamente, setEnviadoExitosamente] = useState(false);

  const [formData, setFormData] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    redSocial: 'Facebook', 
    cuenta: '',// Valor predeterminado
  });
  var source = "";
  var source2 = "";

  source = "./assets/coco/";
  source2 = "./assets/coco/";

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleAudio = () => {
    const audioElement = document.getElementById('myAudio');
  
    if (isAudioPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) =>  {
    e.preventDefault();

    // Validación de campos (puedes personalizar esto según tus necesidades)
    if (!formData.cedula || !formData.nombres || !formData.apellidos || !formData.correo || !formData.telefono || !formData.redSocial || !formData.cuenta) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      // Envío de datos al servidor
      const response = await fetch('http://192.168.1.3:5173/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Verificar la respuesta del servidor
      if (response.ok) {
        setEnviadoExitosamente(true);
        // Puedes manejar la respuesta del servidor aquí, por ejemplo, redirigiendo a otra página
       // history.push('/pagina-limpia');

      } else {
        // Manejar errores de respuesta del servidor
        console.log("ingreso al error");
        setEnviadoExitosamente(true);
      }
    } catch (error) {
      // Manejar errores de red o del lado del cliente
      console.error('Error de red o del lado del cliente', error);
      setEnviadoExitosamente(true);
    }


    // Aquí puedes realizar acciones adicionales con los datos del formulario
    // Por ahora, simplemente redireccionamos a una página limpia
  };

  return (
    <div>
      <h1>Landing Page</h1>
      {(enviadoExitosamente)?(<div>
        <h1>¡Envío Exitoso!</h1>
        <p>Gracias por registrarte. Tu formulario se ha enviado exitosamente.</p>
        <div className="App">
<model-viewer src={source} ios-src={source2} camera-controls camera-orbit="-40deg 70deg 200m" camera-target="0 0 0" ar ar-modes="scene-viewer webxr quick-look" xr-environment ar-placement="wall" autoplay>

        <SoundButton
        src={isAudioPlaying ? './assets/audio.png' : './assets/sinaudio.png'}
        alt={isAudioPlaying ? 'Sonido inactivo' : 'Sonido activo'}
        onClick={toggleAudio}
      />

      <audio id="myAudio" src={sound} loop/>


        <Boton slot="ar-button" >
          Click Aquí
        </Boton>
  </model-viewer>
    </div>
      </div>):(<form onSubmit={handleSubmit}>
        <label>Cédula:
          <input type="text" name="cedula" value={formData.cedula} onChange={handleInputChange} />
        </label>
        <br />
        <label>Nombres:
          <input type="text" name="nombres" value={formData.nombres} onChange={handleInputChange} />
        </label>
        <br />
        <label>Apellidos:
          <input type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} />
        </label>
        <br />
        <label>Correo Electrónico:
          <input type="email" name="correo" value={formData.correo} onChange={handleInputChange} />
        </label>
        <br />
        <label>Número Telefónico:
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} />
        </label>
        <br />
        <label>Red Social:
          <select name="redSocial" value={formData.redSocial} onChange={handleInputChange}>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
          </select>
        </label>
        <br />
        <label>Cuenta Red social:
          <input type="text" name="cuenta" value={formData.cuenta} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Registrarse</button>
      </form>)}
      
    </div>
  );
};

export default LandingPage;

const SoundButton = styled.img`
display: inline-block;
`;

const Boton = styled.button`

display: inline-block;
border: none;
border-radius: 4px;
background-color: #0088cc;
color: #fff;
padding: 12px 24px;
font-size: 16px;
font-weight: bold;
text-align: center;
text-decoration: none;
cursor: pointer;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
transition: background-color 0.3s ease;
position: absolute; 
right: 100px; 
left: 100px;

bottom: 100px; 

&:hover {
  background-color: #006699;
}

&:focus {
  outline: none;
  background-color: #004466;
}
`;
