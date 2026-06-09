import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';

function ModalConfirmAction({ nameButton, nameProduct, handleClick }) {
  const [toggle, setToggle] = useState(false)
  const [reName, setReName] = useState('')

  const handleToggle = () => {
    setToggle((current) => !current)
    setReName('')
  }

  const handleConfirm = () => {
    handleClick();
    setToggle(false);
    setReName('');
  }
  
  return (
    <Box>
      <ButtonBase 
        onClick={handleToggle}
        disabled={nameProduct.length === 0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
          width: '110px',
          border: 'solid 4px white',
          backgroundColor: nameProduct.length < 5 ? 'gray': '#1976d2',
          marginBottom: '3vh',
          padding: '1vh',
        }}
        >
          <Typography
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '2vh',
            }}
          >
            { nameButton }
          </Typography>
      </ButtonBase>
      <Modal
        hideBackdrop
        open={toggle}
        onClose={handleToggle}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box 
          sx={{ 
            position: 'absolute',
            flexWrap: 'wrap',
            top: '50vh',
            left: '50vw',
            transform: 'translate(-50%, -50%)',
            borderRadius: '20px',
            boxShadow: 24,
            backgroundColor: '#1976d2',
            pt: 2,
            px: 10,
            pb: 2,
           }}
          >
            <h2 id="child-modal-title" style={{ color: 'white' }}>Revisão</h2>
            <p id="child-modal-description" style={{ color: 'white' }}>
              {`Confirme o nome do Item do menu `}
              {<span style={{ fontWeight:'bold' }}>{`"${nameProduct}"`}</span>}
            </p>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Input
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '3vh',
                borderBottom:'solid 3px white',
                marginBottom: '3vh',
              }}
              placeholder={nameProduct}
              value={reName}
              onChange={(e) => setReName(e.target.value)}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              <ButtonBase
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '20px',
                  width: '100px',
                  border: 'solid 4px white',
                  padding: '1vh',
                }}
                onClick={handleToggle}
              >
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '2vh',
                  }}
                >
                  Cancelar
                </Typography>
              </ButtonBase>
              <ButtonBase 
                onClick={handleConfirm} 
                disabled={reName !== nameProduct}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '20px',
                  width: '100px',
                  marginLeft: '1vw',
                  border: 'solid 4px white',
                  backgroundColor: reName === nameProduct? '#1976d2': 'gray',
                  padding: '1vh',
                }}
              >
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '2vh',
                  }}
                >
                  Confirmar
                </Typography>
              </ButtonBase>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default ModalConfirmAction;
