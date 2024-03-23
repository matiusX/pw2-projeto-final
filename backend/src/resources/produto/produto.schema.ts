import Joi from "joi";

const produtoSchema = Joi.object().keys({
  nome: Joi.string().min(3).max(40).required(),
  preco: Joi.number().required(),
  estoque: Joi.number().integer().required(),
});

export default produtoSchema;
