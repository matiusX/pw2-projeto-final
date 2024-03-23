import React, { FormEvent, useState } from 'react'
import {TextField} from '@mui/material'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SignUpDto } from '@/types/auth';
import api from '@/utils/api';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


function SignUp() {
    const [nome, setNome] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [confirmSenha, setConfirmSenha] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [viewSenha, setViewSenha] = useState<boolean>(false);
    const [viewConfirmSenha, setViewConfirmSenha] = useState<boolean>(false);
    
    const router = useRouter()
 
    const onSubmit = (e: FormEvent) => {
      e.preventDefault()
      if(senha !== confirmSenha) setError("Senhas diferentes !")
      else{
        const credenciais: SignUpDto = {
          nome: nome!,
          email: email!,
          senha: senha!,
        };
        api.post("/signup", credenciais).then((data) => {
          router.push("/produto");
        });
      } 
    }

    return (
      <>
        <h1>Criação de Conta</h1>
        <form onSubmit={onSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Nome"
              sx={{ width: 300 }}
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Box>
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
              type={viewSenha ? "text" : "password"}
              onChange={(e) => setSenha(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setViewSenha(!viewSenha);
                      }}
                    >
                      {viewSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <TextField
              label="Confirme a senha"
              required
              value={confirmSenha}
              sx={{ width: 300 }}
              type={viewConfirmSenha ? "text" : "password"}
              onChange={(e) => setConfirmSenha(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setViewConfirmSenha(!viewConfirmSenha);
                      }}
                    >
                      {viewConfirmSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
      </>
    );


}

export default SignUp