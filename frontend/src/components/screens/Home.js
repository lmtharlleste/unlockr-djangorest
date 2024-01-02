import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faShieldAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="center-container">
        <button onClick={() => navigate('/access-token')} className="button">
          <FontAwesomeIcon icon={faKey} /> Access Token
        </button>
        <button onClick={() => navigate('/double-factory')} className="button">
          <FontAwesomeIcon icon={faShieldAlt} /> Duplo Fator
        </button>
      </div>
      <div className="center-container">
        <button onClick={() => navigate('/email-password')} className="button">
          <FontAwesomeIcon icon={faEnvelope} /> Email e Senha
        </button>
        <button onClick={() => navigate('/phone-password')} className="button">
          <FontAwesomeIcon icon={faPhone} /> Telefone e Senha
        </button>
      </div>
    </div>
  );
};

export default Home;
