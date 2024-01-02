import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 
const AuthToken = ({ onBack }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDataLogin = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/accounts/token/obtain/',
        { email, password }
      );

      const { access } = response.data;
      console.log(access);
      // Salvando o token de acesso no armazenamento local
      localStorage.setItem('access_token', access);
      navigate('/user-profile');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert(`${error.response.data.detail}`);
    }
  };

  const handleRegister = () => {
    // Implemente a lógica de registro aqui
    navigate('/register');
  };

  const handleBackPage = () => {
    navigate('/');
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Autenticação via Token JWT</h2>
      <p style={styles.description}>
      O funcionamento do JWT baseia-se em uma estrutura de três partes: o cabeçalho (header), a carga útil (payload) e a assinatura (signature). O cabeçalho contém informações sobre o tipo do token e o algoritmo de assinatura usado. A carga útil armazena as informações desejadas, como dados do usuário ou permissões. A assinatura é gerada usando o cabeçalho, a carga útil e uma chave secreta, garantindo que o token não seja alterado após a criação.
      </p>
    <div style={styles.subcontainer}>
      <div style={styles.form}>
      <input
          type="text"
          placeholder="Seu email"
          value={email}
          onChange={handleEmailChange}
          style={styles.input}
        />
        <br />
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={handlePasswordChange}
          style={styles.input}
        />
        <br />
        <div style={styles.boxButton}>
        <button type="button" onClick={handleRegister} style={styles.button}>Registro</button>
        <button type="button" onClick={handleDataLogin} style={styles.button}>Login</button>
        <button type="button" onClick={handleBackPage} style={styles.button}>Voltar</button>
        </div>
      </div>
    </div>
    </div>
  );
};

const styles = {
  title: {
    fontSize: '1.8em', // Tamanho maior do título
    marginBottom: '10px',
    textAlign: 'center', // Centralizado
    color: '#555', // Cinza
  },
  description: {
    fontSize: '1.2em', // Tamanho menor da descrição
    textAlign: 'center', // Centralizado
    color: '#555', // Cinza
    marginBottom: '20px',
  },
  subcontainer: {
    maxWidth: '480px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: '#363636',
    width: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px', // Aumentei o padding para melhorar a aparência
    marginBottom: '12px', // Diminuí o espaçamento inferior
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%', // Defini o width como 100%
    boxSizing: 'border-box', // Garante que o padding não afeta o width total
  },
  boxButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  button: {
    padding: '10px',
    width: "30%",
    margin: '10px',
    backgroundColor: "#33b249",
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default AuthToken;
