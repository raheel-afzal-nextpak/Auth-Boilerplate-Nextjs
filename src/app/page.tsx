import { app_constants } from './constants'

export default function Home() {
    const { page } = app_constants
    return (
        <main>
            <h1>{page.main_heading}</h1>
        </main>
    )
}
