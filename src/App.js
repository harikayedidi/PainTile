//@flow

import React from 'react';
import logo from './logo.svg';
import './App.css';

function importAll(r) {
  return r.keys().map(r);
}
// using webpack's require.context function to pull all images from the public folder. 
const imgs = importAll(require.context('../public/assets', true, /\.(png|jpe?g|svg|JPG)$/));

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: null };
    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.renderImageContent = this.renderImageContent.bind(this);
  }
  renderImageContent(src, index) {
    return (
      <div onClick={(e) => this.openModal(e, index)}>
         <span className="helper"></span>
        <img src={src} key={src} alt="harika-art" />
      </div>
    ) 
  }
  openModal(e, index) {
    this.setState ({ currentIndex: index });
  }
  closeModal(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState ({ currentIndex: null });
  }
  previousImage(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex -1
    }));
  }
  nextImage(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  }
  render() {
    return (
      <div className="gallery-container">
       <div class="highlight"><h1>PainTile</h1></div>
        <div className="gallery-grid">
          {imgs.map(this.renderImageContent)}
        </div>
        <ArtGallery 
          closeModal={this.closeModal} 
          previousImage={this.previousImage} 
          nextImage={this.nextImage} 
          hasPrev={this.state.currentIndex > 0} 
          hasNext={this.state.currentIndex + 1 < imgs.length} 
          src={imgs[this.state.currentIndex]} 
        />
      </div>
    )
  }
}

class ArtGallery extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }  
  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.keyCode === 27)
      this.props.closeModal();
    if (e.keyCode === 37 && this.props.hasPrev)
      this.props.previousImage();
    if (e.keyCode === 39 && this.props.hasNext)
      this.props.nextImage();
  }
  render () {
    const { closeModal, hasNext, hasPrev, nextImage, previousImage, src } = this.props;
    if (!src) {
      return null;
    }
    return (
        // <div className="modal-overlay" onClick={closeModal}>
        <div isOpen={!!src} className="modal">
          <div className='modal-body'>
            <a href="#" className='modal-close' onClick={closeModal} onKeyDown={this.handleKeyDown}>&times;</a>
            {hasPrev && <a href="#" className='modal-prev' onClick={previousImage} onKeyDown={this.handleKeyDown}>&lsaquo;</a>}
            {hasNext && <a href="#" className='modal-next' onClick={nextImage} onKeyDown={this.handleKeyDown}>&rsaquo;</a>}
            <img src={src} alt="images"/>
          </div>
        </div>
        // </div>
    )
  }
}

export default Gallery;