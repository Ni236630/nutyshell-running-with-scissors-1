import { useFriendRequests } from './friendRequestDataProvider.js';

export const FriendRequests = () => {
  const requests = useFriendRequests();
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));

  const thisUserRequests = requests.filter(
    (req) => req.recipientId === activeUserId && req.isAccepted === false
  );
};
