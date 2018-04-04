import { weaveSchemas } from 'graphql-weaver'

async function WeaveSchemas () {
  const PRIMARY_API = 'https://api.graphcms.com/simple/v1/cjfipt3m23x9i0190pgetwf8c'
  const SECONDARY_API = 'https://api.graphcms.com/simple/v1/cjfipwwve7vl901427mf2vkog'

  const schema = await weaveSchemas({
    endpoints: [
      {
        namespace: 'primary',
        typePrefix: 'Primary',
        url: PRIMARY_API
      },
      {
        namespace: 'secondary',
        typePrefix: 'Secondary',
        url: SECONDARY_API
      }
    ]
  })

  return schema
}

const schemaWeaver = WeaveSchemas()
export default schemaWeaver
