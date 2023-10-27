import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonPrintOrder from './PrintOrder';

function CardOrder({ data, index }) {
  const { date, hours, order, total } = data

  return (
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          sx={{ height: 130 }}
          image={"https://drive.google.com/uc?export=view&id=1epaOB5JSqn_mQbZx4YCFUO0fKSGEUJ-H"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`Pedido N° ${index +1}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Data de entrada: ${date.split('-').join('/')}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Hora de entrada: ${hours}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Total: R$: ${total.toFixed(2).split('.').join(',')}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Detalhes</Button>
          <ButtonPrintOrder orderData={data} />
        </CardActions>
      </Card>
  )
}

export default CardOrder