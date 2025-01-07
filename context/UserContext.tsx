import React, { createContext, useState } from 'react'

export const UserContext = createContext<any>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({ username: 'JohnDoe' })

  const logout = () => {
    setUser(null)
    console.log('User logged out')
  }

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  )
}
