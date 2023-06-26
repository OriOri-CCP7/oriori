import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Input from '../components/Input';
import MUITransferList from '../components/MUITransferList';
import prefectureList from '../data/prefectures.json';

import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';
import '../styles/AdminAddProduct.css';

function AdminAddProduct() {
  const navigate = useNavigate();
  const auth = UserAuth();

  const [productName, setProductName] = useState<string>('');
  const [productUrl, setProductUrl] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [imageFL, setImageFL] = useState<FileList | null>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);

  const [isSending, setIsSending] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('Sending...')

  const isValidProduct = (input: Product) => {
    if (input.product_name === '') { 
      setAlertMessage('Product name required.');
      return false;
    }

    if (input.link_url === '') {
      setAlertMessage('Link URL required.');
      return false;
    }

    if (image === '') {
      setAlertMessage('Image required.');
      return false;
    }

    if (input.location.length < 1) {
      setAlertMessage('Locations required.');
      return false;
    }

    if (input.id) { return false; }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const cloudName = 'oriori';
    const unsignedUploadPreset = 'lblry7vz';

    // *********** Upload file to Cloudinary ******************** //
    const uploadFile = async (file: File) => {
      var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      
      // Update progress (can be used to show progress indicator)
      xhr.upload.addEventListener("progress", function(e) {
        var progress = Math.round((e.loaded * 100.0) / e.total);
        setAlertMessage(`Uploading Image... ${progress}%`)
      });
      
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // File uploaded successfully
          var response = JSON.parse(xhr.responseText);
          // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
          setImageUrl(response.secure_url);
          setAlertMessage('Adding to Database...');
        }
      };
      
      fd.append('upload_preset', unsignedUploadPreset);
      fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
      fd.append('public_id', productName.replace(/[?&#/\\%<>+]+/g, '-'));
      fd.append('file', file);
      xhr.send(fd);
    };
    
    const newProduct: Product = {
      product_name: productName.trim(),
      link_url: productUrl.trim(),
      img_url: '',
      location: selectedPrefs
    };
    
    if (startDate !== '') {
      newProduct.start_date = startDate;
    }
    if (endDate !== '') {
      newProduct.end_date = endDate;
    }
    
    setIsSending(true);

    if (isValidProduct(newProduct)) {
      if (!imageFL) { return; }
      uploadFile(imageFL[0]);
    }
  };

  useEffect(() => {
    if (imageUrl !== '') {
      const newProduct: Product = {
        product_name: productName.trim(),
        link_url: productUrl.trim(),
        img_url: imageUrl,
        location: selectedPrefs
      };
      
      if (startDate !== '') {
        newProduct.start_date = startDate;
      }
      if (endDate !== '') {
        newProduct.end_date = endDate;
      }
      
      console.log(newProduct);

      axios.post(`/api/products/newProduct/`, newProduct, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': auth?.csrftoken ?? ""
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setAlertMessage('Successfully Added!')
          navigate(0);
        } else if (response.status >= 300) {
          setAlertMessage(response.data)
        }
      })
      .catch((err) => {
        setAlertMessage(err)
        console.log(err);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  return (
    <div className='admin__wrapper'>
      <div className='admin__icon back'>
        <ArrowSmallLeftIcon onClick={() => navigate('/home')}/>
      </div>
      <Header
        mainText='OriOri Admin'
        secondaryText='Submit New Product'/>
      {/* <Button className="backButton" type="button" onClick={ () => navigate('/home') } text="Back"/> */}
      
      
      <div className='admin__form'>
      <form
        onSubmit = { handleSubmit }>
        
        <label>Product Name:</label>
          <Input 
            className = 'admin__input'
            placeholder = 'Product Name'
            type = 'text'
            value = { productName }
            onChange = { (e) => setProductName(e.target.value) }
            required
            />

        <label>Link URL:</label>
          <Input 
            className = 'admin__input'
            placeholder = 'Link URL'
            type = 'url'
            value = { productUrl }
            onChange = { (e) => setProductUrl(e.target.value) }
            required
            />

        <label> Image:</label>
          <Input 
            className = 'admin__input'
            placeholder = ''
            type = 'file'
            value = { image }
            onChange = { (e) => {
              setImage(e.target.value);
              setImageFL(e.target.files);
            }}
            required
            />
        
        <label>Start Date:</label>
          <Input 
            className = 'admin__input'
            placeholder = ''
            type = 'date'
            value = { startDate }
            onChange = { (e) => setStartDate(e.target.value) }
            />

        <label>End Date:</label>
          <Input 
            className = 'admin__input'
            placeholder = ''
            type = 'date'
            value = { endDate }
            onChange = { (e) => setEndDate(e.target.value) }
            />

        <MUITransferList options={ prefectureList } setSelected={ setSelectedPrefs }/>
        
        { isSending
          ? <div className='admin__sending-msg'>{ alertMessage }</div>
          : <></> }
        
        <Button 
          className = 'admin__button'
          text = 'Submit'
          type = 'submit'/>
      </form>

      <Footer/>
      </div>
    </div>
  );
};

export default AdminAddProduct;