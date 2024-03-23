import api from '@/utils/api';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import ProdutoForm from './ProdutoForm';
import { Produto, UpdateProdutoDto } from '@/types/produto';

interface Props {
  id: string;
}

function ProdutoUpdate({ id }: Props) {
  const router = useRouter();
  const [produto, setProduto] = useState<Produto>();

  useEffect(() => {
    api.get(`/produto/${id}`).then((data) => {
      setProduto(data.data);
    });
  }, [id]);

  const handleSubmit = (produto: UpdateProdutoDto) => {
    api
      .put(`/produto/${id}`, produto)
      .then(() => {
        router.push(`/produto/${id}`);
      })
      .catch((err) => console.log(err));
  };

  if (!produto) return <>Carregando...</>;

  return (
    <div>
      <h2>Atualização de Produto</h2>
      <ProdutoForm handleSubmit={handleSubmit} produto={produto} />
    </div>
  );
}

export default ProdutoUpdate;
