import React, { useState } from 'react'
import { styled, useTheme } from '@mui/system'
import { Icon, IconButton } from '@mui/material'
import { topBarHeight } from 'utils/constant'

const SearchContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: topBarHeight,
    background: theme.palette.primary.main,
    color: theme.palette.text.primary,
    '&::placeholder': {
        color: theme.palette.text.primary,
    },
}))

const SearchInput = styled('input')(({ theme }) => ({
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    paddingLeft: '20px',
    height: 'calc(100% - 5px)',
    background: theme.palette.primary.main,
    color: theme.palette.text.primary,
    '&::placeholder': {
        color: theme.palette.text.primary,
    },
}))

const MatxSearchBox = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }

    // const data =use

    // const handlechange=(e)=>{
    //     if((e.target.value.length > 0) || (e.target.value.length === 1)){  
    //         setVer("true")             
    //         setSearch("false") 
    //         // console.log("checking ver in target", {ver})
    //     } else 
    //     if(e.target.value.length === 0 )
    //     {
    //     CrossSymbol = <span></span>
    //     setVer("false")
    //     }
    //     const query = e.target.value.toLowerCase();
    //     setValue(query);
    //     if (query.length > 2) {
    //         // debugger
    //     let  data1 = data.map(x => x.name)
    //       // console.log("dataaa", data1)
    //       const filterSuggestions = data1.filter(
    //         (suggestion) => suggestion.toLowerCase().indexOf(query) > -1
    //         );
    //       setSuggestions(filterSuggestions);
          
    //     } 
      
    // }
    const { palette } = useTheme()
    const textColor = palette.text.primary

    return (
        <React.Fragment>
            {!open && (
                <IconButton onClick={toggle}>
                    <Icon sx={{ color: textColor }}>search</Icon>
                </IconButton>
            )}

            {open && (
                <SearchContainer>
                    <SearchInput
                        type="text"
                       // onChange={handlechange}
                        placeholder="Search here..."
                        autoFocus
                    />
                    <IconButton
                        onClick={toggle}
                        sx={{ mx: 2, verticalAlign: 'middle' }}
                    >
                        <Icon sx={{ color: textColor }}>close</Icon>
                    </IconButton>
                </SearchContainer>
            )}
        </React.Fragment>
    )
}

export default MatxSearchBox
