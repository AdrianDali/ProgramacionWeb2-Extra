// src/pages/main.jsx
import { Container, Typography, Button, Box, Paper, Divider } from '@mui/material';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

const Main = () => {
  const router = useRouter();

  const navigateToCifradoCesar = () => {
    router.push('/cifrado/cesar');
  };

  const navigateToCifradoVigenere = () => {
    router.push('/cifrado/vigenere');
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
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box 
          sx={{ 
            width: "100%", 
            mb: "3rem", 
            p: 4, 
            backgroundColor: "#ffffff", 
            borderRadius: 2, 
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" 
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: "#333" }}>
            Bienvenido al Menú Principal de Cifrado
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.2rem', color: "#555" }}>
            Explora los métodos de cifrado y aprende sobre el cifrado César y Vigenère. Ambos son técnicas clásicas de encriptación que permiten proteger la información mediante el uso de claves y desplazamientos.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" gutterBottom sx={{ fontSize: '1rem', color: "#666" }}>
            Los cifrados César y Vigenère son populares en el estudio de la criptografía debido a su simplicidad y sus diferencias en el manejo de claves. A continuación, elige un método para conocer más detalles sobre cómo funciona y para ponerlo en práctica.
          </Typography>
        </Box>

        {/* Sección de Cifrado César */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: "#e3f2fd", borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: "#1e88e5" }}>
            Cifrado César
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "#0d47a1" }}>
            El cifrado César es uno de los métodos de cifrado más antiguos y fue utilizado por Julio César para enviar mensajes secretos. Consiste en desplazar cada letra del texto un número fijo de posiciones en el alfabeto.
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ color: "#0d47a1" }}>
            Por ejemplo, con un desplazamiento de 3, la letra "A" se convierte en "D", "B" en "E", y así sucesivamente. Este método es sencillo, pero puede ser fácilmente descifrado con técnicas modernas.
          </Typography>
          <Button variant="contained" color="primary" onClick={navigateToCifradoCesar}>
            Ir a Cifrado César
          </Button>
        </Paper>

        {/* Sección de Cifrado Vigenère */}
        <Paper elevation={3} sx={{ p: 4, backgroundColor: "#ffebee", borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: "#e53935" }}>
            Cifrado Vigenère
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "#b71c1c" }}>
            El cifrado Vigenère es una técnica de cifrado más avanzada que utiliza una palabra clave para determinar el desplazamiento de cada letra. Este método es una forma de cifrado polialfabético.
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ color: "#b71c1c" }}>
            A diferencia del cifrado César, donde el desplazamiento es constante, en el cifrado Vigenère el desplazamiento varía según la letra de la clave. Esto lo hace más robusto y difícil de romper en comparación con el cifrado César.
          </Typography>
          <Button variant="contained" color="secondary" onClick={navigateToCifradoVigenere}>
            Ir a Cifrado Vigenère
          </Button>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Main;
