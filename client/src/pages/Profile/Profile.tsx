import { useAuth } from '../../hooks/useAuth'
import AuthProfile from './AuhProfile'
import UnAuthProfile from './UnAuthProfile'

const Profile: React.FC = () => {
  const auth = useAuth()

  if (!auth.isLogin()) {
    return <AuthProfile />
  }

  return <UnAuthProfile />
}

export default Profile
