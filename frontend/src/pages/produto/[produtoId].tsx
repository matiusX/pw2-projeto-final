import React from 'react';
import { useRouter } from 'next/router';
import ProdutoCard from '@/components/produto/ProdutoCard';

function ProdutoCardPage() {
  const router = useRouter();
  const id = router.query.produtoId as string;
  return <ProdutoCard id={id} />;
}

export default ProdutoCardPage;