if [ "$NODE_ENV" = "production" ]; then
  echo "API inicializada em ambiente de produção"
  npx prisma migrate deploy
  npm stard:prod
else
  echo "API inicializada em ambiente de desenvolvimento"
  npx prisma migrate deploy
  npm run start
fi