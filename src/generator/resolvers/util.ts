import { coerce } from "../../util/coercion"
// import { cypher, cypher1,  } from "../../util"

export function queryBuilder(queryOpts) {
  const {
    match,
    geo,
    order,
    filter,
    //search,
    skip,
    limit,
    where,
  } = queryOpts

  const cypherWhere = []
  const cypherQuery = []

  if (where) cypherWhere.push(where)

  cypherQuery.push(`MATCH ${match}`)

  // geo
  if (geo?.boundingBox) {
    const { southWest, northEast } = geo.boundingBox

    cypherQuery.push(`
        WITH node, point({ latitude: ${southWest.lat}, longitude: ${southWest.lng} }) AS southWest, point({ latitude: ${northEast.lat}, longitude: ${northEast.lng} }) AS northEast
        `)

    cypherWhere.push("node.geo > southWest")
    cypherWhere.push("node.geo < northEast")
  }

  // filter
  if (filter) {
    // console.log("FILTER", filter)
    Object.keys(filter).map((key) => {
      const val = filter[key]
      cypherWhere.push(`node.${key} = ${coerce(val)}`)
    })
  }

  // @todo move this into a filter query: name_search: "asdf"
  // if (search?.fields && search?.query) {
  //   const searchMaps = search.fields.map(
  //     (key) =>
  //       `node.${key} =~ '(?i)${search.query
  //         .replace(/[^\s\w]/g, "")
  //         .toLowerCase()}.*'`
  //   )
  //   cypherWhere.push(`(${searchMaps.join(" OR ")})`)
  // }

  if (cypherWhere.length > 0) {
    cypherQuery.push(`WHERE ${cypherWhere.join(" AND ")}`)
  }

  // @todo support multiple returns
  cypherQuery.push(`RETURN node`)

  // order
  if (order) cypherQuery.push(`ORDER BY node.${order}`)

  // pagination
  if (skip) cypherQuery.push(`SKIP ${skip}`)
  if (limit) cypherQuery.push(`LIMIT ${limit}`)

  return cypherQuery.join("\n")
}
