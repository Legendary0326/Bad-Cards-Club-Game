import React from 'react';
import images from 'shared/images';

const CustomGallery = () => {
  return (
    <div className='row justify-content-center'>
      <div className='col-lg-8 mb-4'>
        <form>
          <div className='form-group'>
            <label htmlFor='displayName4'>Display Name</label>
            <input
              type='displayName'
              className='form-control'
              id='displayName4'
              placeholder='Display Name'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='displayName4'>Room Type</label>
            <div className="row row-cols-6">
              <div className="col mb-2">
                <div className="selectableThumbnail" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU)' }}>
                  <img src={images.trans_square} />
                </div>
              </div>
              <div className="col mb-2">
                <div className="selectableThumbnail selected" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU)' }}>
                  <img src={images.trans_square} />
                </div>
              </div>
              <div className="col mb-2">
                <div className="selectableThumbnail" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU)' }}>
                  <img src={images.trans_square} />
                </div>
              </div>
              <div className="col mb-2">
                <div className="selectableThumbnail" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU)' }}>
                  <img src={images.trans_square} />
                </div>
              </div>
              <div className="col mb-2">
                <div className="selectableThumbnail" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU)' }}>
                  <img src={images.trans_square} />
                </div>
              </div>

            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='displayName4'>Floor Material</label>
            <div className="row row-cols-6">
              <div className="col mb-2">
                <div className="selectableThumbnail" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU)' }}>
                  <img src={images.trans_square} />
                </div>
              </div>
              <div className="col mb-2">
                <div className="selectableThumbnail" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU)' }}>
                  <img src={images.trans_square} />
                </div>
              </div>
              <div className="col mb-2">
                <div className="selectableThumbnail selected" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU)' }}>
                  <img src={images.trans_square} />
                </div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='displayName4'>Wall Material</label>
            <div className="row row-cols-6">
              <div className="col mb-2">
                <div className="selectableThumbnail selected" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU)' }}>
                  <img src={images.trans_square} />
                </div>
              </div>
              <div className="col mb-2">
                <div className="selectableThumbnail" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU)' }}>
                  <img src={images.trans_square} />
                </div>
              </div>
            </div>
          </div>

          <div className='form-group text-center'>
            <button type='submit' className='btn btn-primary'>
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomGallery;
