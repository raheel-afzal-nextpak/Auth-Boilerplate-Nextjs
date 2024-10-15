import { User, UserDto } from '@/interface'

export const userFromDto = (dto: UserDto, id: string): User => ({
    ...dto,
    id,
})
