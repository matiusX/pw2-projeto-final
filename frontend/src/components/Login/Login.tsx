import { useState, useContext } from "react";
import React from "react";
import { FormEvent } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import api from "@/utils/api";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { AuthContext } from "../../provider/AuthProvider";

function Login() {
  const {auth, setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const credenciais = {
      email,
      senha,
    };
    api
      .post("/login", credenciais, { withCredentials: true })
      .then((data) => {
        setError("");
        setAuth({ nome: data.data.nome, tipoUsuario: data.data.tipoUsuario });
        console.log(data);
        router.push("/produto");
      })
      .catch((err) => {
        if (err.response.status === 401)
          setError("Email e/ou senha inválidos !");
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Login de usuário</h1>
      <form onSubmit={onSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Email"
            sx={{ width: 300 }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Senha"
            sx={{ width: 300 }}
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ color: "red" }}>
            {error}
          </Typography>
        </Box>
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default Login;
