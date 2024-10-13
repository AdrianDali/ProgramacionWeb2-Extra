// src/pages/main.jsx
import { useState } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import axios from 'axios';
import Layout from '../../components/Layout';

const Main = () => {
  const [mensaje, setMensaje] = useState('');
  const [desplazamiento, setDesplazamiento] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/cifrado/vigenere/', {
        mensaje,
        clave: parseInt(desplazamiento),
      });
      setResultado(response.data.resultado);
    } catch (error) {
      console.error('Error al consumir el API:', error);
    }
  };

  return (
    <Layout>
      <Container
        maxWidth={false}
        sx={{
          flexGrow: 1,
          overflow: "auto",
          py: 3,
          height: "90%",
        }}
      >
        <Box sx={{ width: "100%", mb: "3rem" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Bienvenido a Cifrado
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Mensaje"
            variant="outlined"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Desplazamiento"
            variant="outlined"
            type="number"
            value={desplazamiento}
            onChange={(e) => setDesplazamiento(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Box>

        {resultado && (
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Mensaje Original</strong></TableCell>
                  <TableCell><strong>Desplazamiento</strong></TableCell>
                  <TableCell><strong>Resultado</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{mensaje}</TableCell>
                  <TableCell>{desplazamiento}</TableCell>
                  <TableCell>{resultado}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Layout>
  );
};

export default Main;
