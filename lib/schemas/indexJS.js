import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
type Asset @model {
  authorAvatar: [Author!]! @relation(name: "AssetAuthorAvatar")
  createdAt: DateTime!
  fileName: String!
  handle: String! @isUnique
  height: Float
  id: ID! @isUnique
  mimeType: String
  postCoverImage: [Post!]! @relation(name: "AssetPostCoverImage")
  size: Float
  updatedAt: DateTime!
  url: String! @isUnique
  width: Float
}

type Author @model {
  avatar: Asset @relation(name: "AssetAuthorAvatar")
  bibliography: String
  createdAt: DateTime!
  id: ID! @isUnique
  isPublished: Boolean! @defaultValue(value: false)
  name: String
  posts: [Post!]! @relation(name: "PostAuthorRelation")
  updatedAt: DateTime!
}

type File @model {
  contentType: String!
  createdAt: DateTime!
  id: ID! @isUnique
  name: String!
  secret: String! @isUnique
  size: Int!
  updatedAt: DateTime!
  url: String! @isUnique
}

enum Locales {
  EN_US
}

type Post @model {
  authors: [Author!]! @relation(name: "PostAuthorRelation")
  content: String
  coverImage: Asset @relation(name: "AssetPostCoverImage")
  createdAt: DateTime!
  dateAndTime: DateTime
  id: ID! @isUnique
  isPublished: Boolean! @defaultValue(value: false)
  slug: String @isUnique
  tags: [String!]
  title: String
  updatedAt: DateTime!
}

type User @model {
  createdAt: DateTime!
  id: ID! @isUnique
  updatedAt: DateTime!
}
`
