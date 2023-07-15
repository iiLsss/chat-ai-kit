import bcrypt from 'bcrypt'

export async function hashPassword(password: string | Buffer) {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}


export async function checkPassword(inputPassword: string , hashedPassword: string) {
  const match = await bcrypt.compare(inputPassword, hashedPassword)
  return match
}