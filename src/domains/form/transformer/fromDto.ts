export const fromDto = (dto: any, id: string) => ({
    ...dto,
    id,
})
