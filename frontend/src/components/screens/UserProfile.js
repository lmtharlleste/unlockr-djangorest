import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    photoUrl: "https://via.placeholder.com/150",
    phone: ""
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      // Se não houver token, redirecionar para a página de login ou tratamento adequado
      navigate('/access-token');
    } else {
      axios.get('http://127.0.0.1:8000/api/v1/accounts/user/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        const userData = response.data;
        setUser({
          ...user,
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
          phone: userData.phone
        });
      })
      .catch(error => {
        console.error("Erro ao buscar dados do usuário:", error);
        // Tratar o erro adequadamente
      });
    }
  }, [navigate]);

  // Estilos CSS
  const styles = {
    container: {
      textAlign: "center",
      marginTop: "20px",
      color: "white",
      fontFamily: "'Arial', sans-serif",
    },
    image: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      marginBottom: "10px",
      border: "3px solid white",
    },
    userInfo: {
      fontSize: "18px",
      lineHeight: "1.6"
    },
    backButton: {
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      transition: "background-color 0.3s",
    }
  };

  // Função para lidar com o clique no botão 'Voltar'
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <img src={user.photoUrl} alt="User" style={styles.image} />
      <h1>{`${user.firstName} ${user.lastName}`}</h1>
      <div style={styles.userInfo}>
        <p>Email: {user.email}</p>
        <p>Telefone: {user.phone}</p>
      </div>
      <button 
        style={styles.backButton} 
        onClick={handleBackClick}
        onMouseOver={e => e.target.style.backgroundColor = "#0056b3"}
        onMouseOut={e => e.target.style.backgroundColor = "#007bff"}
      >
        Voltar
      </button>
    </div>
  );
};

export default UserProfile;
