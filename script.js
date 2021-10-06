const container=document.querySelector(".container");
const count=document.getElementById('count');
const amount=document.getElementById('amount');
const select=document.getElementById('movie');
const seats=document.querySelectorAll('.seat:not(.reserved)');
getFromLocalStorage();
calculateTotal();


container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected')


        calculateTotal();
       
        
    }
});


select.addEventListener('change',function(e){
    calculateTotal();

});

function calculateTotal(){
    const selectedSeat=container.querySelectorAll('.seat.selected');

    const selectedSeatArray=[];
    const seatArray=[];
    
    selectedSeat.forEach(function(seat){
        selectedSeatArray.push(seat);
    })

    seats.forEach(function(seat){
        seatArray.push(seat);
    })

    let SelectedSeatIndex=selectedSeatArray.map(function(seat){
        return seatArray.indexOf(seat);
    })


    let selectedSeatCount=selectedSeat.length;
    let price=select.value;
    count.innerText=selectedSeatCount;
    amount.innerText=selectedSeatCount*select.value;

    saveToLocalStorage(SelectedSeatIndex);
}

function getFromLocalStorage(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats!=null&&selectedSeats.length>0){
        seats.forEach(function(seat, index){
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex!=null){
        select.selectedIndex=selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats',JSON.stringify(indexs))
    localStorage.setItem('selectedMovieIndex',select.selectedIndex)
}