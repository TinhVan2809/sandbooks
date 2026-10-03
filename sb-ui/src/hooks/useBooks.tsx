import { useQuery } from "@tanstack/react-query"
import { getListBooks, getBookById, getRecommendedBooks, getNewestBooks } from "../services/api";

export const bookQueryKeys = {
    all: ['books'] as const,
    list: (page: number, limit: number) => [...bookQueryKeys.all, 'list', page, limit] as const,
    detail: (bookId: number) => [...bookQueryKeys.all, 'detail', bookId] as const,
    recommended: () => [...bookQueryKeys.all, 'recommended'] as const, 
};

export const bookListQueryOptions = (page: number, limit: number) => ({
    queryKey: bookQueryKeys.list(page, limit),
    queryFn: () => getListBooks(page, limit),
    staleTime: 60 * 1000,
});

export function useBooks(page = 1, limit = 10) {
    return (
        useQuery(bookListQueryOptions(page, limit))
    )
}

export function useGetById({ bookId }: { bookId: number }) {
    return (
        useQuery({
            queryKey: bookQueryKeys.detail(bookId),
            queryFn: () => getBookById(bookId),
            staleTime: 60 * 1000,
        })
    )
}

export function useGetRecommendedBooks() {
     return (
        useQuery({
            queryKey: bookQueryKeys.recommended(),
            queryFn: () => getRecommendedBooks(),
            staleTime: 60 * 1000,
        })
    )
}

export function useGetNewestBooks() {
    return (
        useQuery({
            queryKey: bookQueryKeys.recommended(),
            queryFn: () => getNewestBooks(),
            staleTime: 60 * 1000,
        })
    )
}