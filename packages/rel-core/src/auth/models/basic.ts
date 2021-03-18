import { Fields } from "../../property"
import { Module } from "../../types"
const { string, type } = Fields

export default {
  schema: {
    Auth: {
      id: false,
      timestamps: false,
      input: false,
      fields: {
        token: string().required(),
        user: type("User").required(),
      },
    },
    User: {
      fields: {
        name: string().required(),
      },
    },
  },
} as Module
