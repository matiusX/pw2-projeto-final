
import Link from 'next/link';
import api from '@/utils/api';
import { useEffect, useState } from 'react';
import { Produto } from '@/types/produto';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import styles from '../../pages/produto/produto.module.css';


function ProdutoIndex() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    api.get('/produto').then((data) => {
      setProdutos(data.data);
    });
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ marginTop: 0 }}>Produtos</h1>
        <Button
          component={Link}
          href='/produto/create'
          variant='contained'
          style={{ height: 30 }}
        >
          <AddIcon />
        </Button>
      </div>

      <ul>
        {produtos.map((prod) => (
          <li key={prod.id} className={styles.listaProdutos}>
            <Link href={`/produto/${prod.id}`}>{prod.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProdutoIndex;
