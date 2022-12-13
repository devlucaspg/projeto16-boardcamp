import joi from "joi";

const customersModel = joi.object({
  name: joi.string().required(),
  cpf: joi
    .string()
    .pattern(new RegExp(`([0-9]{3})[\.]?([0-9]{3})[\.]?([0-9]{3})[\-]?([0-9]{2})`))
    .required(),
  phone: joi
    .string()
    .min(10)
    .max(15)
    .pattern(new RegExp(`(\(([0-9]{2})\)\s?)?([0-9]{4,5})[\-]?([0-9]{4})`))
    .required(),
  birthday: joi
    .date()
    .greater('1-1-1900')
    .less('12-31-2004')
    .required(),
});

export default customersModel;
