// import { useState } from "react";
// import { Box } from '@mui/material';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import Backdrop from '@mui/material/Backdrop';
// import AttachFileIcon from '@mui/icons-material/AttachFile';

// export default function SampleImagesModal() {
//     const [open, setOpen] = useState(false);

//     return (
//         <>
//             <Button variant="outlined" sx={{width: "25%", height: "5vh"}}>
//                 Upload
//                 <AttachFileIcon />
//             </Button>
//             <input
//                 type="file"
//                 // ref={fileInputRef}
//                 style={{ display: 'none' }}
//                 accept=".jpg,.jpeg,.png"
//                 // onChange={handleFileChange}
//             />
//             or

//             <Button variant="outlined" sx={{width: "25%", height: "5vh"}} onClick={() => setOpen(true)}>
//                 Sample Images
//                 <AttachFileIcon />
//             </Button>
//             <Modal
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 // closeAfterTransition
//             >
//                 <h1>sdfsdfsdf</h1>
//             </Modal>
//         </>
//     )
// }

import React, { useState, useRef } from 'react';
import { Box, Modal, Button, Backdrop, Typography, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import SampleImagesModal from './SampleImageModal';

export default function SelectImage( {setFinalImage} ) {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
    // Process the files here
    };

    return (
        <>

            {/* Button from user computer */}
            {/* <Button variant="outlined" sx={{ width: '25%', height: 'auto', margin: 1 }} onClick={() => fileInputRef.current.click()}>
                Upload
                <AttachFileIcon />
            </Button>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
            /> */}

            {/* Sample images provided to user */}
            <SampleImagesModal setFinalImage={setFinalImage} />
        </>
    );
}
