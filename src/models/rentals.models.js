import joi from 'joi';

const rentalsModel = joi.object({
  customerId: joi.number().greater(0).integer().required(),
  gameId: joi.number().greater(0).integer().required(),
  daysRented: joi.number().integer().required(),
});

export default rentalsModel;