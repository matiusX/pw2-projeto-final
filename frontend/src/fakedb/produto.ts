import { Produto } from "@/types/produto";

const produtos : Produto[] = [
    {id: 1, nome: "computador", preco: 5000, estoque: 40},
    {id: 2, nome: "rasperry pi", preco: 2381, estoque: 2},
    {id: 3, nome: "garrafa termica", preco: 612, estoque: 13},
    {id: 4, nome: "teclado mecanico", preco: 459, estoque: 67},
    {id: 5, nome: "mouse sem fio", preco: 267, estoque: 90},

];

export const getOneProduto = (id: number): Produto | undefined => {
    return produtos.find((prod) => prod.id === id);
}

export const getAllProdutos = () => produtos;