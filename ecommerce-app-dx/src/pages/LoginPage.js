import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button } from 'antd';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/dev/login', { "login": username, "password": password });

      if (response.status === 200) {
        localStorage.setItem('user', response.data.id)
        navigate('/');
      } else {
        // Lidar com outros status de resposta (por exemplo, exibir mensagem de erro)
        // ...
      }
    } catch (error) {
      console.error('Erro no login:', error);
      // Lidar com erros de requisição (por exemplo, exibir mensagem de erro)
      // ...
    }
  };

  return (
    <Card title="Login">
      <Form>
        <Form.Item label="Username">
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleLogin}>Login</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginPage;
