export interface User {
  id: string
  name: string
  email: string
  emailVerified: string | null
  image: string | null
}

export interface Message {
  guestbook: {
    id: string
    message: string
    authorId: string
    createdAt: string
    updatedAt: string
  }
  user: User
}
