import axios from 'axios';

export const graphqlQuery = `query ($username: String!, $number_of_users: Int!, $number_of_repos: Int!) {
    search(query: $username, type: USER, first: $number_of_users, ) {
      nodes {
        ... on User {
          name
          login
          avatarUrl
          bio
          location
          repositories(last: $number_of_repos) {
            nodes {
              name
              description
              stargazerCount
            }
          }
        }
      }
    }
  }`;

export const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
    },
});