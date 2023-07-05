const { Router } = require('express');
const dogsRouter = Router();

//handlers
const {getDogsHandler, getDogHandler, postDogHandler, getDefaultImageHandler} = require('../handlers/dogsHandlers')

//Validations
const {postDogValidate} = require('../validation/dogsValidation')

dogsRouter.get('/default-image', getDefaultImageHandler);

dogsRouter.get('/', getDogsHandler);

dogsRouter.get('/:id', getDogHandler);

dogsRouter.post('/', postDogValidate, postDogHandler);

module.exports = dogsRouter;