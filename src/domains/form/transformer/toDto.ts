export const toDto = (dto: any) => {
    const { id, ...rest } = dto
    return {
        ...rest,
    }
}
