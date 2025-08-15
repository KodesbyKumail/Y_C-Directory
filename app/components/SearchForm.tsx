import React from 'react'
import Form from "next/form";
import SearchFormreset from './SearchFormreset';

const SearchForm = ({query}: {query?:string}) => {
    
     

    
  return (

    <Form action="/" scroll={false} className='search-form'>
        <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startup...."
        
        />
        <div className="flex gap-2">
            {query && <SearchFormreset />}
            <button type="submit" className="search-btn text-white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </button>

        </div>
    </Form>
  )
}

export default SearchForm
