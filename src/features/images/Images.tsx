import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectImages,
  initialLoad,
  search
} from './imagesSlice';
import { Color, OrderBy, Orientation, SearchImages } from './types';

const initialSearch: SearchImages = {
  query: '',
  page: undefined,
  color: undefined,
  orientation: undefined,
  orderBy: undefined
};

export function Images() {
  const images = useAppSelector(selectImages);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useState<SearchImages>(initialSearch);

  useEffect(() => {
    dispatch(initialLoad());
  }, [])

  const handleSearch = () => {
    if (searchParams.query) {
      dispatch(search(searchParams));
    } else {
      dispatch(initialLoad());
    }
  }

  const handleClearSearch = () => {
    setSearchParams(initialSearch);
    dispatch(initialLoad());
  }

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      handleClearSearch();
      return;
    }

    setSearchParams({...searchParams, query: e.target.value});
  }

  return (
    <>
      <Container sx={{p: 2}} maxWidth="md">
      <div>
        <TextField
          id="search-bar"
          className="text"
          label="Search"
          value={searchParams.query || ''}
          onChange={handleChangeQuery}
          variant="outlined"
          placeholder="Search..."
          size="small"
        />

        <FormControl sx={{minWidth: 120 }}>
          <InputLabel id="color-label" size='small'>Color</InputLabel>
          <Select
            labelId='color-label'
            value={searchParams.color || ''}
            label="Color"
            size="small"
            disabled={!searchParams.query}
            onChange={(e) => {
              setSearchParams({...searchParams, color: (e.target.value as Color) || undefined});
            }}
          >
            <MenuItem value={Color.BLACK_AND_WHITE}>BLACK_AND_WHITE</MenuItem>
            <MenuItem value={Color.BLACK}>BLACK</MenuItem>
            <MenuItem value={Color.WHITE}>WHITE</MenuItem>
            <MenuItem value={Color.YELLOW}>YELLOW</MenuItem>
            <MenuItem value={Color.ORANGE}>ORANGE</MenuItem>
            <MenuItem value={Color.RED}>RED</MenuItem>
            <MenuItem value={Color.PURPLE}>PURPLE</MenuItem>
            <MenuItem value={Color.MAGENTA}>MAGENTA</MenuItem>
            <MenuItem value={Color.GREEN}>GREEN</MenuItem>
            <MenuItem value={Color.TEAL}>TEAL</MenuItem>
            <MenuItem value={Color.BLUE}>BLUE</MenuItem>
            <MenuItem value={0}>-</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{minWidth: 120 }}>
          <InputLabel id="order-label" size='small'>Order</InputLabel>
          <Select
            labelId='order-label'
            value={searchParams.orderBy || ''}
            label="Order"
            size="small"
            disabled={!searchParams.query}
            onChange={(e) => {
              console.log('order changed to: ', e.target.value)
              setSearchParams({...searchParams, orderBy: (e.target.value as OrderBy) || undefined});
            }}
          >
            <MenuItem value={OrderBy.LATEST}>LATEST</MenuItem>
            <MenuItem value={OrderBy.RELEVANT}>RELEVANT</MenuItem>
            <MenuItem value={0}>-</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{minWidth: 120 }}>
          <InputLabel id="orientation-label" size='small'>Orientation</InputLabel>
          <Select
            labelId='orientation-label'
            value={searchParams.orientation || ''}
            label="Orientation"
            size="small"
            disabled={!searchParams.query}
            onChange={(e) => {
              setSearchParams({...searchParams, orientation: (e.target.value as Orientation) || undefined});
            }}
          >
            <MenuItem value={Orientation.LANDSCAPE}>LANDSCAPE</MenuItem>
            <MenuItem value={Orientation.PORTRAIT}>PORTRAIT</MenuItem>
            <MenuItem value={Orientation.SQUARE}>SQUARE</MenuItem>
            <MenuItem value={0}>-</MenuItem>
          </Select>
        </FormControl>

        <IconButton
          onClick={handleSearch}
        >
          <SearchIcon/>
        </IconButton>
        <IconButton
          onClick={handleClearSearch}
        >
          <ClearIcon/>
        </IconButton>
      </div>
        <ImageList variant="masonry" cols={7} gap={8}>
          {images.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.urls.small}`}
                srcSet={`${item.urls.small}`}
                alt={item.alt}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </>
  );
}
