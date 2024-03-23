import { CreateProdutoDto, Produto } from '@/types/produto';
import { Box, Button, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';

interface Props {
  handleSubmit: (produto: CreateProdutoDto) => void;
  produto?: Produto;
}

function ProdutoForm({ handleSubmit, produto }: Props) {
  const [nome, setNome] = useState<string>(produto ? produto.nome : '');
  const [preco, setPreco] = useState<number | undefined>(
    produto ? produto.preco : undefined
  );
  const [estoque, setEstoque] = useState<number | undefined>(
    produto ? produto.estoque : undefined
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const produto = { nome: nome!, preco: preco!, estoque: estoque! };
    handleSubmit(produto);
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label='Nome'
          required
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label='Preço'
          required
          type='number'
          value={preco}
          onChange={(e) => {
            setPreco(parseFloat(e.target.value));
          }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label='Estoque'
          required
          type='number'
          value={estoque}
          onChange={(e) => {
            setEstoque(parseInt(e.target.value));
          }}
        />
      </Box>
      <Button type='submit' variant='contained'>
        Enviar
      </Button>
    </form>
  );
}

export default ProdutoForm;
