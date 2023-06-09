import { defaultAvatar } from "../../../../src/utils";

interface Prop {
  userName: string;
  userProfilePictureUrl: string
}

export const Avatar = (props: Prop) => {
  const {userName, userProfilePictureUrl} = props;
  return <div className="avatar">
    <img src={userProfilePictureUrl === null
      ? defaultAvatar
      : userProfilePictureUrl
    } alt={userName !== null ? `${userName} profile` : 'User Profile'} />
  </div>
}
