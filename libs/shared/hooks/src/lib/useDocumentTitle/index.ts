import { useTitle } from 'ahooks'

export const useDocumentTitle = (title: string, restoreOnUnmount?: boolean) =>
    useTitle(title, { restoreOnUnmount })
