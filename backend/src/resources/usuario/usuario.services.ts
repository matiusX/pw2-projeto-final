import { PrismaClient, Usuario } from '@prisma/client';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.types';
import { genSalt, hash } from 'bcryptjs';

const prisma = new PrismaClient();

export const createUsuario = async (usuario: CreateUsuarioDto,): Promise<Usuario> => {
  const salt = await genSalt(parseInt(process.env.SALT_ROUNDS!));
  const senha = await hash(usuario.senha, salt);

  return await prisma.usuario.create({
    data: { ...usuario, senha: senha },
  });
};

export const readUsuarios = async (): Promise<Usuario[]> => {
  return await prisma.usuario.findMany();
};

export const readUsuario = async (
  usuarioId: string,
): Promise<Usuario | null> => {
  return await prisma.usuario.findUnique({ where: { id: usuarioId } });
};

export const updateUsuario = async (
  usuarioId: string,
  usuario: UpdateUsuarioDto,
): Promise<Usuario> => {
  const salt = await genSalt(parseInt(process.env.SALT_ROUNDS!));
  const senha = await hash(usuario.senha, salt);

  return await prisma.usuario.update({
    where: { id: usuarioId },
    data: { ...usuario, senha: senha },
  });
};

export const deleteUsuario = async (usuarioId: string): Promise<void> => {
  await prisma.usuario.delete({ where: { id: usuarioId } });
};
