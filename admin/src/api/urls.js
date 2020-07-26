export const baseURL = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:3000'

export default {
  authors: `${baseURL}/authors`,
  nationalities: `${baseURL}/nationalities`,
  surnames: `${baseURL}/surnames`,
  secret_orders: `${baseURL}/secret_orders`,
  upload: `${baseURL}/api/v1/direct_uploads`,
  uploadTemplate: `${baseURL}/rails/active_storage/blobs/:signed_id/*filename`,
}