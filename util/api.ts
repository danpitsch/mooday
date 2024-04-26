const createURL = (path) => window.location.origin + path

export const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const deleteEntry = async (id) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: 'DELETE',
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const newEntry = async () => {
  console.log("/util/api.tx > newEntry() > BASE_URL_APP:", process.env.BASE_URL_APP)
  console.log("/util/api.tx > newEntry() > BASE_URL_API:", process.env.BASE_URL_API)
  console.log("/util/api.tx > newEntry() > window.location.origin:", window.location.origin)

  const res = await fetch(
    new Request(createURL('/api/entry'), {
      method: 'POST',
      body: JSON.stringify({ content: 'new entry' }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const updateEntry = async (id, updates) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ updates }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}
