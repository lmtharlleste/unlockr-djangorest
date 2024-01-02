import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    // Estados para os campos do formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');

    // Handler para lidar com o registro
    const handleRegister = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/v1/accounts/register/', {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                phone,
                Profession: profession
            });

            // Tratamento após o registro bem-sucedido
            alert('Registro bem-sucedido!');
            navigate('/user-profile');
        } catch (error) {
            console.error('Erro no registro:', error);
            alert(`Erro no registro: ${error.response.data.detail}`);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Registro</h2>
            <div style={styles.subcontainer}>
                <div style={styles.form}>
                    <input type="text" placeholder="Seu email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
                    <input type="password" placeholder="Sua senha" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} />
                    <input type="text" placeholder="Primeiro Nome" value={firstName} onChange={e => setFirstName(e.target.value)} style={styles.input} />
                    <input type="text" placeholder="Sobrenome" value={lastName} onChange={e => setLastName(e.target.value)} style={styles.input} />
                    <input type="text" placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} style={styles.input} />
                    <input type="text" placeholder="Profissão" value={profession} onChange={e => setProfession(e.target.value)} style={styles.input} />
                    <button type="button" onClick={handleRegister} style={styles.button}>Registrar</button>
                </div>
            </div>
        </div>
    );
};

// Estilos para o formulário
const styles = {
    container: {
        textAlign: 'center',
        marginTop: '20px'
    },
    title: {
        fontSize: '1.8em',
        marginBottom: '10px'
    },
    subcontainer: {
        width: '700px',
        margin: '100px',
        padding: '20px',
        borderRadius: '5px',
        backgroundColor: '#f0f0f0'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
    },
    input: {
        padding: '12px',
        marginBottom: '12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '90%'
    },
    button: {
        padding: '5px',
        margin: '5px',
        with: "100px",
        backgroundColor: '#33b249',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        color: 'white'
    }
};

export default Register;
