const BASE_URL = 'https://api.thecatapi.com/v1';

const API_KEY =
  'live_XHcdU6WEVcE286Qy9v95y3faKHkS1RqNqTnvdgoDtZNhGKEYKNZVP6GCOgZwSlHl';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`).then(resp => {
    if (!resp.ok) throw new Error(resp.statusText);
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: breedId,
  });
  return fetch(`${BASE_URL}/images/search?${searchParams}`).then(resp => {
    if (!resp.ok) throw new Error(resp.statusText);
    return resp.json();
  });
}
