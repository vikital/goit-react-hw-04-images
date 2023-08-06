import React, { Component } from 'react';
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AppDiv } from './App.styled';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    error: null,
    isLoading: false,
    isLastPage: false,
    selectedImage: null,
    showModal: false,
  };

  componentDidUpdate(_prevProps, prevState) {
    const { query } = this.state;

    if (prevState.query !== query) {
      this.setState({ images: [], page: 1, isLastPage: false }, () => {
        this.fetchImages();
      });
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;

    const API_KEY = '37421365-508677d6bf0e4f2b0f58d3593';

    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const { hits, totalHits } = response.data;

        if (hits.length === 0) {
          return toast(
            `Sorry, there are no images matching your search query.`,
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        }

        const transformHits = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...transformHits],
          page: prevState.page + 1,
          isLastPage:
            prevState.images.length + transformHits.length >= totalHits,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSearchSubmit = query => {
    const { query: stateQuery } = this.state;
    if (stateQuery === query) {
      return;
    }
    this.setState({
      query,
      page: 1,
      images: [],
      error: null,
      isLastPage: false,
    });
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
    document.body.styled.overflow = 'hidden';
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null, showModal: false });
    document.body.style.overflow = 'auto';
  };

  render() {
    const { images, error, isLoading, isLastPage, selectedImage, showModal } =
      this.state;

    return (
      <AppDiv>
        <ToastContainer autoClose={3000} transition={Slide} />

        <SearchBar onSubmit={this.handleSearchSubmit} />

        {error && <p>Error: {error}</p>}

        <ImageGallery images={images} onItemClick={this.handleImageClick} />

        {isLoading && <Loader />}

        {!isLoading && images.length > 0 && !isLastPage && (
          <Button onClick={this.fetchImages} />
        )}

        {showModal && (
          <Modal image={selectedImage} onClose={this.handleModalClose} />
        )}
      </AppDiv>
    );
  }
}

export default App;
