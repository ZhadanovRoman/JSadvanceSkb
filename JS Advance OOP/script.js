let validArr=[];
let clickable = false;

class Card {
     
    constructor(container, cardNumber, flip) {
        this.container = container;
        this.cardNumber = cardNumber;
        this.flip = flip;
        this.open = false;
        this.card;
        this.success;
    }
    
    createElement(){
       
        let randomCard = document.createElement('div');
         randomCard.classList.add('card');
         this.container.append(randomCard);
         randomCard.addEventListener('click', ()=>{
            if(this.card.classList.contains('card-open')){
                clickable=false
            }else{
                this.open=true;
            }
            
            
          validArr.push(this.cardNumber);
          this.identicalNumbers(this.open)
              }) 
              
              this.card = randomCard;
            return randomCard;   
     }
    
     identicalNumbers(x){
        if(x==true&&validArr.length==2){
            
            if(validArr[0]==validArr[1]&&clickable==true){
                this.success=true;
               
            }else{
                
             this.interv = setInterval(()=>{this.container.childNodes.forEach(el=>{
                if(el.classList.contains('card-open')){
                    el.classList.remove('card-open');
                    clearInterval(this.interv);
                }
            })},300);       
                validArr=[];
            }
    
        }
     }
     


set card(randCard){
    this._card = randCard;
   
}
get card(){
    return this._card
}
    

    set cardNumber(value){
        this._cardNumber = value;
        this.createElement().textContent=value;
    }
    get cardNumber(){
        return this._cardNumber;
    }



   set open(stat){
    this._open = stat;
   if(stat==true){
    this.card.classList.add('card-open');
    clickable=true;
    //this.interval = setInterval(()=>{
      //  this.card.classList.remove('card-open');
        //clearInterval(this.interval);
    //},600)
    //this.open=false;
   }
}

   get open(){
    return this._open
   }

   set success(value) {
    this._success = value;
    if(value){
        this.container.childNodes.forEach(el=>{
            if(el.classList.contains('card-open')){
                el.classList.remove('card-open');
                el.classList.add('cartDone');
                validArr=[];
            }
        })
    }
   }
   get success() {
    return this._success;
   }
   }
  
 





   arr.forEach(el => {
    const card = new Card(cardsCont,el);
    
   })
    
   

