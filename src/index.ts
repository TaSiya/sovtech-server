import { ApolloServer, gql } from 'apollo-server'
import fetch from 'node-fetch'

const typeDefs = gql`
  type Person {
    name: String
    gender: String
    homeworld: String
    mass: String  
    height: String   
  }

  type Query {
    people(page: Int): [Person]
    searchByName(name: String!): Person!
  }
`

type Person = {
  name: String
  height: number
  mass: number
  gender: String
  homeworld: String
}

const baseUrl = 'https://swapi.dev/api/'

const resolvers = {
  Query: {
    people: async (root, {page}: {page: number}) => {
      const peopleDataPromiseResponse = await fetch(baseUrl + 'people/?page=' + (page ? page : 1) )
      const peopleData : any = await peopleDataPromiseResponse.json()
      return peopleData.results 
    }, 
    searchByName: async (root, {name} : {name: string}) => {
      const personDataPromiseResponse = await fetch(baseUrl + 'people/?search='+ name)
      const personData : any = await personDataPromiseResponse.json()
      return personData.results[0]
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen(process.env.PORT || 2020)
.then(({url}) => {
  console.log("Listening at ... ", url)
})