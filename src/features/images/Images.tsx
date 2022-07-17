import { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  list,
  search,
  selectImages,
  selectIsLoading,
  selectTotalPages
} from './imagesSlice';
import { Color, OrderBy, Orientation, SearchImages } from './types';
import { ImagesList } from './components/ImagesList';

const initialSearch: SearchImages = {
  query: '',
  color: undefined,
  orientation: undefined,
  orderBy: undefined
};

export const Images: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const totalPages = useAppSelector(selectTotalPages);
  const images = useAppSelector(selectImages);
  const isLoading = useAppSelector(selectIsLoading);

  const [searchParams, setSearchParams] = useState<SearchImages>(initialSearch);
  const [currSearchParams, setCurrSearchParams] = useState<SearchImages>(initialSearch);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    dispatch(list());
  }, [])

  const handleSearch = (): void => {
    if (searchParams.query) {
      setCurrSearchParams(searchParams);
      setCurrPage(1);
      dispatch(search(searchParams));
    } else {
      dispatch(list());
    }
  }

  const handleClearSearch = (): void => {
    setSearchParams(initialSearch);
    setCurrPage(1);
    dispatch(list());
  }

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    if (!val) {
      handleClearSearch();
      return;
    }

    setSearchParams({...searchParams, query: e.target.value});
  }

  const handleNextPageClick = (): void => {
    const page = currPage + 1;
    loadNewPage(page);
  }

  const handlePrevPageClick = (): void => {
    if (currPage <= 1) return;
    const page = currPage - 1;
    loadNewPage(page)
  }

  const loadNewPage = (page: number): void => {
    setCurrPage(page);

    if (currSearchParams.query) {
      dispatch(search({...currSearchParams, page}));
      return;
    }
    dispatch(list({page}));
  }

  const renderPagination = (): React.ReactNode => {
    return (
      <>
        <IconButton
          disabled={currPage <= 1}
          onClick={handlePrevPageClick}
        >
          <ArrowBackIosIcon/>
        </IconButton>
        <IconButton
          disabled={currPage >= totalPages}
          onClick={handleNextPageClick}
        >
          <ArrowForwardIosIcon/>
        </IconButton>
      </>
    );
  }

  const renderContent = (): React.ReactNode => {
    return (
      <>
        <ImagesList />
        {Boolean(images.length) && renderPagination()}
      </>
    )
  }

  const renderLoader = (): React.ReactNode => {
    return <CircularProgress sx={{p: 10}} />;
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
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{m: 1}}
            onChange={handleChangeQuery}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
                e.preventDefault();
              }
            }}
          />

          <FormControl sx={{minWidth: 120, m: 1}}>
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
              <MenuItem value={Color.BLACK_AND_WHITE}>Black and white</MenuItem>
              <MenuItem value={Color.BLACK}>Black</MenuItem>
              <MenuItem value={Color.WHITE}>White</MenuItem>
              <MenuItem value={Color.YELLOW}>Yellow</MenuItem>
              <MenuItem value={Color.ORANGE}>Orange</MenuItem>
              <MenuItem value={Color.RED}>Red</MenuItem>
              <MenuItem value={Color.PURPLE}>Purple</MenuItem>
              <MenuItem value={Color.MAGENTA}>Magenta</MenuItem>
              <MenuItem value={Color.GREEN}>Green</MenuItem>
              <MenuItem value={Color.TEAL}>Teal</MenuItem>
              <MenuItem value={Color.BLUE}>Blue</MenuItem>
              <MenuItem value={0}>-</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{minWidth: 120, m: 1}}>
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
              <MenuItem value={OrderBy.LATEST}>Latest</MenuItem>
              <MenuItem value={OrderBy.RELEVANT}>Relevant</MenuItem>
              <MenuItem value={0}>-</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{minWidth: 120, m: 1}}>
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
              <MenuItem value={Orientation.LANDSCAPE}>Landscape</MenuItem>
              <MenuItem value={Orientation.PORTRAIT}>Portrait</MenuItem>
              <MenuItem value={Orientation.SQUARE}>Square</MenuItem>
              <MenuItem value={0}>-</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            sx={{m: 1}}
            onClick={handleSearch}
          >
            <SearchIcon/>
          </IconButton>
          <IconButton
            sx={{m: 1}}
            onClick={handleClearSearch}
          >
            <ClearIcon/>
          </IconButton>
        </div>
        {isLoading ? renderLoader() : renderContent()}
      </Container>
    </>
  );
}
