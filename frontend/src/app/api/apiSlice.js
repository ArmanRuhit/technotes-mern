import {createApi, fetchBasQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBasQuery({ baseUrl: 'http://localhost:3500'}),
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})