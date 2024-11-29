export default async function fetchData() {
  const url = 'https://paneladminmui-default-rtdb.firebaseio.com/user/login.json';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}