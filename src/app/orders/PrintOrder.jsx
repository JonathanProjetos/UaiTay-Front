import React from 'react'
import ButtonBase from '@mui/material/ButtonBase';
import PrintIcon from '@mui/icons-material/Print';

function PrintOrder({ orderData }) {
  const {
    customer,
    phone, 
    address,
    district,
    city,
    number,
    payment,
    complement,
    date,
    hours,
    order, 
    total } = orderData

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=400'); 
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Conteúdo para Impressão</title></head><body style="margin: 0; font-size: 12px; font-family: Arial, sans-serif;">');
    printWindow.document.write('<div>-------- UaiTay Comida Chinesa --------</div><br>');
    printWindow.document.write(`<div>---------------------------------------</div>`);
    printWindow.document.write(`<div>CNPJ: 40.429.040/0001-78</div><br>`);
    printWindow.document.write(`<div>Endereço: Rua 42 N°358</div><br>`);
    printWindow.document.write(`<div>Bairro: Tropical</div><br>`);
    printWindow.document.write(`<div>Cidade: Contagem</div><br>`);
    printWindow.document.write(`<div>Cep: 32072440</div><br>`);
    printWindow.document.write(`<div>Telefone: (31) 9 9985-6780</div><br>`);
    printWindow.document.write(`<div>Data: ${date}</div><br>`);
    printWindow.document.write(`<div>Hora: ${hours}</div>`);
    printWindow.document.write(`<div>---------------------------------------</div><br>`);
    printWindow.document.write(`<div>--------Dados do Cliente---------</div><br>`);
    printWindow.document.write(`<div>Nome: ${customer}</div><br>`);
    printWindow.document.write(`<div>Telefone: ${phone}</div><br>`);
    printWindow.document.write(`<div>Endereço:${address}</div><br>`);
    printWindow.document.write(`<div>Número: ${number}</div><br>`);
    printWindow.document.write(`<div>Bairro: ${district}</div><br>`);
    printWindow.document.write(`<div>Cidade: ${city}</div><br>`);
    printWindow.document.write(`<div>Complemento: ${complement}</div><br>`);
    printWindow.document.write(`<div>Forma de pagamento: ${payment}</div><br>`);
    printWindow.document.write(`<div>--------Descrição do pedido---------</div><br>`);
    order && order.map((data) => (
      printWindow.document.write(`<div>1X - ${data.name} </div><br><div>Valor: R$:${data.price.toFixed(2).split('.').join(',')}</div><br>`)
    ))
    printWindow.document.write(`<div>---------------------------------------</div><br>`);
    printWindow.document.write(`<div>Total: R$:${total.toFixed(2).split('.').join(',')}</div><br>`);
    printWindow.document.write(`<div>---------------------------------------</div><br>`);
    printWindow.document.write(`<div>Obrigado pela preferência.</div>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print()
  };

  return (
    <div>
      <ButtonBase 
        size="small"
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px',
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: '#115293',
          },
        }}
        onClick={() => handlePrint()}
      >
        <PrintIcon />
      </ButtonBase>
    </div>
  ) 
}

export default PrintOrder