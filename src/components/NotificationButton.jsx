import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const NotificationButton = ({ idClient }) => {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/email/validateSubscribe/${idClient}`);
        setSubscribed(response.data.length > 0);
      } catch (error) {
        /*console.error('Error validando suscripciones en AWS:', error);*/
      }
    };

    checkSubscription();
  }, [idClient]);

  const handleSubscription = async () => {
    try {
      if (subscribed) {
        /*console.log('Ya está suscrito a notificaciones.');*/
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/email/subscribe/${idClient}`);
        setSubscribed(true);
        /*console.log('Suscripción a notificaciones realizada.');*/
      }
    } catch (error) {
      /*console.error('Error realizando la suscripción a las notificaciones en AWS:', error);*/
    }
  };

  return (
    <Button
      variant={subscribed ? "outline-secondary" : "outline-primary"}
      size="sm"
      onClick={handleSubscription}
    >
      {subscribed ? "Notificaciones habilitadas" : "Habilitar notificaciones"}
    </Button>
  );
};

export default NotificationButton;