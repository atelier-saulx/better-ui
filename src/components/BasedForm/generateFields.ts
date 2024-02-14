// if query || fields change

// const [query, setQuery] = React.useState<any>()

// query can be an fn

// const { data: item, loading, checksum } = useQuery('db', query)

// React.useEffect(() => {
//   async function constructQuery() {
//     const type = schema.prefixToTypeMapping[id.substring(0, 2)]
//     const fields = schema.types[type].fields

//     const query = {
//       $id: id,
//       $language: language,
//       $all: true,
//     }

//     function walkFields(fields: BasedSchemaType['fields'], query: any) {
//       for (const field in fields) {
//         if (fields[field].type === 'reference') {
//           query[field] = { $all: true }
//         }
//         if (fields[field].type === 'references') {
//           query[field] = { $all: true, $list: true }
//         }
//         if (fields[field].type === 'object') {
//           query[field] = {
//             $all: true,
//           }
//           walkFields(
//             (fields[field] as BasedSchemaFieldObject).properties,
//             query[field],
//           )
//         }
//       }
//     }

//     walkFields(fields, query)
//     setQuery(query)
//   }

//   if (!schema) return
//   constructQuery()
// }, [id, schema, language])

// const fields = React.useMemo(() => {
//   if (!item) return

//   let fields: BasedSchemaType['fields']

//   if (schema.types[item.type]) {
//     fields = schema.types[item.type].fields
//   }

//   if (includedFields) {
//     return includedFields.reduce((newFields, field) => {
//       newFields[field] = fields[field]
//       return newFields
//     }, {})
//   }

//   if (excludeCommonFields) {
//     for (const key in fields) {
//       if (
//         [
//           'parents',
//           'descendants',
//           'aliases',
//           'ancestors',
//           'children',
//           'type',
//         ].includes(key)
//       ) {
//         delete fields[key]
//       }
//     }
//   }

//   return fields
// }, [item, schema, includedFields])

// if (!fields || !schema) return

// onFileUpload hanlder
