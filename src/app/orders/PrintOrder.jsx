import React from 'react'
import Button from '@mui/material/Button';

function PrintOrder({ orderData }) {
  const { date,hours,order, total } = orderData
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=400'); 
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Conteúdo para Impressão</title></head><body style="margin: 0; font-size: 15px; font-family: Arial, sans-serif;">');
    printWindow.document.write('<div>-------- UaiTay Comida Chinesa --------</div><br>');
    printWindow.document.write(`<div>---------------------------------------</div>`);
    printWindow.document.write(`<div>CNPJ: 40.429.040/0001-78</div><br>`);
    printWindow.document.write(`<div>Endereço: Rua 42 N°358</div><br>`);
    printWindow.document.write(`<div>Bairro: Tropical</div><br>`);
    printWindow.document.write(`<div>Cidade: Contagem</div><br>`);
    printWindow.document.write(`<div>Cep: 32072440</div><br>`);
    printWindow.document.write(`<div>Telefone: (31) 9 9985-6780</div><br>`);
    printWindow.document.write(`<div>Data:${date}</div><br>`);
    printWindow.document.write(`<div>Hora:${hours}</div>`);
    printWindow.document.write(`<div>---------------------------------------</div><br>`);
    printWindow.document.write(`<div>----------Descrição do pedido---------</div><br>`);
    order && order.map((data) => (
      printWindow.document.write(`<div>1X - ${data.name} - R$:${data.price.toFixed(2).split('.').join(',')}</div><br>`)
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
      <Button 
        size="small"
        onClick={() => handlePrint()}
      >
        Imprimir
      </Button>
    </div>
  ) 
}

export default PrintOrder