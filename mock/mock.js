const mock = [
  {
    url: '/encodingInfo',
    method: 'get',
    response: () => {
      return {
        status: 200,
        message: 'success',
        data: 'getEncodingInfo mock success'
      }
    }
  }
]

export default mock
