const Joi = require('@hapi/joi');

const issueValidator = data => {
    const schema = Joi.object({
        title: Joi.string().required()
    });

    return schema.validate(data);
}

module.exports = issueValidator;
