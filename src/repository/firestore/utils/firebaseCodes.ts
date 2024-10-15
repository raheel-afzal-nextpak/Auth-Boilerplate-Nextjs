export const firebaseAuthErrorCodes: { [key: string]: string } = {
    'auth/successful': 'login Successfully!',
    'auth/app-deleted':
        'The Firebase Authentication instance you are trying to use has been deleted.',
    'auth/app-not-authorized':
        "The app is not authorized to use Firebase Authentication with the provided API key. Review the API key's settings in the Firebase console.",
    'auth/argument-error':
        'An invalid argument was provided to a Firebase Authentication method.',
    'auth/email-already-in-use':
        'The email address is already in use by another account.',
    'auth/expired-action-code': 'The action code or link has expired.',
    'auth/invalid-action-code':
        'The action code is invalid. This can happen if the code is malformed or has already been used.',
    'auth/user-disabled':
        'The user account has been disabled by an administrator.',
    'auth/user-not-found':
        'There is no user record corresponding to this identifier. The user may have been deleted.',
    'auth/invalid-user-token':
        "The user's credential is no longer valid. The user must sign in again.",
    'auth/weak-password':
        'The password is too weak. The password must be 6 characters long or more.',
    'auth/wrong-password':
        'The password is invalid for the given email, or the account corresponding to the email does not have a password set.',
    'auth/invalid-email': 'The email address is badly formatted.',
    'auth/account-exists-with-different-credential':
        'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
    'auth/invalid-credential':
        'The credential provided is malformed or has expired.',
    'auth/operation-not-allowed':
        'The type of account corresponding to this credential is not enabled. Enable it in the Firebase Console, under the Auth tab.',
    'auth/requires-recent-login':
        'Updating a password, email, or linking/unlinking an account requires a recent login.',
    'auth/too-many-requests':
        'Too many requests were made to a server method. Try again later.',
    'auth/captcha-check-failed':
        'The reCAPTCHA response provided by the user is invalid or has expired.',
    'auth/web-storage-unsupported':
        'The browser does not support web storage or the user has disabled them.',
    'auth/invalid-phone-number':
        'The phone number is formatted incorrectly. Ensure it includes a country code and is a valid phone number.',
    'auth/invalid-verification-code':
        'The verification code used to verify the phone number is incorrect.',
    'auth/invalid-verification-id':
        'The verification ID used to verify the phone number is incorrect or has expired.',
    'auth/missing-phone-number':
        'No phone number was provided for phone number sign-in.',
    'auth/credential-already-in-use':
        'This credential is already associated with a different user account.',
    'auth/timeout':
        'The operation has timed out, typically due to poor network conditions. Encourage the user to retry.',
    'auth/missing-continue-uri':
        'A valid URL must be provided in the request to this method.',
    'auth/invalid-continue-uri':
        'The continue URL provided in the request is invalid.',
    'auth/unauthorized-continue-uri':
        'The domain of the continue URL is not whitelisted in the Firebase console.',
    'auth/invalid-dynamic-link-domain':
        'The provided dynamic link domain is not configured or authorized for the current project.',
    'auth/claims-too-large': 'The custom claim payload provided is too large.',
    'auth/id-token-expired':
        'The Firebase ID token has expired. The user must sign in again.',
    'auth/id-token-revoked':
        'The Firebase ID token has been revoked. The user must sign in again.',
    // You can add more specific codes here based on your application needs or Firebase updates.
}
