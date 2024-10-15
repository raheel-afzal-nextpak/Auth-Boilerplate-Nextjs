import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage'

export type FileInfo = {
    type: string
    downloadPath: string
    fileName: string
    path: string
    file?: File
}
export type UploadFileResponse = Array<FileInfo>

export async function uploadFiles(
    files: Array<File>,
    folderName?: string,
): Promise<UploadFileResponse> {
    const storage = getStorage()
    // TODO: use useId()
    const dir = folderName
    return await Promise.all(
        files.map(async (file) => {
            const path = `${dir}/${file.name}`
            const storageRef = ref(storage, path)
            await uploadBytes(storageRef, file)
            const downloadPath = await getDownloadURL(storageRef)
            return {
                type: file.type,
                downloadPath,
                fileName: file.name,
                path,
            }
        }),
    )
}

export const deleteFiles = (urls: string[]) => {
    const storage = getStorage()
    return Promise.all(urls.map((url) => deleteObject(ref(storage, url))))
}

export const uploadNewAndDeleteOldFiles = async (
    files: FileInfo[] = [],
    oldFiles: FileInfo[] = [],
    folderName?: string,
) => {
    const uploadedFiles = files.filter((doc) => doc.downloadPath) as FileInfo[]
    const uploadedFilesUrlSet = new Set(
        uploadedFiles.map((doc) => doc.downloadPath),
    )

    const deletedFiles = (oldFiles?.filter(
        (doc) => !uploadedFilesUrlSet.has(doc.downloadPath ?? ''),
    ) ?? []) as FileInfo[]

    const newFiles = files?.filter((doc) => doc.file).map((doc) => doc.file)

    const uploadResults = await uploadFiles(
        (newFiles ?? []) as File[],
        folderName,
    )

    if (deletedFiles.length > 0) {
        await deleteFiles(deletedFiles.map((doc) => doc.downloadPath))
    }

    const updatedFiles = uploadedFiles?.concat(uploadResults)
    return updatedFiles
}
