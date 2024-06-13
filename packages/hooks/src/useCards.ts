import { useCookies } from 'react-cookie';

const useCards = (apiUrl: string) => {
  const [cookies] = useCookies(['70k3n']);

  const postCard = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = document.getElementById('add-card-form') as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(`${apiUrl}/addCard`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${cookies['70k3n']}`,
        },
      });

      if (response.ok) {
        window.location.href = '/addCardSuccess';
      }
    } catch (e) {
      console.error(e);
    }
  };

  const editCard = async (e: React.FormEvent, data: any, system: string) => {
    e.preventDefault();

    const form = document.getElementById('edit-card-form') as HTMLFormElement;
    const formData = new FormData(form);

    if (data?.user_id) {
      formData.append('user_id', data.user_id);
      formData.append('id', data.id as string);
      formData.append('system', system);
    }

    try {
      const response = await fetch(`${apiUrl}/putCard`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${cookies['70k3n']}`,
        },
      });

      if (response.ok) {
        window.location.href = '/editCardSuccess';
      }
    } catch (e) {
      console.error(e);
    }
  }

  const deleteCard = async (id: string | number) => {
    try {
      const response = await fetch(`${apiUrl}/deleteCard`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies['70k3n']}`,
        },
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        return true;
      } else {
        console.error('Failed to delete the card.');
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return {
    postCard,
    editCard,
    deleteCard,
  };
}

export default useCards;