import React, { Component } from 'react';
import GifLoader from 'react-gif-loader';
import images from '../../constants/images';
import './PageLoading.css'

const PageLoading = (props) => {
    return (
       <div
        className={props.isLoadingComplete ? "gifloading_layer_active":'gifloading_layer_deactive'} >
            <GifLoader
             loading={props.isLoadingComplete}
            imageSrc={images.PageLoading}
            overlayBackground="#d8d0d0db"
        />
       </div>


    );
}

export default PageLoading;