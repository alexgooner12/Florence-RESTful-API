const Joi = require('@hapi/joi');
const { statusValues } = require('./constants');

const issueValidator = data => {
    const schema = Joi.object({
        title: Joi.string().required(),
        status: Joi.string().default(statusValues.INCOMPLETE),
        files: Joi.array().default([]),
        comments: Joi.boolean().default([])
    });

    return schema.validate(data);
}

module.exports = issueValidator;
