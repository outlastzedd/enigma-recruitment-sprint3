import * as React from 'react';
import {Box, TextField, InputAdornment, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {FilterSortBar} from './filterSortBar';
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import {useState} from "react";

export default function SearchBar() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get('query')?.toString() || "");

    const clearQuery = () => {
        setQuery('');
        router.replace(`${pathName}`);
    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const inputSearchValue = formData.get('inputSearchValue') as string;

        const params = new URLSearchParams();
        if (inputSearchValue) {
            params.set("query", inputSearchValue);
        } else {
            params.delete("query");
        }
        console.log(pathName);
        router.replace(`/jobs?${params.toString()}`);
    }

    return (
        <Box sx={{
            display: 'flex',
            gap: 2,
            p: 3,
            mb: 3,
            mt: 3,
            maxWidth: '100%',
            mx: 'auto',
            alignItems: 'center',
            color: '#98A2B3',
            '@media (max-width: 991px)': {
                maxWidth: '100%',
                flexDirection: 'row',
                mb: -2
            },
        }}>
            <form onSubmit={handleSearch} style={{width: '100%', display: 'flex', gap: '16px'}}>
                <TextField
                    fullWidth
                    name="inputSearchValue"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Job title, description, or industry name"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{color: '#98A2B3', backgroundColor: '#F9FAFB'}}/>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            fontSize: 20,
                            height: '64px',
                            '& fieldset': {borderColor: '#98A2B3'},
                            '&:hover fieldset': {borderColor: '#98A2B3'},
                            '&.Mui-focused fieldset': {borderColor: '#98A2B3'},
                        },
                        '& input': {color: '#98A2B3', fontSize: '20px'},
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        bgcolor: '#2494B6',
                        '&:hover': {bgcolor: '#1A7A96'},
                        height: '64px',
                        minWidth: '120px'
                    }}
                >
                    Search
                </Button>
            </form>

            <FilterSortBar/>

        </Box>
    );
}