// import { useContext } from 'react'
// import AuthContext from 'common/contexts/JWTAuthContext'

// const useAuth = () => useContext(AuthContext)
const useAuth = () => ({ user: { name: "Mankala Soumya" }, logout: () => { console.log("loggout clicked") } })
export default useAuth
