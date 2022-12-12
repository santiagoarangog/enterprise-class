export default interface AccountVerificationstContracti18nContract {
  accountAlreadyVerified: string
  accountAlreadyVerifiedMessage: string
  verifyYourAccount: string
  checkYourEmail: string
  understood: string
}

export interface ExpiredLinki18nContract {
  expiredLink: string
  expiredLinkMessage: string
  expiredLinkButton: string
  notification: {
    title: string
    message: string
  }
}
