import Router from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import {setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../services/apiClient'

type User = {
  email: string,
  permissions: string[],
  roles: string[]
  token?: string
  refreshToken?: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user: User
}

type AuthProviderProps = {
  children: ReactNode
}

export function signOut(){
  destroyCookie(undefined, 'dashgo.token')
  destroyCookie(undefined, 'dashgo.refreshToken')
  Router.push('/')
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps){
  const [user, setUser] = useState<User>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const {'dashgo.token': token} = parseCookies()

    if(token){
        api.get<User>('/me')
          .then(response => {
            const {email, permissions, roles} = response.data
            setUser({
              email,
              permissions,
              roles
            })
          }).catch(() => {
            if(process.browser){
              signOut()
            }
          })   
    } 
  },[])

  async function signIn({ email, password }: SignInCredentials){
    try {
      const response = await api.post<User>('sessions', {
        email,
        password
      })

      const {token, refreshToken, permissions, roles} = response.data

      setCookie(undefined, 'dashgo.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'dashgo.refreshToken', refreshToken,{
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      
      setUser({
        email,
        permissions: permissions,
        roles: roles
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
    } catch (err) {
      if(process.browser){
        signOut()
        alert('Usuário ou senha incorreta')
      }
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}