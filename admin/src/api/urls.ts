export const baseURL = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:3000'

export default {
  authors: `${baseURL}/authors.json`
}