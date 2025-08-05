import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonPrintOrder from '../orders/PrintOrder';

function CardOrderDetail({ data }) {
  
  return (
      <Card sx={{ maxWidth: 500 }}>
        <CardMedia
          sx={{ height: 130 }}
          image={"https://drive.google.com/uc?export=view&id=1epaOB5JSqn_mQbZx4YCFUO0fKSGEUJ-H"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`Pedido Realizado`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Data de entrada: ${data.date.split('-').join('/')}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Hora de entrada: ${data.hours}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Total: R$: ${data.total.toFixed(2).split('.').join(',')}`}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button size="small">Detalhes</Button>
          <ButtonPrintOrder orderData={data} />
        </CardActions>
      </Card>
  )
}

export default CardOrderDetail
