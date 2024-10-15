import { app_constants } from '../constants'

const page = () => {
    const { profile } = app_constants
    return <div>{profile.title}</div>
}

export default page
