const loginPayload = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
  },
  required: [
    'email',
    'password'
  ]
}

module.exports = loginPayload;