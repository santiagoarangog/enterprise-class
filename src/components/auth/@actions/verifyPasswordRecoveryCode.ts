import Store from '@/Store'

export default async function verifyPasswordRecoveryCode(
  email: string,
  code: string
): Promise<any> {
  try {
    const http = Store().getHttp()
    return await http.post('verify-password-recovery-code', { email, code })
  } catch (error: any) {
    console.log(error.message)
  }
}
