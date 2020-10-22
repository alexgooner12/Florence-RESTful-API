const Joi = require('@hapi/joi');

const issueValidator = data => {
    const schema = Joi.object({
        title: Joi.string().required(),
        status: Joi.string(),
        files: Joi.array(),
        comments: Joi.array()
    });

    return schema.validate(data);
}

module.exports = issueValidator;
