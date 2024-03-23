/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response} from "express";
import { createProduto, ListProdutos, produtoAlreadyExists, readProduto, updateProduto, deleteProduto } from "./produto.services";

const index = async (req: Request, res : Response) => {
    try {
        const produtos = await ListProdutos();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json(err);
    }

};
const create = async (req: Request, res : Response) => {
    const produto = req.body;
    try {
      if (await produtoAlreadyExists(produto.nome)) {
        res.json({ msg: `Produto com o nome ${produto.nome} já existe.` });
      } else {
        const novoProduto = await createProduto(produto);
        res.status(201).json(novoProduto);
      }
    } catch (err) {
      res.status(500).json(err);
    }
};

const read = async (req: Request, res : Response) => {
    const { id } = req.params;
    try{
        const produto = await readProduto(id);
        if(!produto) res.status(404).json({ msg: `Produto com o id ${id} nao encontrado.` });
        res.status(200).json(produto);
    }catch(err){
        res.status(500).json(err);
    }
};

const update = async (req: Request, res : Response) => {
    const id = req.params.id;
    const produto = req.body;
  
    try {
      if (produto.nome && (await produtoAlreadyExists(produto.nome))) {
        return res
          .status(400)
          .json({ msg: `Produto com o nome ${produto.nome} já existe.` });
      }
  
      const produtoAtualizado = await updateProduto(id, produto);
      res.status(200).json(produtoAtualizado);
    } catch (err) {
      res.status(500).json(err);
    }

};
const remove = async (req: Request, res : Response) => {
    const id = req.params.id;

    try {
      const produtoDeletado = await deleteProduto(id);
  
      if (produtoDeletado === null) {
        res.status(404).json("produto nao encontrado");
      }
      res.status(200).json({ msg: 'Produto deletado com sucesso.' });
    } catch (err) {
      res.status(500).json(err);
    }

};

export default { index, create, read, update, remove };
