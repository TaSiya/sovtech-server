import { ApolloServer, gql } from 'apollo-server'
import fetch from 'node-fetch'

const typeDefs = gql`
  type Person {
    name: String
    height: Int
    mass: Int
    gender: String
    homeworld: String
  }

  type Query {
    people: [Person]
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
    people: async () => {
      const peopleDataPromiseResponse = await fetch(baseUrl + 'people/')
      const peopleData : any = await peopleDataPromiseResponse.json()
      return peopleData.results
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen()
.then(({url}) => {
  console.log("Listening at ... ", url)
})