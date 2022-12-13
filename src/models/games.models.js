import joi from "joi";

const gamesModel = joi.object({
  name: joi.string().required(),
  image: joi
    .string()
    //.uri()
    //.pattern(new RegExp("https?://(www.)?[^/]*?/?([^$]*?$)?"))
    .required(),
  stockTotal: joi.number().integer().greater(0).required(),
  categoryId: joi.number().integer().greater(0).required(),
  pricePerDay: joi.number().integer().greater(0).required(),
});

export default gamesModel;
