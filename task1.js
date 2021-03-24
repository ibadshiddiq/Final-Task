var nameBuyer = prompt('Input Name')
var category = prompt('Input item category: A, B, C')
var purchaseAmount = prompt('Input purchase amount')

if( category == 'A' || category == 'a' ){
    if( purchaseAmount > 13 ){
        document.write('Nama : ' + nameBuyer + 
        '<br/> Total harga barang : Rp ' + purchaseAmount*4550 + 
        '<br/> Potongan : Rp' + purchaseAmount*231 + 
        '<br/> Total yang harus dibayar : Rp ' + ((purchaseAmount*4550) - (purchaseAmount*231)))
    }else{
        document.write('Nama : ' + nameBuyer + 
        '<br/> Total harga barang : Rp ' + purchaseAmount*4550 + 
        '<br/> Potongan : Rp' + '0' + 
        '<br/> Total yang harus dibayar : Rp ' + purchaseAmount*4550)
    }
} else if( category == 'B' || category == 'b'){
	if( purchaseAmount > 7 ){
    	document.write('Nama : ' + nameBuyer + 
        '<br/> Total harga barang : Rp ' + purchaseAmount*5330 + 
        '<br/> Potongan : Rp' + ((23/100) * (purchaseAmount*5330)) + 
        '<br/> Total yang harus dibayar : Rp ' + ((purchaseAmount*5330) - ((23/100) * (purchaseAmount*5330))))
	}else{
        document.write('Nama : ' + nameBuyer + 
        '<br/> Total harga barang : Rp ' + purchaseAmount*5330 + 
        '<br/> Potongan : Rp' + '0' + 
        '<br/> Total yang harus dibayar : Rp ' + purchaseAmount*5330)
	}
} else if( category == 'C' || category == 'c'){
    document.write('Nama : ' + nameBuyer + 
    '<br/> Total harga barang : Rp ' + purchaseAmount*8653 + 
    '<br/> Total yang harus dibayar : Rp ' + purchaseAmount*8653)
} else{
	document.write('Wrong Input')
}