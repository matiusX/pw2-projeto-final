/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response} from "express";
import {createUsuario,readUsuarios,readUsuario, updateUsuario,deleteUsuario,} from './usuario.services';
import { StatusCodes } from 'http-status-codes';


const index = async (req: Request, res : Response) => {
    try {
        const usuarios = await readUsuarios();
        res.status(StatusCodes.OK).json(usuarios);
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      }
};
const create = async (req: Request, res : Response) => {
    const usuario = req.body;
    try {
      const novoUsuario = await createUsuario(usuario);
      res.status(StatusCodes.CREATED).json(novoUsuario);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
const read = async (req: Request, res : Response) => {
    const usuarioId = req.params.id;

    try {
      const usuario = await readUsuario(usuarioId);
      res.status(StatusCodes.OK).json(usuario);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }    
};
const update = async (req: Request, res : Response) => {
    const usuarioId = req.params.id;
    const updatedUsuario = req.body;
  
    try {
      const usuario = await updateUsuario(usuarioId, updatedUsuario);
      res.status(StatusCodes.OK).json(usuario);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }    
};
const remove = async (req: Request, res : Response) => {
    const usuarioId = req.params.id;

    try {
      await deleteUsuario(usuarioId);
      res.status(StatusCodes.OK).json({ msg: 'Usuário deletado' });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }    
};

export default { index, create, read, update, remove };
