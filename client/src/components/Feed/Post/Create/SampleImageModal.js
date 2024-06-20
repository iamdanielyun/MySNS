import React, { useState, useRef } from 'react';
import { Box, Modal, Button, Backdrop, Typography, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import sample1 from "../../../../static/sample1.jpeg";
import sample2 from "../../../../static/sample2.jpeg";
import sample3 from "../../../../static/sample3.jpeg";
import sample4 from "../../../../static/sample4.jpeg";
import sample5 from "../../../../static/sample5.jpeg";
import sample6 from "../../../../static/sample6.jpeg";
import sample7 from "../../../../static/sample7.jpeg";
import sample8 from "../../../../static/sample8.jpeg";
import sample9 from "../../../../static/sample9.jpeg";
import sample10 from "../../../../static/sample10.jpeg";
import sample11 from "../../../../static/sample11.jpeg";
import sample12 from "../../../../static/sample12.jpeg";

export default function SampleImagesModal({ setFinalImage }) {
    const [open, setOpen] = useState(false);

    const handleSampleImageSelect = (imageUrl) => {
        setFinalImage(imageUrl);
        setOpen(false);  
    };

    // const sampleImages = [
    //     "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
    //     "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
    //     "https://www.italyperfect.com/blog/wp-content/uploads/2014/07/Caravaggio-Michelangelo_Merisi_da-The_Calling_of_Saint_Matthew.jpg",
    //     "https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/all-models/m-automobile/m4coupe/2024/bmw-m4-coupe-mg-01.jpg",
    //     "https://www.invaluable.com/blog/wp-content/uploads/sites/77/2023/01/Lunch-Atop-Skyscraper.jpg",
    //     "https://www.billboard.com/wp-content/uploads/media/tyler-the-creator-igor-album-art-2019-billboard-embed.jpg?w=600",
    //     "https://qph.cf2.quoracdn.net/main-qimg-28a85e5646397574ade3e23a6f5f040a.webp",
    //     "https://people.com/thmb/6V0as4Z_UdjqdvSgqbZYUgOPYnM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/DenverNuggets06082023-67-7e86d14ba81d45dea14954fd198aa724.jpg",
    //     "https://content.api.news/v3/images/bin/f3e024e0f1063afd90e1c94664862e10",
    //     "https://th-thumbnailer.cdn-si-edu.com/dfoIOvXsu1aARMaz0n8TZ1Imrh4=/1000x750/filters:no_upscale():focal(850x489:851x490)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/ac/7f/ac7fc9ab-dd19-4beb-a907-0c87d5e0c3f3/oppenheimer-still1-62df17ed1c2fb-1.jpeg",
    //     "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F11%2Fsza-sos-album-cover-artwork-reveal-image-announcement-1.jpg?cbr=1&q=90",
    //     "https://media.cntraveler.com/photos/5ebeef63f52f4c0911cac483/16:9/w_2560%2Cc_limit/GrandCanyonNationalPark-2020-GettyImages-858637934.jpg"
    // ];
    const sampleImages = [
        sample1,
        sample2,
        sample3,
        sample4,
        sample5,
        sample6,
        sample7,
        sample8,
        sample9,
        sample10,
        sample11,
        sample12,
    ];
    return (
        <>
            <Button variant="outlined" sx={{ width: '30%', height: 'auto', margin: 1 }} onClick={() => setOpen(true)}>
                Sample Images
                <ImageIcon />
            </Button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "80vw",
                    height: "90vh",
                    bgcolor: 'background.paper',
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2">
                        Select Image
                    </Typography>
                    <Box sx={{
                        mt: 2,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 2,
                    }}>
                        {sampleImages.map(imageUrl => (
                            <Button
                                key={imageUrl}
                                onClick={() => handleSampleImageSelect(imageUrl)}
                                sx={{ m: 1, p: 0, border: 'none' }}
                            >
                                <img
                                src={imageUrl}  
                                alt={`Ooops!`}
                                style={{ width: '18vw', height: '23vh', borderRadius: '5px' }}
                                />
                            </Button>
                            ))}
                    </Box>
                </Box>
            </Modal>
        </>
    )
}