const Joi = require('@hapi/joi');

const issueValidator = data => {
    const schema = Joi.object({
        title: Joi.string().required(),
        isCompleted: Joi.boolean(),
        isPending: Joi.boolean(),
        files: Joi.array().default([]),
        comments: Joi.boolean().default([])
    });

    return schema.validate(data);
}

module.exports = issueValidator;
