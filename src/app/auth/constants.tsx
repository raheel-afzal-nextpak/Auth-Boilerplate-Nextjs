export const auth_constant = {
    login: {
        form_title: 'Login',
        forget_password: 'Forgot password?',
        reset_btn: 'Click to Reset',
        submit_btn: 'Login',
        no_account: 'Don\'t have an account?',
        redirect_to_sign_up: 'SignUp',
        google: 'Login with Google',
    },
    email_verification: {
        platform_name: 'LQS',
        title: ' Email verification pending',
        desc: (email: string) =>
            `  We have sent an email for verification to ${email}. Follow the instructions in the email to log into your account.`,
        email_again_countdown: (countdown: number) =>
            `Send Email Again in (${countdown})`,
        email_again: 'Send Email Again',
        redirect_to_sign_up: ' Sign up with a different email',
    },
    reset_password: {
        form_title: 'Reset Password',
        email_label:'Email'
    },
    sign_up: {
        form_title: 'Create your Free Account',
        submit_btn: 'Create Account',
        already_account: 'Already have an account?',
        redirect_to_login: 'Login',
        google: 'Sign up with Google',
    },
}

export const auth_fields_const = {
    login: {
        emailLabel: 'Email',
        emailName: 'email',
        emailPlaceholder: 'Enter the email',

        passwordLabel: 'Password',
        passwordName: 'password',
        passwordPlaceholder: 'Enter the password',

    },
    signup: {
        emailLabel: 'Email',
        emailName: 'email',
        emailPlaceholder: 'Enter the email',

        passwordLabel: 'Create Password',
        passwordName: 'password',
        passwordPlaceholder: 'Create password',
    },
}
