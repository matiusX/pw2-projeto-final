if [ "$NODE_ENV" = "production" ]; then
  echo "Frontend inicializado em ambiente de produção"
  npm run build
  npm start
else
  echo "Frontend inicializado em ambiente de desenvolvimento"
  npm run dev
fi
