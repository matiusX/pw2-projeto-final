import { PrismaClient, Produto } from "@prisma/client";
import { CreateProdutoDto, UpdateProdutoDto } from "./produto.types";

const prisma = new PrismaClient();

export const ListProdutos = async(): Promise<Produto[]> => {
    return await prisma.produto.findMany();
}

export const produtoAlreadyExists = async (nome: string): Promise<boolean> => {
    return !!(await prisma.produto.findUnique({ where: { nome: nome } }));
  };

export const readProduto = async (id: string): Promise<Produto | null> => {
    return await prisma.produto.findUnique({ where: { id: id } });
  };

export const createProduto = async (produto: CreateProdutoDto): Promise<Produto> => {
    return await prisma.produto.create({ data:produto });
};

export async function updateProduto(
    id: string,
    produto: UpdateProdutoDto,
  ): Promise<Produto> {
    return await prisma.produto.update({ where: { id: id }, data: produto });
  }
  
  export const deleteProduto = async (id: string): Promise<Produto | null> => {
    return await prisma.produto.delete({ where: { id: id } });
  };