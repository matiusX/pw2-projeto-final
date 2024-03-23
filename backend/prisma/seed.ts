import { TiposUsuarios } from "./../src/resources/tipoUsuario/tipoUsuario.constants";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.tipoUsuario.createMany({
    data: [
      { id: TiposUsuarios.ADMIN, rotulo: 'admin' },
      { id: TiposUsuarios.CLIENT, rotulo: 'client' },
    ],
    skipDuplicates: true,
  });
}

seed()
  .then(async () => {
    prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    prisma.$disconnect();
  });
  